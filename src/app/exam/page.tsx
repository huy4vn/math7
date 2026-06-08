import { exams } from "@/data";
import Link from "next/link";
import styles from "./page.module.css";
import { Clock, BookOpen, ChevronRight } from "lucide-react";

export default function ExamList() {
  return (
    <div className={`container ${styles.main}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Đề Thi Tổng Hợp</h1>
        <p className={styles.subtitle}>
          Thử sức với các đề thi bám sát chương trình Toán 7. Chọn mức độ phù hợp với bạn để bắt đầu làm bài.
        </p>
      </div>

      <div className={styles.grid}>
        {exams.map((exam) => (
          <Link href={`/exam/${exam.id}`} key={exam.id} className={`glass ${styles.card}`}>
            <div className={styles.cardHeader}>
              <div className={styles.difficultyBadge} data-level={exam.difficulty}>
                {exam.difficulty}
              </div>
              <h2 className={styles.cardTitle}>{exam.title}</h2>
            </div>
            
            <p className={styles.cardDesc}>{exam.description}</p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{exam.duration} phút</span>
              </div>
              <div className={styles.metaItem}>
                <BookOpen size={16} />
                <span>Tổng hợp</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span>Bắt đầu thi</span>
              <ChevronRight size={18} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
