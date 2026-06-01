import chaptersList from './chapters.json';
import chapter1 from './chapter1.json';
import chapter2 from './chapter2.json';
import chapter3 from './chapter3.json';
import chapter4 from './chapter4.json';
import chapter5 from './chapter5.json';
import chapter6 from './chapter6.json';
import chapter7 from './chapter7.json';
import chapter8 from './chapter8.json';
import chapter9 from './chapter9.json';

export const chapters = chaptersList;

const chapterDataMap: Record<number, any> = {
  1: chapter1,
  2: chapter2,
  3: chapter3,
  4: chapter4,
  5: chapter5,
  6: chapter6,
  7: chapter7,
  8: chapter8,
  9: chapter9,
};

export const getChapterById = (id: number) => {
  return chapterDataMap[id] || null;
};
