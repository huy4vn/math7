"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import styles from "./ChapterComponents.module.css";

export default function KnowledgeCard({ summary }: { summary: string }) {
  return (
    <motion.div 
      className={`glass ${styles.section}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.iconWrapper}>
          <BookOpen size={20} className={styles.icon} />
        </div>
        <h2>Tóm Lược Kiến Thức</h2>
      </div>
      <div className={styles.knowledgeContent}>
        <div className={styles.markdownContent}>
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
