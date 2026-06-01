"use client";

import { chapters } from "@/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calculator, Shapes, BarChart3 } from "lucide-react";
import styles from "./page.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

const getIconForChapter = (id: number) => {
  if (id <= 2 || id === 6 || id === 7) return <Calculator size={32} className={styles.icon} />;
  if (id === 3 || id === 4 || id === 8) return <Shapes size={32} className={styles.icon} />;
  return <BarChart3 size={32} className={styles.icon} />;
};

export default function Home() {
  return (
    <div className={`container ${styles.main}`}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Hành Trình Chinh Phục Toán 7</h1>
        <p className={styles.subtitle}>
          Ôn tập toàn diện lý thuyết, làm bài tập trắc nghiệm và thử sức với các bài tự luận chuẩn sách giáo khoa Chân Trời Sáng Tạo.
        </p>
      </motion.div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {chapters.map((chapter) => (
          <motion.div key={chapter.id} variants={itemVariants}>
            <Link href={`/chapter/${chapter.id}`} className={`glass ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  {getIconForChapter(chapter.id)}
                </div>
                <h3 className={styles.cardTitle}>{chapter.title}</h3>
              </div>
              <p className={styles.cardDesc}>{chapter.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.startText}>Bắt đầu học</span>
                <ChevronRight size={18} />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
