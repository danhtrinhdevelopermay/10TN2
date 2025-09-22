import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Presentation, Users, UserCog, FileSpreadsheet, RotateCcw, Map, Download, Image, FileText, Printer } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const handlePrintDiagram = () => {
    const { bodyHtml, cssContent } = generatePrintableClassroomContent(seats);
    
    // Create complete HTML document for printing with @page styles
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Sơ đồ Chỗ ngồi Lớp học</title>
        <style>
          @page {
            size: A4;
            margin: 1cm;
          }
          
          ${cssContent}
          
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        ${bodyHtml}
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          
          // Close after printing (optional)
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        }, 100);
      };

      toast({
        title: "Thành công",
        description: "Đã mở sơ đồ để in!",
      });
    } else {
      toast({
        title: "Lỗi",
        description: "Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt popup của trình duyệt.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPNG = async () => {
    try {
      // Dynamically import html2canvas to avoid build issues
      const html2canvas = (await import('html2canvas')).default;
      
      // Generate the printable content and extract body and styles
      const { bodyHtml, cssContent } = generatePrintableClassroomContent(seats);
      
      // Create a temporary container with the classroom content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '794px'; // A4 width in pixels
      tempContainer.style.background = 'white';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.fontSize = '12px';
      tempContainer.style.lineHeight = '1.4';
      tempContainer.style.color = '#000';
      
      // Add the body content first
      tempContainer.innerHTML = bodyHtml;
      
      // Create and insert style element as first child for deterministic order
      const styleEl = document.createElement('style');
      styleEl.textContent = cssContent;
      tempContainer.insertBefore(styleEl, tempContainer.firstChild);
      
      document.body.appendChild(tempContainer);
      
      // Wait for styles to apply and layout to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate canvas with full content height
      const canvas = await html2canvas(tempContainer, {
        width: 794,
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: false
      });
      
      // Remove temporary container
      document.body.removeChild(tempContainer);
      
      // Download the image
      const link = document.createElement('a');
      link.download = `so-do-cho-ngoi-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Thành công",
        description: "Đã tải sơ đồ dưới dạng PNG!",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo file PNG. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Dynamically import required libraries
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      // Generate the printable content and extract body and styles
      const { bodyHtml, cssContent } = generatePrintableClassroomContent(seats);
      
      // Create a temporary container with the classroom content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '794px'; // A4 width in pixels
      tempContainer.style.background = 'white';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.fontSize = '12px';
      tempContainer.style.lineHeight = '1.4';
      tempContainer.style.color = '#000';
      
      // Add the body content first
      tempContainer.innerHTML = bodyHtml;
      
      // Create and insert style element as first child for deterministic order
      const styleEl = document.createElement('style');
      styleEl.textContent = cssContent;
      tempContainer.insertBefore(styleEl, tempContainer.firstChild);
      
      document.body.appendChild(tempContainer);
      
      // Wait for styles to apply and layout to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate canvas with full content height
      const canvas = await html2canvas(tempContainer, {
        width: 794,
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false
      });
      
      // Remove temporary container
      document.body.removeChild(tempContainer);
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Fixed pagination logic to avoid blank page
      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`so-do-cho-ngoi-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Thành công",
        description: "Đã tải sơ đồ dưới dạng PDF!",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo file PDF. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const generatePrintableClassroomContent = (seats: Seat[]) => {
    const getSeatData = (groupNumber: number, tableNumber: number, seatNumber: number) => {
      return seats.find(seat => 
        seat.groupNumber === groupNumber && 
        seat.tableNumber === tableNumber && 
        seat.seatNumber === seatNumber
      );
    };

    const generateGroupHTML = (groupNumber: number) => {
      let groupHTML = `
        <div class="group">
          <div class="group-title">TỔ ${groupNumber}</div>
          <div class="tables">
      `;

      for (let tableNumber = 6; tableNumber >= 1; tableNumber--) {
        const seat1 = getSeatData(groupNumber, tableNumber, 1);
        const seat2 = getSeatData(groupNumber, tableNumber, 2);
        
        groupHTML += `
          <div class="table">
            <div class="table-label">Bàn ${tableNumber}</div>
            <div class="seats">
              <div class="seat ${seat1?.studentName ? 'occupied' : 'empty'}">
                ${seat1?.studentName ? escapeHtml(seat1.studentName) : ''}
              </div>
              <div class="seat ${seat2?.studentName ? 'occupied' : 'empty'}">
                ${seat2?.studentName ? escapeHtml(seat2.studentName) : ''}
              </div>
            </div>
          </div>
        `;
      }

      groupHTML += `
          </div>
        </div>
      `;
      
      return groupHTML;
    };

    const cssContent = `
      @media print {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: Arial, sans-serif;
        background: white;
        padding: 20px;
        color: #000;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        padding: 20px 0;
        border-bottom: 2px solid #000;
      }
      
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #000;
        margin-bottom: 8px;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      
      .academic-year {
        font-size: 14px;
        color: #000;
        font-weight: normal;
      }
      
      .classroom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin: 40px 0;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .group {
        border: 2px solid #000;
        border-radius: 8px;
        padding: 20px;
        background: #fff;
      }
      
      .group-title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #000;
        margin-bottom: 20px;
        padding: 8px;
        background: white;
        border-bottom: 1px solid #000;
        text-transform: uppercase;
      }
      
      .tables {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .table {
        margin-bottom: 15px;
      }
      
      .table-label {
        font-size: 12px;
        font-weight: bold;
        color: #000;
        margin-bottom: 8px;
        text-align: center;
        border-bottom: 1px solid #000;
        padding-bottom: 2px;
      }
      
      .seats {
        display: flex;
        gap: 8px;
        justify-content: center;
      }
      
      .seat {
        border: 1.5px dashed #000;
        padding: 12px 8px;
        min-width: 80px;
        min-height: 35px;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        border-radius: 4px;
        background: white;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        word-break: break-word;
        line-height: 1.2;
      }
      
      .seat.occupied {
        background: repeating-linear-gradient(
          45deg,
          rgba(0,0,0,0.2) 0px 2px,
          transparent 2px 4px
        );
        color: #000;
        border: 1.5px solid #000;
        border-style: solid;
        font-weight: 700;
        position: relative;
      }
      
      .seat.occupied::after {
        content: "✓";
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 8px;
        font-weight: bold;
        color: #000;
      }
      
      .footer {
        margin-top: 40px;
        text-align: center;
        border-top: 2px solid #000;
        padding-top: 20px;
      }
      
      .footer-items {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-bottom: 30px;
      }
      
      .footer-item {
        padding: 10px 20px;
        border: 2px solid #000;
        border-radius: 4px;
        background: white;
        font-weight: bold;
        color: #000;
        font-size: 14px;
        text-transform: uppercase;
      }
      
      .legend {
        margin-top: 30px;
        padding: 15px;
        border: 2px solid #000;
        border-radius: 4px;
        background: white;
        display: inline-block;
      }
      
      .legend-items {
        display: flex;
        gap: 30px;
        align-items: center;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #000;
        font-weight: 600;
      }
      
      .legend-box {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        font-weight: bold;
      }
      
      .legend-box.occupied {
        background: repeating-linear-gradient(
          45deg,
          rgba(0,0,0,0.2) 0px 2px,
          transparent 2px 4px
        );
        color: #000;
        border: 2px solid #000;
        position: relative;
      }
      
      .legend-box.occupied::after {
        content: "✓";
        position: absolute;
        top: 1px;
        right: 1px;
        font-size: 6px;
        font-weight: bold;
        color: #000;
      }
      
      .legend-box.empty {
        background: white;
        border: 2px dashed #000;
        color: #000;
      }
    `;

    const bodyHtml = `
      <div class="header">
        <div class="title">SƠ ĐỒ LỚP</div>
        <div class="academic-year">NĂM HỌC: 2025 - 2026</div>
      </div>
      
      <div class="classroom">
        ${generateGroupHTML(1)}
        ${generateGroupHTML(2)}
        ${generateGroupHTML(3)}
        ${generateGroupHTML(4)}
      </div>
      
      <div class="footer">
        <div class="footer-items">
          <div class="footer-item">BÀN GIÁO VIÊN</div>
          <div class="footer-item">BẢNG</div>
          <div class="footer-item">CỬA VÀO</div>
        </div>
        
        <div class="legend">
          <div class="legend-items">
            <div class="legend-item">
              <div class="legend-box occupied"></div>
              <span>ĐÃ CHỌN CHỖ NGỒI</span>
            </div>
            <div class="legend-item">
              <div class="legend-box empty">---</div>
              <span>CHỖ TRỐNG</span>
            </div>
          </div>
        </div>
      </div>
    `;

    return { bodyHtml, cssContent };
  };

  const generatePrintableClassroomHTML = (seats: Seat[]) => {
    const getSeatData = (groupNumber: number, tableNumber: number, seatNumber: number) => {
      return seats.find(seat => 
        seat.groupNumber === groupNumber && 
        seat.tableNumber === tableNumber && 
        seat.seatNumber === seatNumber
      );
    };

    const generateGroupHTML = (groupNumber: number) => {
      let groupHTML = `
        <div class="group">
          <h3>Tổ ${groupNumber}</h3>
          <div class="tables">
      `;

      for (let tableNumber = 1; tableNumber <= 6; tableNumber++) {
        const seat1 = getSeatData(groupNumber, tableNumber, 1);
        const seat2 = getSeatData(groupNumber, tableNumber, 2);
        
        groupHTML += `
          <div class="table">
            <div class="table-label">Bàn ${tableNumber}</div>
            <div class="seats">
              <div class="seat ${seat1?.studentName ? 'occupied' : 'empty'}">
                ${seat1?.studentName ? escapeHtml(seat1.studentName) : ''}
              </div>
              <div class="seat ${seat2?.studentName ? 'occupied' : 'empty'}">
                ${seat2?.studentName ? escapeHtml(seat2.studentName) : ''}
              </div>
            </div>
          </div>
        `;
      }

      groupHTML += `
          </div>
        </div>
      `;
      
      return groupHTML;
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Sơ đồ Chỗ ngồi Lớp học</title>
        <style>
          @page {
            size: A4;
            margin: 1cm;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            background: white;
          }
          
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          
          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .board {
            text-align: center;
            margin: 15px 0;
            padding: 8px;
            border: 2px solid #000;
            font-weight: bold;
          }
          
          .teacher-desk {
            text-align: center;
            margin: 10px 0;
            padding: 5px;
            border: 1px solid #666;
          }
          
          .classroom {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
          }
          
          .group {
            border: 1px solid #000;
            padding: 15px;
          }
          
          .group h3 {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #666;
            padding-bottom: 5px;
          }
          
          .tables {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
          }
          
          .table {
            text-align: center;
          }
          
          .table-label {
            font-size: 10px;
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          .seats {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          
          .seat {
            border: 1px solid #000;
            padding: 8px 4px;
            min-height: 30px;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            word-break: break-word;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .seat.occupied {
            background-color: #f0f0f0;
          }
          
          .seat.empty {
            background-color: white;
            border-style: dashed;
          }
          
          .door {
            text-align: center;
            margin-top: 20px;
            padding: 5px;
            border: 1px solid #666;
            font-weight: bold;
          }
          
          .legend {
            margin-top: 20px;
            border: 1px solid #000;
            padding: 10px;
          }
          
          .legend h4 {
            font-size: 12px;
            margin-bottom: 8px;
            font-weight: bold;
          }
          
          .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            font-size: 10px;
          }
          
          .legend-box {
            width: 15px;
            height: 15px;
            border: 1px solid #000;
            margin-right: 8px;
          }
          
          .legend-box.occupied {
            background-color: #f0f0f0;
          }
          
          .legend-box.empty {
            background-color: white;
            border-style: dashed;
          }
          
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">SƠ ĐỒ CHỖ NGỒI LỚP HỌC</div>
          <div class="board">BẢNG VIẾT</div>
          <div class="teacher-desk">🏫 Bàn giáo viên</div>
        </div>
        
        <div class="classroom">
          ${generateGroupHTML(1)}
          ${generateGroupHTML(2)}
          ${generateGroupHTML(3)}
          ${generateGroupHTML(4)}
        </div>
        
        <div class="door">🚪 Cửa ra vào</div>
        
        <div class="legend">
          <h4>Chú thích:</h4>
          <div class="legend-item">
            <div class="legend-box occupied"></div>
            <span>Đã có học sinh</span>
          </div>
          <div class="legend-item">
            <div class="legend-box empty"></div>
            <span>Chỗ trống</span>
          </div>
        </div>
      </body>
      </html>
    `;
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:h-16 py-4 sm:py-0 gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Presentation className="text-xl sm:text-2xl text-primary" data-testid="logo-icon" />
              <h1 className="text-base sm:text-xl font-semibold text-foreground hidden sm:block" data-testid="app-title">
                Sơ đồ Chỗ ngồi Lớp học
              </h1>
              <h1 className="text-sm font-semibold text-foreground sm:hidden" data-testid="app-title-mobile">
                Sơ đồ Lớp
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
                <Link href="/map">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground text-xs sm:text-sm"
                    data-testid="button-map-view"
                  >
                    <Map className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Sơ đồ lớp</span>
                    <span className="sm:hidden">Sơ đồ</span>
                  </Button>
                </Link>
                <Link href="/results">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground text-xs sm:text-sm"
                    data-testid="button-results-view"
                  >
                    <FileSpreadsheet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Kết quả</span>
                    <span className="sm:hidden">KQ</span>
                  </Button>
                </Link>
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={mode === "student" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("student")}
                  className={`text-xs sm:text-sm ${mode === "student" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  data-testid="button-student-mode"
                >
                  <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Học sinh</span>
                  <span className="sm:hidden">HS</span>
                </Button>
                <Button
                  variant={mode === "admin" ? "default" : "ghost"}
                  size="sm"
                  onClick={handleAdminModeClick}
                  className={`text-xs sm:text-sm ${mode === "admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  data-testid="button-admin-mode"
                >
                  <UserCog className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Lớp trưởng</span>
                  <span className="sm:hidden">LT</span>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        data-testid="button-download-diagram"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Tải sơ đồ
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handlePrintDiagram} data-testid="menu-item-print">
                        <Printer className="mr-2 h-4 w-4" />
                        In sơ đồ
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadPNG} data-testid="menu-item-png">
                        <Image className="mr-2 h-4 w-4" />
                        Tải PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadPDF} data-testid="menu-item-pdf">
                        <FileText className="mr-2 h-4 w-4" />
                        Tải PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
