import { Article } from 'models/Wiki';
import { navigateTo } from 'utils/chrome';

export const getCurrentArticle = () => {
  return new Promise<Article>(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const article = tabToArticle(tabs[0]);
      resolve(article);
    });
  });
};

export const navigateToRandomArticle = () => {
  return navigateTo('https://en.wikipedia.org/wiki/Special:Random');
};

export const navigateToArticle = (article: Article) => {
  return navigateTo(article.url);
};

export const tabToArticle = (tab: chrome.tabs.Tab): Article => {
  return {
    title: cleanTitle(tab.title || ''),
    url: tab.url || '',
  };
};

const cleanTitle = (title: string) => {
  return title.replace(' - Wikipedia', '');
};
