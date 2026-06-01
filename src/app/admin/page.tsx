"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Loader2 } from "lucide-react";

type ResultRecord = {
  id: string;
  type: "quiz" | "essay";
  chapterId: number;
  timestamp: string;
  score?: number;
  total?: number;
  answers?: Record<number, number>;
  essayIndex?: number;
  studentAnswer?: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ResultRecord[]>([]);

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
                ) : (
                  <span className={`${styles.badge} ${styles.badgeEssay}`}>Tự Luận</span>
                )}
              </div>
              <div>Chương {record.chapterId || 1}</div>
              <div className={styles.time}>{formatDate(record.timestamp)}</div>
              <div>
                {record.type === "quiz" ? (
                  <div className={styles.score}>
                    {record.score} / {record.total}
                  </div>
                ) : (
                  <div className={styles.details}>
                    <strong>Câu {Number(record.essayIndex) + 1}:</strong> {record.studentAnswer}
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
