import { LocalStorage } from 'models/Storage';

export const getLocalStorage = async (key: string | null = null) => {
  let value: LocalStorage = await new Promise(resolve => {
    chrome.storage.local.get(key, resolve as any);
  });

  if (!value) {
    value = initialLocalStorage;
  }

  return value;
};

export const setLocalStorage = (value: Partial<LocalStorage>) => {
  return new Promise(resolve => chrome.storage.local.set(value, () => resolve(null)));
};

export const initialLocalStorage: LocalStorage = {
  currentGame: { destination: { title: '', url: '' }, origin: { title: '', url: '' }, stops: [], startTime: 0 },
  isPlaying: false,
  lastRun: null,
};
