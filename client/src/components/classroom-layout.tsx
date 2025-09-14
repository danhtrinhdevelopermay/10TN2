import { Button } from "@/components/ui/button";

interface Seat {
  id: string;
  groupNumber: number;
  tableNumber: number;
  seatNumber: number;
  studentName: string | null;
}

interface ClassroomLayoutProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
  mode: "student" | "admin";
}

export default function ClassroomLayout({ seats, onSeatClick, mode }: ClassroomLayoutProps) {
  const getSeatData = (groupNumber: number, tableNumber: number, seatNumber: number) => {
    return seats.find(seat => 
      seat.groupNumber === groupNumber && 
      seat.tableNumber === tableNumber && 
      seat.seatNumber === seatNumber
    );
  };

  const renderGroup = (groupNumber: number) => {
    const tables = [];
    
    // Create a single column with 6 tables
    for (let tableNumber = 1; tableNumber <= 6; tableNumber++) {
      const seat1 = getSeatData(groupNumber, tableNumber, 1);
      const seat2 = getSeatData(groupNumber, tableNumber, 2);
      
      tables.push(
        <div key={`${groupNumber}-${tableNumber}`} className="space-y-1">
          <div className="text-xs text-muted-foreground text-center" data-testid={`table-label-${groupNumber}-${tableNumber}`}>
            Bàn {tableNumber}
          </div>
          <div className="flex space-x-2 justify-center">
            <Button
              variant="ghost"
              size="sm"
              className={`seat w-20 min-h-16 h-auto text-xs font-medium p-1 ${
                seat1?.studentName 
                  ? 'occupied bg-secondary text-secondary-foreground hover:bg-secondary/90' 
                  : 'available bg-muted border-2 border-dashed border-border hover:border-primary'
              }`}
              onClick={() => mode === "student" ? onSeatClick(seat1?.id || '') : undefined}
              disabled={mode === "admin"}
              data-testid={`seat-${seat1?.id}`}
            >
              <div className="break-words text-center leading-tight">
                {seat1?.studentName || ''}
              </div>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`seat w-20 min-h-16 h-auto text-xs font-medium p-1 ${
                seat2?.studentName 
                  ? 'occupied bg-secondary text-secondary-foreground hover:bg-secondary/90' 
                  : 'available bg-muted border-2 border-dashed border-border hover:border-primary'
              }`}
              onClick={() => mode === "student" ? onSeatClick(seat2?.id || '') : undefined}
              disabled={mode === "admin"}
              data-testid={`seat-${seat2?.id}`}
            >
              <div className="break-words text-center leading-tight">
                {seat2?.studentName || ''}
              </div>
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="group-container p-6" data-testid={`group-${groupNumber}`}>
        <h3 className="text-center font-semibold text-lg mb-4 text-primary" data-testid={`group-title-${groupNumber}`}>
          Tổ {groupNumber}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {tables}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto" data-testid="classroom-layout">
      {[1, 2, 3, 4].map(groupNumber => (
        <div key={groupNumber}>
          {renderGroup(groupNumber)}
        </div>
      ))}
    </div>
  );
}
