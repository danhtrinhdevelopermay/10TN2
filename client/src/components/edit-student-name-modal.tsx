import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditStudentNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (studentName: string) => void;
  seatId: string | null;
  currentName: string;
  isLoading: boolean;
}

export default function EditStudentNameModal({ 
  isOpen, 
  onClose, 
  onUpdate, 
  seatId,
  currentName,
  isLoading 
}: EditStudentNameModalProps) {
  const [studentName, setStudentName] = useState(currentName);

  useEffect(() => {
    if (isOpen) {
      setStudentName(currentName);
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && studentName.trim() !== currentName) {
      onUpdate(studentName.trim());
    } else {
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="edit-student-name-modal">
        <DialogHeader>
          <DialogTitle data-testid="modal-title">Chỉnh sửa tên học sinh</DialogTitle>
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
              Tên học sinh mới:
            </Label>
            <Input
              id="studentName"
              type="text"
              placeholder="Nhập tên mới của bạn..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
              autoFocus
              data-testid="input-student-name"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tên hiện tại: {currentName}
            </p>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!studentName.trim() || studentName.trim() === currentName || isLoading}
              data-testid="button-confirm-update"
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
              data-testid="button-cancel-update"
            >
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}