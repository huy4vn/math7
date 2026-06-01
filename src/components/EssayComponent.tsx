"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, ChevronDown, ChevronUp, Lightbulb, Loader2 } from "lucide-react";
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
  chapterId?: number;
}

export default function EssayComponent({ essays, chapterId }: EssayProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentInputs, setCurrentInputs] = useState<Record<number, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<number, boolean>>({});
  const [isUploadingGlobal, setIsUploadingGlobal] = useState(false);
  const [globalUploadedUrls, setGlobalUploadedUrls] = useState<string[]>([]);
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!chapterId) return;
    const loadData = async () => {
      try {
        const res = await fetch('/api/sync');
        if (res.ok) {
          const data = await res.json();
          // Filter data for this chapter - records without chapterId default to chapter 1
          const chapterRecords = data.filter((r: any) => Number(r.chapterId || 1) === Number(chapterId));
          
          // Load uploaded images
          const imageUploads = chapterRecords.filter((r: any) => r.type === 'image_upload');
          if (imageUploads.length > 0) {
            const latest = imageUploads[imageUploads.length - 1];
            if (latest.imageUrls) {
              setGlobalUploadedUrls(latest.imageUrls);
            }
          }
          
          // Load submitted answers
          const essayRecords = chapterRecords.filter((r: any) => r.type === 'essay');
          const loadedAnswers: Record<number, string> = {};
          const loadedInputs: Record<number, string> = {};
          essayRecords.forEach((r: any) => {
             loadedAnswers[r.essayIndex] = r.studentAnswer;
             loadedInputs[r.essayIndex] = r.studentAnswer;
          });
          setSubmittedAnswers(loadedAnswers);
          setCurrentInputs(prev => ({ ...prev, ...loadedInputs }));
        }
      } catch (e) {
        console.error('Failed to load data', e);
      }
    };
    loadData();
  }, [chapterId]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInputChange = (id: number, val: string) => {
    setCurrentInputs({ ...currentInputs, [id]: val });
  };

  const handleSubmit = async (idx: number) => {
    if (!currentInputs[idx] || currentInputs[idx].trim() === '') return;
    
    setIsSubmitting({ ...isSubmitting, [idx]: true });
    
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'essay',
          chapterId: chapterId || 1,
          essayIndex: idx,
          studentAnswer: currentInputs[idx],
          imageUrls: globalUploadedUrls
        })
      });
      setSubmittedAnswers({ ...submittedAnswers, [idx]: currentInputs[idx] });
    } catch (e) {
      console.error('Failed to sync', e);
    }
    
    setIsSubmitting({ ...isSubmitting, [idx]: false });
  };

  const handleGlobalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    
    setIsUploadingGlobal(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const folderPath = chapterId ? `math-revision/chuong-${chapterId}` : 'math-revision/bai-tu-luan-chung';
    formData.append('folder', folderPath);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setGlobalUploadedUrls(prev => {
          const newUrls = [...prev, data.url];
          
          // Tự động đồng bộ sang blob ngay sau khi upload
          fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'image_upload',
              chapterId: chapterId || 1,
              imageUrls: newUrls
            })
          }).catch(err => console.error('Failed to sync image upload', err));
          
          return newUrls;
        });
      }
    } catch (err) {
      console.error(err);
    }
    setIsUploadingGlobal(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      <div 
        className={styles.sectionHeader}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setIsSectionCollapsed(!isSectionCollapsed)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={styles.iconWrapper}>
            <PenTool size={20} className={styles.icon} />
          </div>
          <h2 style={{ margin: 0 }}>Thử Thách Tự Luận</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', padding: '0.5rem 1rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            disabled={isUploadingGlobal}
          >
            {isUploadingGlobal ? <Loader2 size={16} style={{ animation: 'spin 2s linear infinite' }} /> : '📸 Upload ảnh'}
          </button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {isSectionCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </button>
        </div>
      </div>

      {globalUploadedUrls.length > 0 && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.75rem', border: '1px solid #bfdbfe' }}>
          <p style={{ fontSize: '0.9rem', color: '#1e40af', margin: '0 0 0.75rem 0', fontWeight: 600 }}>
            📸 Ảnh bài làm đã tải lên ({globalUploadedUrls.length}):
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {globalUploadedUrls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" title={`Xem ảnh ${i + 1}`}>
                <img
                  src={url}
                  alt={`Ảnh bài làm ${i + 1}`}
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    border: '2px solid #93c5fd',
                    display: 'block',
                    transition: 'transform 0.2s, border-color 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLImageElement).style.borderColor = '#2563eb'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.borderColor = '#93c5fd'; }}
                />
              </a>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {!isSectionCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
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
                  {submittedAnswers[idx] ? (
                    <>
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
                    </>
                  ) : (
                    <div className={styles.essayInputContainer}>
                      <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Hãy nhập kết quả bạn tính được trước khi xem lời giải nhé:</p>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          className={styles.essayInput}
                          placeholder="Nhập đáp án của bạn..." 
                          value={currentInputs[idx] || ''}
                          onChange={(e) => handleInputChange(idx, e.target.value)}
                        />
                        <button 
                          className={`btn btn-primary ${styles.essaySubmitBtn}`}
                          onClick={() => handleSubmit(idx)}
                          disabled={isSubmitting[idx] || !currentInputs[idx]}
                        >
                          {isSubmitting[idx] ? <Loader2 size={18} style={{ animation: 'spin 2s linear infinite' }} /> : 'Gửi & Xem Giải'}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleGlobalFileUpload} 
      />
    </motion.div>
  );
}
