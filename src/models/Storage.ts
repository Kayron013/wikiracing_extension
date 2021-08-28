import { Article, WikiRun } from './Wiki';

export interface LocalStorage {
  isPlaying: boolean;
  currentGame: {
    startTime: number;
    origin: Article;
    destination: Article;
    stops: Article[];
  };
  lastRun: WikiRun | null;
}

export interface SyncStorage {
  recordRuns: {
    fewestHops: WikiRun | null;
    fastestTime: WikiRun | null;
  };
}
