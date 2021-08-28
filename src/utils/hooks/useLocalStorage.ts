import { useContext } from 'react';
import { context } from 'components/LocalStorageProvider';

export const useLocalStorage = () => {
  const localStorage = useContext(context);
  return localStorage;
};
