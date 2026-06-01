"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronUp, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import styles from "./ChapterComponents.module.css";

export default function KnowledgeCard({ summary }: { summary: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div 
      className={`glass ${styles.section}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div 
        className={styles.sectionHeader} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={styles.iconWrapper}>
            <BookOpen size={20} className={styles.icon} />
          </div>
          <h2 style={{ margin: 0 }}>Tóm Lược Kiến Thức</h2>
        </div>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.knowledgeContent}
          >
        <div className={styles.markdownContent}>
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
