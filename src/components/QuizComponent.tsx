"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle2, XCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import styles from "./ChapterComponents.module.css";

interface QuizProps {
  quizzes: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}

export default function QuizComponent({ quizzes }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (showResults) return;
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
  };

  const calculateScore = () => {
    let score = 0;
    quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score += 1;
    });
    return score;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quiz',
          score,
          total: quizzes.length,
          answers: selectedAnswers
        })
      });
    } catch (e) {
      console.error('Failed to sync', e);
    }
    setIsSubmitting(false);
    setShowResults(true);
  };

  // Common components to replace <p> with <span> for inline rendering
  const inlineMarkdownComponents = {
    p: ({node, ...props}: any) => <span {...props} />
  };

  return (
    <motion.div 
      className={`glass ${styles.section}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div 
        className={styles.sectionHeader}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={styles.iconWrapper}>
            <HelpCircle size={20} className={styles.icon} />
          </div>
          <h2 style={{ margin: 0 }}>Trắc Nghiệm Nhanh</h2>
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
            style={{ overflow: 'hidden' }}
          >

      <div className={styles.quizList}>
        {quizzes.map((quiz, qIdx) => {
          const isCorrect = selectedAnswers[qIdx] === quiz.answer;
          const hasAnswered = selectedAnswers[qIdx] !== undefined;

          return (
            <div key={qIdx} className={styles.quizItem}>
              <div className={styles.questionText}>
                <strong>Câu {qIdx + 1}: </strong>
                <ReactMarkdown 
                  remarkPlugins={[remarkMath, remarkGfm]} 
                  rehypePlugins={[rehypeKatex]}
                  components={inlineMarkdownComponents}
                >
                  {quiz.question}
                </ReactMarkdown>
              </div>
              <div className={styles.optionsGrid}>
                {quiz.options.map((opt, oIdx) => {
                  let optClass = styles.option;
                  if (selectedAnswers[qIdx] === oIdx) optClass += ` ${styles.selected}`;
                  if (showResults) {
                    if (oIdx === quiz.answer) optClass += ` ${styles.correct}`;
                    else if (selectedAnswers[qIdx] === oIdx) optClass += ` ${styles.wrong}`;
                  }

                  return (
                    <button 
                      key={oIdx} 
                      className={optClass}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      disabled={showResults || isSubmitting}
                    >
                      <span className={styles.optionLetter}>{String.fromCharCode(65 + oIdx)}</span>
                      <span className={styles.optionText}>
                        <ReactMarkdown 
                          remarkPlugins={[remarkMath, remarkGfm]} 
                          rehypePlugins={[rehypeKatex]}
                          components={inlineMarkdownComponents}
                        >
                          {opt}
                        </ReactMarkdown>
                      </span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showResults && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`${styles.explanation} ${isCorrect ? styles.expCorrect : styles.expWrong}`}
                  >
                    <div className={styles.expHeader}>
                      {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                      <strong>{isCorrect ? "Chính xác!" : "Chưa chính xác!"}</strong>
                    </div>
                    <div>
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath, remarkGfm]} 
                        rehypePlugins={[rehypeKatex]}
                        components={inlineMarkdownComponents}
                      >
                        {quiz.explanation}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {!showResults ? (
        <button 
          className={`btn btn-primary ${styles.submitBtn}`} 
          onClick={handleSubmit}
          disabled={Object.keys(selectedAnswers).length < quizzes.length || isSubmitting}
        >
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Loader2 size={18} style={{ animation: 'spin 2s linear infinite' }} /> Đang lưu...
            </span>
          ) : (
            "Nộp bài chấm điểm"
          )}
        </button>
      ) : (
        <div className={styles.scoreBoard}>
          <h3>Điểm của bạn: <span className={styles.score}>{calculateScore()} / {quizzes.length}</span></h3>
          <button className={`btn`} onClick={() => {
            setShowResults(false);
            setSelectedAnswers({});
          }}>
            Làm lại bài
          </button>
        </div>
      )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
