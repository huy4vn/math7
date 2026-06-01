"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Loader2, Trash2, CheckCircle2, XCircle } from "lucide-react";

type ResultRecord = {
  id: string;
  type: "quiz" | "essay" | "image_upload";
  chapterId: number;
  timestamp: string;
  score?: number;
  total?: number;
  answers?: Record<number, number>;
  correctAnswers?: Record<number, number>;
  essayIndex?: number;
  studentAnswer?: string;
  imageUrls?: string[];
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ResultRecord[]>([]);
  const [deletingUrls, setDeletingUrls] = useState<Record<string, boolean>>({});
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);

  const handleDeleteImage = async (recordId: string, url: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa ảnh này vĩnh viễn không?")) return;
    
    setDeletingUrls(prev => ({ ...prev, [url]: true }));
    try {
      const res = await fetch("/api/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, imageUrl: url }),
      });
      
      if (res.ok) {
        setData(prevData => {
          const newData = [...prevData];
          const recordIdx = newData.findIndex(r => r.id === recordId);
          if (recordIdx > -1) {
            const record = { ...newData[recordIdx] };
            if (record.imageUrls) {
              record.imageUrls = record.imageUrls.filter(u => u !== url);
            }
            if (record.type === 'image_upload' && (!record.imageUrls || record.imageUrls.length === 0)) {
              newData.splice(recordIdx, 1);
            } else {
              newData[recordIdx] = record;
            }
          }
          return newData;
        });
      } else {
        alert("Xóa ảnh thất bại. Vui lòng thử lại.");
      }
    } catch (e) {
      console.error(e);
      alert("Đã xảy ra lỗi khi xóa ảnh.");
    } finally {
      setDeletingUrls(prev => ({ ...prev, [url]: false }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error("Sai mật khẩu hoặc lỗi hệ thống");
      }

      const resultData = await res.json();
      setData(resultData);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  };

  const optionLabels = ["A", "B", "C", "D"];

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loginWrapper}>
          <h2>Đăng Nhập Quản Trị</h2>
          <form onSubmit={handleLogin} className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !password}
            >
              {loading ? "Đang xác thực..." : "Đăng Nhập"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lịch Sử Làm Bài</h1>
      <div className={styles.dashboard}>
        <div className={styles.headerRow}>
          <div>Loại Bài</div>
          <div>Chương</div>
          <div>Thời gian</div>
          <div>Chi tiết / Điểm số</div>
        </div>

        {data.length === 0 ? (
          <div className={styles.empty}>Chưa có dữ liệu làm bài nào.</div>
        ) : (
          data.map((record) => (
            <div key={record.id} className={styles.dataRow}>
              <div>
                {record.type === "quiz" ? (
                  <span className={`${styles.badge} ${styles.badgeQuiz}`}>Trắc Nghiệm</span>
                ) : record.type === "essay" ? (
                  <span className={`${styles.badge} ${styles.badgeEssay}`}>Tự Luận</span>
                ) : (
                  <span className={`${styles.badge}`} style={{ background: '#3b82f6', color: 'white' }}>Ảnh Bài Giải</span>
                )}
              </div>
              <div>Chương {record.chapterId || 1}</div>
              <div className={styles.time}>{formatDate(record.timestamp)}</div>
              <div>
                {record.type === "quiz" ? (
                  <div>
                    <div className={styles.score} style={{ marginBottom: '0.5rem' }}>
                      {record.score} / {record.total}
                    </div>
                    {record.answers && record.correctAnswers && (
                      <div>
                        <button
                          onClick={() => setExpandedQuiz(expandedQuiz === record.id ? null : record.id)}
                          style={{ fontSize: '0.75rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.2rem 0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}
                        >
                          {expandedQuiz === record.id ? '▲ Ẩn chi tiết' : '▼ Xem chi tiết đúng/sai'}
                        </button>
                        {expandedQuiz === record.id && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {Object.keys(record.correctAnswers).map((qIdx) => {
                              const qi = Number(qIdx);
                              const studentAns = record.answers![qi];
                              const correctAns = record.correctAnswers![qi];
                              const isCorrect = studentAns === correctAns;
                              return (
                                <div key={qi} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                                  {isCorrect
                                    ? <CheckCircle2 size={14} color="#16a34a" />
                                    : <XCircle size={14} color="#dc2626" />}
                                  <span style={{ color: '#374151' }}>Câu {qi + 1}:</span>
                                  <span style={{ color: isCorrect ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                                    {studentAns !== undefined ? optionLabels[studentAns] : '?'}
                                  </span>
                                  {!isCorrect && (
                                    <span style={{ color: '#6b7280' }}>
                                      (Đúng: {optionLabels[correctAns]})
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : record.type === "essay" ? (
                  <div className={styles.details}>
                    <strong>Câu {Number(record.essayIndex) + 1}:</strong> {record.studentAnswer}
                    {record.imageUrls && record.imageUrls.length > 0 && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {record.imageUrls.map((url, i) => (
                          <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              <img src={url} alt={`Ảnh ${i + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem', border: '2px solid #bfdbfe', display: 'block' }} />
                            </a>
                            <button
                              onClick={() => handleDeleteImage(record.id, url)}
                              disabled={deletingUrls[url]}
                              style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', border: 'none', borderRadius: '50%', color: 'white', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Xóa ảnh này"
                            >
                              {deletingUrls[url] ? <Loader2 size={10} style={{ animation: 'spin 2s linear infinite' }} /> : <Trash2 size={10} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.details}>
                    <strong>Đã tải lên {record.imageUrls?.length || 0} ảnh:</strong>
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {record.imageUrls?.map((url, i) => (
                        <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt={`Ảnh ${i + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem', border: '2px solid #bfdbfe', display: 'block' }} />
                          </a>
                          <button
                            onClick={() => handleDeleteImage(record.id, url)}
                            disabled={deletingUrls[url]}
                            style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', border: 'none', borderRadius: '50%', color: 'white', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Xóa ảnh này"
                          >
                            {deletingUrls[url] ? <Loader2 size={10} style={{ animation: 'spin 2s linear infinite' }} /> : <Trash2 size={10} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
