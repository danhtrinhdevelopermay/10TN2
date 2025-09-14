import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Presentation, Users, UserCog, FileSpreadsheet, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ClassroomLayout from "@/components/classroom-layout";
import SeatRegistrationModal from "@/components/seat-registration-modal";
import EditStudentNameModal from "@/components/edit-student-name-modal";
import AdminDashboard from "@/components/admin-dashboard";
import { PasswordDialog } from "@/components/password-dialog";
import { apiRequest } from "@/lib/queryClient";

interface Seat {
  id: string;
  groupNumber: number;
  tableNumber: number;
  seatNumber: number;
  studentName: string | null;
}

interface SeatStats {
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  occupancyRate: number;
  groupStats: Array<{
    groupNumber: number;
    occupied: number;
    available: number;
    total: number;
    occupancyRate: number;
  }>;
}

export default function Home() {
  const [mode, setMode] = useState<"student" | "admin">("student");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [editingSeat, setEditingSeat] = useState<string | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: seats = [], isLoading } = useQuery<Seat[]>({
    queryKey: ["/api/seats"],
  });

  const { data: stats } = useQuery<SeatStats>({
    queryKey: ["/api/seats/stats"],
  });

  const registerSeatMutation = useMutation({
    mutationFn: async ({ seatId, studentName }: { seatId: string; studentName: string }) => {
      const response = await apiRequest("POST", "/api/seats/register", { seatId, studentName });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/seats/stats"] });
      toast({
        title: "Thành công",
        description: "Đã đăng ký chỗ ngồi thành công!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể đăng ký chỗ ngồi",
        variant: "destructive",
      });
    },
  });

  const clearSeatMutation = useMutation({
    mutationFn: async (seatId: string) => {
      // Server-side session-based authentication, no headers needed
      const response = await apiRequest("DELETE", `/api/seats/${seatId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/seats/stats"] });
      toast({
        title: "Thành công",
        description: "Đã xóa học sinh khỏi chỗ ngồi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa chỗ ngồi",
        variant: "destructive",
      });
    },
  });

  const updateStudentNameMutation = useMutation({
    mutationFn: async ({ seatId, studentName }: { seatId: string; studentName: string }) => {
      const response = await apiRequest("PUT", `/api/seats/${seatId}/student-name`, { studentName });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/seats/stats"] });
      toast({
        title: "Thành công",
        description: "Đã cập nhật tên học sinh thành công!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể cập nhật tên học sinh",
        variant: "destructive",
      });
    },
  });

  const handleSeatClick = (seatId: string) => {
    // Prevent any seat interactions in admin mode
    if (mode === "admin") return;
    
    const seat = seats.find(s => s.id === seatId);
    if (!seat) return;

    if (mode === "student") {
      if (!seat.studentName) {
        // Register new student
        setSelectedSeat(seatId);
      } else {
        // Edit existing student name
        setEditingSeat(seatId);
      }
    }
  };

  const handleSeatRegister = (studentName: string) => {
    if (selectedSeat) {
      registerSeatMutation.mutate({ seatId: selectedSeat, studentName });
      setSelectedSeat(null);
    }
  };

  const handleStudentNameUpdate = (studentName: string) => {
    if (editingSeat) {
      updateStudentNameMutation.mutate({ seatId: editingSeat, studentName });
      setEditingSeat(null);
    }
  };

  const handleSeatClear = (seatId: string) => {
    clearSeatMutation.mutate(seatId);
  };

  const handleExportExcel = async () => {
    if (!seats.length) return;

    try {
      // Dynamically import xlsx to avoid build issues
      const mod = await import('xlsx');
      const XLSX = (mod as any).default || mod;
      
      const exportData = seats.map(seat => ({
        "Tổ": `Tổ ${seat.groupNumber}`,
        "Bàn": `Bàn ${seat.tableNumber}`,
        "Ghế": `Ghế ${seat.seatNumber}`,
        "Vị trí": seat.id,
        "Tên học sinh": seat.studentName || "",
        "Trạng thái": seat.studentName ? "Đã đăng ký" : "Trống"
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sơ đồ chỗ ngồi");
      
      // Auto-size columns
      const colWidths = [
        { wch: 10 }, // Tổ
        { wch: 8 },  // Bàn
        { wch: 8 },  // Ghế
        { wch: 12 }, // Vị trí
        { wch: 20 }, // Tên học sinh
        { wch: 15 }  // Trạng thái
      ];
      ws['!cols'] = colWidths;

      XLSX.writeFile(wb, `so-do-cho-ngoi-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Thành công",
        description: "Đã xuất file Excel thành công!",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xuất file Excel. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/seats"] });
    queryClient.invalidateQueries({ queryKey: ["/api/seats/stats"] });
  };

  const handleAdminModeClick = () => {
    if (mode === "admin") {
      // If already in admin mode, logout and switch back to student
      handleAdminLogout();
    } else {
      // If trying to access admin mode, show password dialog
      setShowPasswordDialog(true);
    }
  };

  const handlePasswordCorrect = async (password: string) => {
    try {
      const response = await apiRequest("POST", "/api/admin/login", { password });
      const result = await response.json();
      
      setMode("admin");
      setShowPasswordDialog(false);
      toast({
        title: "Truy cập thành công",
        description: "Chào mừng đến với bảng điều khiển lớp trưởng!",
      });
    } catch (error: any) {
      // Error will be handled by the password dialog
      throw error;
    }
  };
  
  const handleAdminLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout");
      setMode("student");
      toast({
        title: "Thành công",
        description: "Đã đăng xuất khỏi chế độ lớp trưởng",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể đăng xuất",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Presentation className="text-2xl text-primary" data-testid="logo-icon" />
              <h1 className="text-xl font-semibold text-foreground" data-testid="app-title">
                Sơ đồ Chỗ ngồi Lớp học
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={mode === "student" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("student")}
                  className={mode === "student" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
                  data-testid="button-student-mode"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Học sinh
                </Button>
                <Button
                  variant={mode === "admin" ? "default" : "ghost"}
                  size="sm"
                  onClick={handleAdminModeClick}
                  className={mode === "admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
                  data-testid="button-admin-mode"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Lớp trưởng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mode === "student" ? (
          <div className="space-y-8" data-testid="student-view">
            {/* Classroom Layout Header */}
            <div className="text-center space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-2" data-testid="classroom-header">
                  <Presentation className="mr-2 inline text-primary" />
                  Bảng lớp học
                </h2>
                <div className="bg-foreground text-background py-3 px-6 rounded-md inline-block" data-testid="board-display">
                  BẢNG VIẾT
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg inline-block" data-testid="teacher-desk">
                <span className="text-sm font-medium text-muted-foreground">🏫 Bàn giáo viên</span>
              </div>
            </div>

            {/* Classroom Layout */}
            <ClassroomLayout 
              seats={seats} 
              onSeatClick={handleSeatClick}
              mode={mode}
            />

            {/* Door/Exit indicator */}
            <div className="text-center">
              <div className="bg-accent text-accent-foreground py-2 px-4 rounded-lg inline-block" data-testid="door-indicator">
                🚪 Cửa ra vào
              </div>
            </div>

            {/* Legend */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm max-w-md mx-auto" data-testid="legend">
              <h3 className="text-sm font-semibold mb-3 text-foreground">Chú thích:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-secondary rounded border"></div>
                  <span className="text-muted-foreground">Đã có học sinh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-muted border-2 border-dashed border-border rounded"></div>
                  <span className="text-muted-foreground">Chỗ trống (click để đăng ký)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8" data-testid="admin-view">
            {/* Admin Header */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-foreground" data-testid="admin-header">
                  <UserCog className="mr-3 inline text-primary" />
                  Bảng điều khiển Lớp trưởng
                </h2>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleExportExcel}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    data-testid="button-export-excel"
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Xuất Excel
                  </Button>
                  <Button
                    onClick={handleRefresh}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    data-testid="button-refresh"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Làm mới
                  </Button>
                </div>
              </div>
              
              {/* Statistics Cards */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" data-testid="stats-cards">
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-primary text-2xl font-bold" data-testid="stat-occupied">{stats.occupiedSeats}</div>
                    <div className="text-sm text-muted-foreground">Học sinh đã đăng ký</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <div className="text-foreground text-2xl font-bold" data-testid="stat-available">{stats.availableSeats}</div>
                    <div className="text-sm text-muted-foreground">Chỗ trống</div>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                    <div className="text-secondary text-2xl font-bold" data-testid="stat-total">{stats.totalSeats}</div>
                    <div className="text-sm text-muted-foreground">Tổng số chỗ ngồi</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-accent text-2xl font-bold" data-testid="stat-rate">{stats.occupancyRate}%</div>
                    <div className="text-sm text-muted-foreground">Tỷ lệ lấp đầy</div>
                  </div>
                </div>
              )}
            </div>

            <AdminDashboard 
              seats={seats} 
              stats={stats}
              onClearSeat={handleSeatClear}
            />
          </div>
        )}
      </main>

      <SeatRegistrationModal
        isOpen={selectedSeat !== null}
        onClose={() => setSelectedSeat(null)}
        onRegister={handleSeatRegister}
        seatId={selectedSeat}
        isLoading={registerSeatMutation.isPending}
      />

      <EditStudentNameModal
        isOpen={editingSeat !== null}
        onClose={() => setEditingSeat(null)}
        onUpdate={handleStudentNameUpdate}
        seatId={editingSeat}
        currentName={editingSeat ? seats.find(s => s.id === editingSeat)?.studentName || "" : ""}
        isLoading={updateStudentNameMutation.isPending}
      />
      
      <PasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onPasswordCorrect={handlePasswordCorrect}
      />
    </div>
  );
}
