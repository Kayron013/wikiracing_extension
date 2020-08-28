import 'utils/dev';
import { setLocalStorage, getLocalStorage } from 'utils/chrome/storage';
import { LocalStorage } from 'models/Storage';
import { Event, eventTypes } from 'utils/chrome/events';

export {};
chrome.runtime.onInstalled.addListener(function () {
  const initial: LocalStorage = {
    isPlaying: false,
    startedAt: NaN,
    hopCount: NaN,
    lastRun: { time: NaN, hops: NaN },
  };
  setLocalStorage(initial);

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
  if (tabId === id && changeInfo.url) {
    //console.log({ changeInfo, tab });
    console.log('incrementing hop count');
    const { hopCount } = await getLocalStorage();
    setLocalStorage({ hopCount: hopCount + 1 });
  }
  if (tabId === id) {
    console.log({ changeInfo, tab });
  }
};

let tabUpdateListener: TabUpdateListener;

chrome.runtime.onMessage.addListener(async (msg: Event) => {
  switch (msg.type) {
    case eventTypes.START_GAME:
      setLocalStorage({ isPlaying: true, startedAt: Date.now(), hopCount: 0 });

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const id = tabs[0].id;
        tabUpdateListener = getTabUpdateListener(id!);
        chrome.tabs.onUpdated.addListener(tabUpdateListener);
      });

      break;
    case eventTypes.END_GAME:
      setLocalStorage({ isPlaying: false, startedAt: Date.now() });
      chrome.tabs.onUpdated.removeListener(tabUpdateListener as any);
      break;
    default:
      throw `Unsupported event type: ${msg.type}`;
  }
});

type TabUpdateListener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => void;
