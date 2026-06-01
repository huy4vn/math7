"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <p>&copy; {new Date().getFullYear()} Toán 7 Master. Dành cho học sinh ôn luyện.</p>
        <p>Sách giáo khoa: Chân Trời Sáng Tạo</p>
      </div>
    </footer>
  );
}
