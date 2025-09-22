import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Map() {
  return (
    <div style={{
      fontFamily: '"Poppins", Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f4ff, #f7fff0)',
      color: '#2c3e50',
      textAlign: 'center',
      padding: '30px',
      minHeight: '100vh'
    }}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5 px-4">
        <Link href="/">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-50 min-w-[120px]"
            data-testid="button-back-home"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay về
          </Button>
        </Link>
        
        <Link href="/results">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-50 min-w-[120px]"
            data-testid="button-to-results"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Xem kết quả
          </Button>
        </Link>
      </div>
      
      <h1 style={{
        color: '#2c7be5',
        marginBottom: '25px',
        fontSize: '32px',
        fontWeight: '700'
      }}>
        Sơ đồ lớp
      </h1>

      <div className="lop" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '25px'
      }}>
        {/* Tổ 1 */}
        <div className="to" style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          width: '320px',
          padding: '20px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          borderTop: '5px solid #2c7be5'
        }}>
          <h2 style={{
            color: '#2c7be5',
            marginBottom: '15px',
            fontSize: '20px'
          }}>
            Tổ 1
          </h2>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 1
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 2
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Duyên Anh
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 3
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Nhựt Trang
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Thủy Tiên
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 4
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Phan Thị Khánh Băng
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Phan Thị Nhã Đan
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 5
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Huỳnh Giao
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Ngọc Thắm
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 6
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Phan Vũ Huy
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
        </div>

        {/* Tổ 2 */}
        <div className="to" style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          width: '320px',
          padding: '20px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          borderTop: '5px solid #2c7be5'
        }}>
          <h2 style={{
            color: '#2c7be5',
            marginBottom: '15px',
            fontSize: '20px'
          }}>
            Tổ 2
          </h2>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 1
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Phạm Văn Hiếu
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 2
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Trần Thị Cẩm Như
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Tiết Thị Cẩm Ly
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 3
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Đỗ Tấn Lộc
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Danh Trình
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 4
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Ngọc Tuyền
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Nguyễn Khánh Duy
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 5
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Phạm Thế Anh
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Trần Ngọc Diệu
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 6
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Ngọc Ngân
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Huỳnh Anh
              </div>
            </div>
          </div>
        </div>

        {/* Tổ 3 */}
        <div className="to" style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          width: '320px',
          padding: '20px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          borderTop: '5px solid #2c7be5'
        }}>
          <h2 style={{
            color: '#2c7be5',
            marginBottom: '15px',
            fontSize: '20px'
          }}>
            Tổ 3
          </h2>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 1
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Hồ Ngọc Trâm
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Trần Nguyên Phú
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 2
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Trúc Vy
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 3
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Trường Vi
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 4
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Trường Vi
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 5
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Võ Đặng Gia Hân
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 6
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Bùi Minh Thuận
              </div>
            </div>
          </div>
        </div>

        {/* Tổ 4 */}
        <div className="to" style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          width: '320px',
          padding: '20px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          borderTop: '5px solid #2c7be5'
        }}>
          <h2 style={{
            color: '#2c7be5',
            marginBottom: '15px',
            fontSize: '20px'
          }}>
            Tổ 4
          </h2>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 1
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Mỹ Kim
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Nguyễn Tịnh Ngọc
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 2
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 3
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 4
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Danh Thị Hồng Vinh
              </div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 5
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                background: '#e9f5ff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}>
                Bùi Minh Hiếu
              </div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
          
          <div className="ban" style={{
            margin: '15px 0',
            padding: '10px',
            borderRadius: '12px',
            background: '#f9fbfd',
            border: '1px solid #e5ecf3'
          }}>
            <h3 style={{
              fontSize: '15px',
              marginBottom: '6px',
              color: '#555'
            }}>
              Bàn 6
            </h3>
            <div className="ghe" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
              <div style={{
                width: '120px',
                minHeight: '50px',
                border: '2px dashed #bbb',
                background: '#fafafa',
                color: '#888',
                fontWeight: 'normal',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}