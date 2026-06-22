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

export interface LessonLevel {
  slug: string;
  title: string;
  lessons: Pick<LessonData, 'id' | 'title' | 'number'>[];
}
