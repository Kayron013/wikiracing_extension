import { Article } from 'models/Wiki';
import { useEffect, useState } from 'react';
import { getCurrentTab } from 'utils/chrome';
import { tabToArticle } from 'utils/wiki/article';

export const useCurrentArticle = () => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    let isMounted = true;

    getCurrentTab().then(currentTab => {
      if (isMounted) {
        setArticle({ title: currentTab.title!, url: currentTab.url! });
      }

      const listener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
        if (tabId === currentTab.id && changeInfo.status === 'complete') {
          if (isMounted) {
            setArticle(tabToArticle(tab));
          }
        }
      };

      chrome.tabs.onUpdated.addListener(listener);

      return () => {
        isMounted = false;
        chrome.tabs.onUpdated.removeListener(listener);
      };
    });
  }, []);

  return article;
};
