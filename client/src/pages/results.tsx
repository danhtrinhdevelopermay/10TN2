import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface Seat {
  id: string;
  groupNumber: number;
  tableNumber: number;
  seatNumber: number;
  studentName: string | null;
}

export default function Results() {
  const { data: seats = [], isLoading } = useQuery<Seat[]>({
    queryKey: ["/api/seats"],
  });

  // Group seats by group and table for organized display
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.groupNumber]) {
      acc[seat.groupNumber] = {};
    }
    if (!acc[seat.groupNumber][seat.tableNumber]) {
      acc[seat.groupNumber][seat.tableNumber] = [];
    }
    acc[seat.groupNumber][seat.tableNumber].push(seat);
    return acc;
  }, {} as Record<number, Record<number, Seat[]>>);

  // Current academic year
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear} - ${currentYear + 1}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  const renderGroup = (groupNumber: number) => {
    const groupTables = groupedSeats[groupNumber] || {};
    const tables = Object.keys(groupTables)
      .map(Number)
      .sort((a, b) => a - b);

    return (
      <div key={groupNumber} className="group-container" style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '15px',
        margin: '10px',
        borderTop: '4px solid #2c7be5',
        minWidth: '280px'
      }}>
        <h3 style={{
          textAlign: 'center',
          color: '#2c7be5',
          marginBottom: '15px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Tổ {groupNumber}
        </h3>
        
        <div className="tables-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tables.map(tableNumber => {
            const tableSeats = groupTables[tableNumber].sort((a, b) => a.seatNumber - b.seatNumber);
            return (
              <div key={tableNumber} className="table-container" style={{
                border: '2px solid #e5ecf3',
                borderRadius: '8px',
                padding: '10px',
                background: '#f9fbfd'
              }}>
                <div style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#666',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Bàn {tableNumber}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  {tableSeats.map(seat => (
                    <div key={seat.id} style={{
                      width: '100px',
                      height: '45px',
                      border: seat.studentName ? '2px solid #28a745' : '2px dashed #ccc',
                      borderRadius: '6px',
                      background: seat.studentName ? '#e8f5e8' : '#fafafa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: seat.studentName ? '#2d5a41' : '#999',
                      fontWeight: '500',
                      textAlign: 'center',
                      padding: '2px'
                    }}>
                      {seat.studentName || `Ghế ${seat.seatNumber}`}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      fontFamily: '"Poppins", Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f4ff, #f7fff0)',
      color: '#2c3e50',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px' 
      }}>
        <Link href="/">
          <Button 
            variant="outline" 
            size="sm"
            style={{ backgroundColor: '#fff' }}
            data-testid="button-back-home"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay về trang chủ
          </Button>
        </Link>
        
        <Link href="/map">
          <Button 
            variant="outline" 
            size="sm"
            style={{ backgroundColor: '#fff' }}
            data-testid="button-to-map"
          >
            Xem sơ đồ trống
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#2c7be5',
          marginBottom: '10px'
        }}>
          SƠ ĐỒ LỚP
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          fontWeight: '500'
        }}>
          NĂM HỌC: {academicYear}
        </p>
      </div>

      {/* Main Layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Groups Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          width: '100%',
          maxWidth: '800px'
        }}>
          {[1, 2, 3, 4].map(groupNumber => renderGroup(groupNumber))}
        </div>

        {/* Bottom Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          marginTop: '20px'
        }}>
          {/* Teacher's Desk */}
          <div style={{
            background: '#28a745',
            color: 'white',
            borderRadius: '8px',
            padding: '8px 15px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)'
          }}>
            BÀN GIÁO VIÊN
          </div>

          {/* Teacher's Board */}
          <div style={{
            background: '#2c7be5',
            color: 'white',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 8px rgba(44, 123, 229, 0.3)'
          }}>
            BẢNG
          </div>

          {/* Entrance */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              background: '#fff',
              border: '2px solid #2c7be5',
              borderRadius: '8px',
              padding: '8px 15px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#2c7be5'
            }}>
              CỬA VÀO
            </div>
            <ArrowRight style={{ color: '#2c7be5' }} size={20} />
          </div>
        </div>

        {/* Legend */}
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          fontSize: '12px',
          color: '#666'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #28a745',
              borderRadius: '4px',
              background: '#e8f5e8'
            }}></div>
            <span>Đã có học sinh</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px dashed #ccc',
              borderRadius: '4px',
              background: '#fafafa'
            }}></div>
            <span>Chỗ trống</span>
          </div>
        </div>
      </div>
    </div>
  );
}