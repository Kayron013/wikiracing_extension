import { Article } from 'models/Wiki';

export enum extEventTypes {
  START_GAME,
  CANCEL_GAME,
}
export const startGame = (run: StartEvent['payload']) => {
  const event: StartEvent = {
    type: extEventTypes.START_GAME,
    payload: { origin: run.origin, destination: run.destination },
  };
  // Alert extension scripts
  chrome.runtime.sendMessage(event);
  // Alert content scripts
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id!, event);
  });
};

export const endGame = () => {
  //TODO:
};

export const cancelGame = () => {
  const event: CancelEvent = { type: extEventTypes.CANCEL_GAME };
  // Alert extension scripts
  chrome.runtime.sendMessage(event);
  // Alert content scripts
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id!, event);
  });
};

type StartEvent = {
  type: extEventTypes.START_GAME;
  payload: {
    origin: Article;
    destination: Article;
  };
};

type CancelEvent = {
  type: extEventTypes.CANCEL_GAME;
};

export type ExtEvent = StartEvent | CancelEvent;

export const addExtEventListener = (listener: ExtEventListener) => {
  chrome.runtime.onMessage.addListener(listener);
};

export const removeExtEventListener = (listener: ExtEventListener) => {
  chrome.runtime.onMessage.removeListener(listener);
};

type ExtEventListener = (msg: ExtEvent) => void;
