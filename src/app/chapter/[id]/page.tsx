import { getChapterById, chapters } from "@/data";
import KnowledgeCard from "@/components/KnowledgeCard";
import QuizComponent from "@/components/QuizComponent";
import EssayComponent from "@/components/EssayComponent";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    id: chapter.id.toString(),
  }));
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapterData = getChapterById(parseInt(id));

  if (!chapterData) {
    notFound();
  }

  return (
    <div className={`container ${styles.pageWrapper}`}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={18} />
        Quay lại danh sách
      </Link>
      
      <div className={styles.headerArea}>
        <h1 className={styles.chapterTitle}>{chapterData.title}</h1>
      </div>

      <KnowledgeCard summary={chapterData.summary} />
      
      <QuizComponent quizzes={chapterData.quizzes} />
      
      <EssayComponent essays={chapterData.essays} />
    </div>
  );
}
