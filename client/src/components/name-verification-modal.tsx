import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Database } from "lucide-react";

interface NameVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (studentName: string) => void;
}

export default function NameVerificationModal({ 
  isOpen, 
  onClose, 
  onVerify 
}: NameVerificationModalProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(10);
      setCanClose(false);
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={canClose ? onClose : undefined}>
      <DialogContent 
        className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto border-pink-200 dark:border-pink-700" 
        data-testid="name-verification-modal"
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-center text-pink-600 dark:text-pink-400 flex items-center justify-center gap-2" data-testid="modal-title">
            <Heart className="h-7 w-7 text-pink-500 animate-pulse" />
          Đọc kỹ dùm mk
            <Heart className="h-7 w-7 text-pink-500 animate-pulse" />
          </DialogTitle>
        </DialogHeader>
        
        {/* Timer Display */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 p-4 rounded-lg border border-pink-200 dark:border-pink-800 mb-4">
          <div className="flex items-center justify-center gap-2 text-pink-700 dark:text-pink-300">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">
              {canClose ? "✨ Bạn có thể tiếp tục! ✨" : `Vui lòng đọc kỹ thông tin (${timeLeft}s)`}
            </span>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-4">
          <div className="flex items-start gap-3">
            <Database className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                🚨 Thông báo quan trọng
              </h3>
              <p className="text-sm text-orange-600 dark:text-orange-400 leading-relaxed">
                Do hệ thống lưu trữ của mk gặp sự cố kỹ thuật, 
                một số tên của các bn có thể bị sai chính tả hoặc thiếu thông tin. 
                Vì vậy, mk cần bạn kiểm tra lại và nhập đầy đủ họ và tên 
                chính xác của mình để đảm bảo dữ liệu được cập nhật đúng. 
                <br />
                <span className="font-semibold"> Cảm ơn các bn</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 pt-6">
          {canClose && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full h-12 text-base font-semibold border-2 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              data-testid="button-skip"
            >
              ⏭️ Bỏ qua (không khuyến khích)
            </Button>
          )}
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          <p>🔒 Thông tin của bạn được bảo mật và chỉ dùng cho mục đích học tập</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}