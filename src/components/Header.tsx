"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import styles from "./Header.module.css";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.iconWrapper}>
            <BookOpen size={24} color="white" />
          </div>
          <span className={styles.title}>Toán 7 Master</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Trang chủ</Link>
          <a href="#about" className={styles.link}>Về chúng tôi</a>
        </nav>
      </div>
    </motion.header>
  );
}
