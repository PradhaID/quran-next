export interface LessonPageContent {
  title: string;
  content: React.ReactNode;
}

export interface LessonData {
  id: string;
  number: number;
  title: string;
  pages: [LessonPageContent, LessonPageContent];
}
