import { LocalStorage } from 'models/Storage';
import React, { createContext } from 'react';
import { initialLocalStorage } from 'utils/chrome/storage';
import { useLocalStorage } from './useLocalStorage';

export const context = createContext<LocalStorage>(initialLocalStorage);

export const LocalStorageProvider = (props: Props) => {
  const [localStorage] = useLocalStorage();
  const isLoaded = Boolean(localStorage);

  return isLoaded ? <context.Provider value={localStorage}>{props.children}</context.Provider> : null;
};

type Props = { children: React.ReactChild };
