import 'utils/dev';
import { setLocalStorage, getLocalStorage } from 'utils/chrome/storage';
import { LocalStorage } from 'models/Storage';
import { ExtEvent, extEventTypes } from 'utils/chrome/events';
import { Article } from 'models/Wiki';

export {};
chrome.runtime.onInstalled.addListener(function () {
  const initial: LocalStorage = {
    isPlaying: false,
    currentGame: {
      origin: { title: '', url: '' },
      destination: { title: '', url: '' },
      startTime: NaN,
      stops: [],
    },
    lastRun: null,
  };
  chrome.storage.local.clear();
  setLocalStorage(initial);

  // Set this extension to only be active on wikipedia pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'en.wikipedia.org' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

const getTabUpdateListener = (id: number): TabUpdateListener => async (tabId, changeInfo, tab) => {
  if (tabId === id && changeInfo.title) {
    const article: Article = {
      title: changeInfo.title,
      url: tab.url!,
    };
    const { currentGame } = await getLocalStorage();

    currentGame.stops.push(article);

    if (article.url === currentGame.destination.url) {
      //TODO: endGame
    }
    setLocalStorage({ currentGame });
  }
};

let tabUpdateListener: TabUpdateListener;

chrome.runtime.onMessage.addListener(async (evt: ExtEvent) => {
  switch (evt.type) {
    case extEventTypes.START_GAME:
      setLocalStorage({
        isPlaying: true,
        currentGame: {
          startTime: Date.now(),
          stops: [],
          origin: evt.payload.origin,
          destination: evt.payload.destination,
        },
      });

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const id = tabs[0].id;
        tabUpdateListener = getTabUpdateListener(id!);
        chrome.tabs.onUpdated.addListener(tabUpdateListener);
      });
      break;

    case extEventTypes.CANCEL_GAME:
      setLocalStorage({
        isPlaying: false,
        currentGame: {
          origin: { title: '', url: '' },
          destination: { title: '', url: '' },
          startTime: NaN,
          stops: [],
        },
      });

      chrome.tabs.onUpdated.removeListener(tabUpdateListener as any);
      break;

    default:
      throw `Unsupported event type: ${(evt as any).type}`;
  }
});

type TabUpdateListener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void;
