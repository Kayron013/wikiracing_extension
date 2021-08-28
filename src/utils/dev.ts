import { getLocalStorage } from './chrome/storage';

export const dev = {} as any;
(window as any).dev = dev;

dev.printLocalStorage = async () => {
  console.debug(await getLocalStorage());
};
