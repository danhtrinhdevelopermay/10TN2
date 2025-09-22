import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, CheckCircle, AlertCircle, Edit3 } from "lucide-react";

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
  const [nameError, setNameError] = useState("");
  
  const isValidName = studentName.trim().length >= 2;
  const hasChanged = studentName.trim() !== currentName;
  const hasInput = studentName.trim().length > 0;

  useEffect(() => {
    if (isOpen) {
      setStudentName(currentName);
      setNameError("");
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim().length < 2) {
      setNameError("Tên phải có ít nhất 2 ký tự");
      return;
    }
    if (studentName.trim() && studentName.trim() !== currentName) {
      onUpdate(studentName.trim());
    } else {
      onClose();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudentName(value);
    if (nameError && value.trim().length >= 2) {
      setNameError("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-4 max-h-[90vh] overflow-y-auto" data-testid="edit-student-name-modal">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-center text-primary flex items-center justify-center gap-2" data-testid="modal-title">
            <Edit3 className="h-6 w-6" />
            Chỉnh sửa thông tin
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <Label className="block text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
              📍 Vị trí chỗ ngồi
            </Label>
            <div 
              className="text-lg font-bold text-orange-900 dark:text-orange-100 bg-orange-100 dark:bg-orange-900/50 p-3 rounded-md text-center"
              data-testid="seat-position-display"
            >
{seatId || "Không xác định"}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border">
              <Label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                📋 Tên hiện tại
              </Label>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {currentName}
              </p>
            </div>
            
            <Label htmlFor="studentName" className="block text-sm font-semibold text-foreground mb-2">
              👤 Tên học sinh mới
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${
                  hasInput 
                    ? isValidName 
                      ? hasChanged 
                        ? 'text-green-500' 
                        : 'text-blue-500'
                      : 'text-red-500'
                    : 'text-gray-400'
                }`} />
              </div>
              <Input
                id="studentName"
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={studentName}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
                className={`pl-10 pr-10 h-12 text-base ${
                  nameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                } ${
                  hasInput && isValidName && hasChanged ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''
                }`}
                autoFocus
                autoCapitalize="words"
                autoComplete="name"
                data-testid="input-student-name"
              />
              {hasInput && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {isValidName ? (
                    hasChanged ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    )
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {nameError && (
              <p id="name-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {nameError}
              </p>
            )}
            {hasInput && isValidName && hasChanged && (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Tên mới hợp lệ
              </p>
            )}
            {hasInput && isValidName && !hasChanged && (
              <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Tên chưa thay đổi
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              💡 Nhập tên mới nếu muốn thay đổi
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="submit"
              className="flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!isValidName || !hasChanged || isLoading}
              data-testid="button-confirm-update"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang cập nhật...
                </>
              ) : (
                <>✏️ Cập nhật tên</>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 text-base font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              disabled={isLoading}
              data-testid="button-cancel-update"
            >
              ❌ Hủy bỏ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}