export interface WikiRun {
  origin: Article;
  destination: Article;
  articles: Article[];
  duration: number;
}

export interface Article {
  url: string;
  title: string;
}
