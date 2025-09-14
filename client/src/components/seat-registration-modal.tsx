import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SeatRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (studentName: string) => void;
  seatId: string | null;
  isLoading: boolean;
}

export default function SeatRegistrationModal({ 
  isOpen, 
  onClose, 
  onRegister, 
  seatId,
  isLoading 
}: SeatRegistrationModalProps) {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStudentName("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      onRegister(studentName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="seat-registration-modal">
        <DialogHeader>
          <DialogTitle data-testid="modal-title">Đăng ký chỗ ngồi</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">
              Vị trí chỗ ngồi:
            </Label>
            <div 
              className="text-sm text-muted-foreground bg-muted p-2 rounded"
              data-testid="seat-position-display"
            >
              Vị trí: {seatId}
            </div>
          </div>
          
          <div>
            <Label htmlFor="studentName" className="block text-sm font-medium text-foreground mb-2">
              Tên học sinh:
            </Label>
            <Input
              id="studentName"
              type="text"
              placeholder="Nhập tên của bạn..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
              autoFocus
              data-testid="input-student-name"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!studentName.trim() || isLoading}
              data-testid="button-confirm-registration"
            >
              {isLoading ? "Đang đăng ký..." : "Xác nhận"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
              data-testid="button-cancel-registration"
            >
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
