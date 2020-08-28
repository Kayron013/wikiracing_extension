export type LocalStorage = {
  isPlaying: boolean;
  startedAt: number;
  hopCount: number;
  lastRun: {
    time: number;
    hops: number;
  };
};

export type SyncStorage = {
  record: {
    time: number;
    hops: number;
  };
};
