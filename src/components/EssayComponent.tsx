"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import styles from "./ChapterComponents.module.css";

interface EssayProps {
  essays: {
    question: string;
    hint: string;
    solution: string;
  }[];
}

export default function EssayComponent({ essays }: EssayProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const inlineMarkdownComponents = {
    p: ({node, ...props}: any) => <span {...props} />
  };

  return (
    <motion.div 
      className={`glass ${styles.section}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.iconWrapper}>
          <PenTool size={20} className={styles.icon} />
        </div>
        <h2>Thử Thách Tự Luận</h2>
      </div>

      <div className={styles.essayList}>
        {essays.map((essay, idx) => (
          <div key={idx} className={styles.essayItem}>
            <div 
              className={styles.essayQuestionRow} 
              onClick={() => toggleExpand(idx)}
            >
              <div className={styles.essayQuestion}>
                <strong>Bài {idx + 1}: </strong>
                <ReactMarkdown 
                  remarkPlugins={[remarkMath, remarkGfm]} 
                  rehypePlugins={[rehypeKatex]}
                  components={inlineMarkdownComponents}
                >
                  {essay.question}
                </ReactMarkdown>
              </div>
              <button className={styles.expandBtn}>
                {expandedId === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            <AnimatePresence>
              {expandedId === idx && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.essaySolutionContainer}
                >
                  <div className={styles.hintBox}>
                    <Lightbulb size={18} className={styles.hintIcon} />
                    <div>
                      <strong>Gợi ý: </strong>
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath, remarkGfm]} 
                        rehypePlugins={[rehypeKatex]}
                        components={inlineMarkdownComponents}
                      >
                        {essay.hint}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className={styles.solutionBox}>
                    <h4>Giải chi tiết:</h4>
                    <div className={styles.markdownContent}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath, remarkGfm]} 
                        rehypePlugins={[rehypeKatex]}
                      >
                        {essay.solution}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
