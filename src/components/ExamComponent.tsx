"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import styles from "./ExamComponent.module.css";
import chapterStyles from "./ChapterComponents.module.css";
import Link from "next/link";

interface ExamProps {
  exam: {
    id: string;
    title: string;
    difficulty: string;
    duration: number;
    quizzes: {
      question: string;
      options: string[];
      answer: number;
      explanation: string;
    }[];
    essays: {
      question: string;
      solution: string;
      maxScore: number;
    }[];
  };
}

export default function ExamComponent({ exam }: ExamProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60);

  useEffect(() => {
    if (isSubmitted || timeRemaining <= 0) {
      if (timeRemaining <= 0 && !isSubmitted) {
        setIsSubmitted(true);
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining, isSubmitted]);

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
  };

  const calculateMCQScore = () => {
    let score = 0;
    exam.quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score += 0.25;
    });
    return score;
  };

  const handleSubmit = () => {
    if (confirm("Bạn có chắc chắn muốn nộp bài? Bạn sẽ không thể sửa đổi sau khi nộp.")) {
      setIsSubmitted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const inlineMarkdownComponents = {
    p: ({node, ...props}: any) => <span {...props} />
  };

  return (
    <div className={`container ${styles.examContainer}`}>
      <div className={styles.examHeader}>
        <div className={styles.examInfo}>
          <h1 className={styles.examTitle}>{exam.title}</h1>
          <div className={styles.examMeta}>
            <span className={styles.badge} data-level={exam.difficulty}>{exam.difficulty}</span>
            <span className={styles.badgeTimer}>
              <Clock size={16} /> 
              {isSubmitted ? "Đã nộp bài" : formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        {!isSubmitted && (
          <button className={`btn btn-primary ${styles.submitTopBtn}`} onClick={handleSubmit}>
            Nộp bài ngay
          </button>
        )}
      </div>

      {isSubmitted && (
        <motion.div 
          className={`glass ${styles.resultBoard}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>Kết quả làm bài</h2>
          <div className={styles.scoreSummary}>
            <div className={styles.scoreCard}>
              <h3>Điểm Trắc nghiệm</h3>
              <div className={styles.scoreValue}>{calculateMCQScore().toFixed(2)} / 3.0</div>
              <p>Hệ thống chấm tự động</p>
            </div>
            <div className={styles.scoreCard}>
              <h3>Điểm Tự luận</h3>
              <div className={styles.scoreValue}>? / 7.0</div>
              <p>Tự đối chiếu Rubric bên dưới</p>
            </div>
            <div className={styles.scoreCard}>
              <h3>Tổng Điểm Ước Tính</h3>
              <div className={styles.scoreValue}>{calculateMCQScore().toFixed(2)} + ?</div>
              <p>Thang điểm 10</p>
            </div>
          </div>
          <Link href="/exam" className="btn" style={{ marginTop: '1.5rem' }}>Quay lại danh sách đề</Link>
        </motion.div>
      )}

      <div className={styles.sectionTitle}>Phần I: Trắc nghiệm (3.0 điểm)</div>
      
      <div className={styles.mcqSection}>
        {exam.quizzes.map((quiz, qIdx) => {
          const isCorrect = selectedAnswers[qIdx] === quiz.answer;
          return (
            <div key={qIdx} className={chapterStyles.quizItem} style={{ marginBottom: '1.5rem' }}>
              <div className={chapterStyles.questionText}>
                <strong>Câu {qIdx + 1}: </strong>
                <ReactMarkdown 
                  remarkPlugins={[remarkMath, remarkGfm]} 
                  rehypePlugins={[rehypeKatex]}
                  components={inlineMarkdownComponents}
                >
                  {quiz.question}
                </ReactMarkdown>
              </div>
              <div className={chapterStyles.optionsGrid}>
                {quiz.options.map((opt, oIdx) => {
                  let optClass = chapterStyles.option;
                  if (selectedAnswers[qIdx] === oIdx) optClass += ` ${chapterStyles.selected}`;
                  if (isSubmitted) {
                    if (oIdx === quiz.answer) optClass += ` ${chapterStyles.correct}`;
                    else if (selectedAnswers[qIdx] === oIdx) optClass += ` ${chapterStyles.wrong}`;
                  }

                  return (
                    <button 
                      key={oIdx} 
                      className={optClass}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      disabled={isSubmitted}
                    >
                      <span className={chapterStyles.optionLetter}>{String.fromCharCode(65 + oIdx)}</span>
                      <span className={chapterStyles.optionText}>
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
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`${chapterStyles.explanation} ${isCorrect ? chapterStyles.expCorrect : chapterStyles.expWrong}`}
                  >
                    <div className={chapterStyles.expHeader}>
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

      <div className={styles.sectionTitle}>Phần II: Tự luận (7.0 điểm)</div>
      
      <div className={styles.essaySection}>
        {exam.essays.map((essay, idx) => (
          <div key={idx} className={`glass ${styles.essayItem}`}>
            <div className={styles.essayQuestion}>
              <ReactMarkdown 
                remarkPlugins={[remarkMath, remarkGfm]} 
                rehypePlugins={[rehypeKatex]}
              >
                {essay.question}
              </ReactMarkdown>
            </div>
            
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  className={styles.essaySolution}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className={styles.solutionHeader}>
                    <AlertCircle size={18} />
                    <span>Đáp án & Thang điểm (Tối đa: {essay.maxScore.toFixed(1)} điểm)</span>
                  </div>
                  <div className={chapterStyles.markdownContent}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkMath, remarkGfm]} 
                      rehypePlugins={[rehypeKatex]}
                    >
                      {essay.solution}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {!isSubmitted && (
        <div className={styles.bottomSubmit}>
          <button className={`btn btn-primary`} onClick={handleSubmit} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
            Nộp bài & Chấm điểm
          </button>
        </div>
      )}
    </div>
  );
}
