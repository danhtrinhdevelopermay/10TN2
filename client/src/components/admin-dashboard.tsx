import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

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

interface AdminDashboardProps {
  seats: Seat[];
  stats?: SeatStats;
  onClearSeat: (seatId: string) => void;
}

export default function AdminDashboard({ seats, stats, onClearSeat }: AdminDashboardProps) {
  return (
    <div className="space-y-8" data-testid="admin-dashboard">
      {/* Detailed Seating Table */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground" data-testid="table-title">
            Chi tiết Sơ đồ Chỗ ngồi
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Danh sách đầy đủ tất cả chỗ ngồi và học sinh đã đăng ký
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table data-testid="admin-seats-table">
            <TableHeader>
              <TableRow>
                <TableHead>Tổ</TableHead>
                <TableHead>Bàn</TableHead>
                <TableHead>Ghế</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Tên học sinh</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seats.map((seat) => (
                <TableRow key={seat.id} data-testid={`table-row-${seat.id}`}>
                  <TableCell data-testid={`cell-group-${seat.id}`}>Tổ {seat.groupNumber}</TableCell>
                  <TableCell data-testid={`cell-table-${seat.id}`}>Bàn {seat.tableNumber}</TableCell>
                  <TableCell data-testid={`cell-seat-${seat.id}`}>Ghế {seat.seatNumber}</TableCell>
                  <TableCell className="text-muted-foreground" data-testid={`cell-position-${seat.id}`}>{seat.id}</TableCell>
                  <TableCell className="font-medium" data-testid={`cell-student-${seat.id}`}>
                    {seat.studentName || "-"}
                  </TableCell>
                  <TableCell data-testid={`cell-status-${seat.id}`}>
                    <Badge 
                      variant={seat.studentName ? "default" : "secondary"}
                      className={seat.studentName ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}
                    >
                      {seat.studentName ? "Đã đăng ký" : "Trống"}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`cell-actions-${seat.id}`}>
                    <div className="flex space-x-2">
                      {seat.studentName && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onClearSeat(seat.id)}
                          className="text-destructive hover:text-destructive/80 p-1"
                          data-testid={`button-clear-${seat.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Group Summary Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-testid="group-summary-cards">
          {stats.groupStats.map((groupStat) => (
            <div 
              key={groupStat.groupNumber} 
              className="bg-card p-6 rounded-lg border border-border shadow-sm"
              data-testid={`group-summary-${groupStat.groupNumber}`}
            >
              <h4 className="text-lg font-semibold text-primary mb-4">
                Tổ {groupStat.groupNumber}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Đã đăng ký:</span>
                  <span className="font-medium text-foreground" data-testid={`group-occupied-${groupStat.groupNumber}`}>
                    {groupStat.occupied}/{groupStat.total}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Còn trống:</span>
                  <span className="font-medium text-foreground" data-testid={`group-available-${groupStat.groupNumber}`}>
                    {groupStat.available}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${groupStat.occupancyRate}%` }}
                    data-testid={`group-progress-${groupStat.groupNumber}`}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground" data-testid={`group-rate-${groupStat.groupNumber}`}>
                  {groupStat.occupancyRate}% lấp đầy
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
