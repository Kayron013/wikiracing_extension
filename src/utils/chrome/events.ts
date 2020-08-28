export enum eventTypes {
  START_GAME,
  END_GAME,
}

export type Event = { type: eventTypes };

export const startGame = () => {
  chrome.runtime.sendMessage({ type: eventTypes.START_GAME });
};

export const endGame = () => {
  chrome.runtime.sendMessage({ type: eventTypes.END_GAME });
};

export const addEventListener = (listener: EventListener) => {
  chrome.runtime.onMessage.addListener(listener);
};

type EventListener = (msg: Event) => void;
