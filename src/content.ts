/**
 * This content script is responsible for interrupting attempted navigation
 * away from wikipedia.org during a play session.
 */

import 'utils/dev';
import { getLocalStorage } from 'utils/chrome/storage';
import { addExtEventListener, ExtEvent, extEventTypes } from 'utils/chrome/events';

const externalLinkListener = (event: Event) => {
  const link = event.target as HTMLLinkElement;
  if (link.nodeName === 'A') {
    const isExternalLink = !/^https:\/\/en\.wikipedia\.org.*/.test(link.href);
    if (isExternalLink) {
      const leave = window.confirm(
        `WikiRacing\n
        You are about to leave wikipedia.org. This will end the game.\n
        Leave Wikipedia?`
      );
      !leave && event.preventDefault();
    }
  }
};

const eventListener = (event: ExtEvent) => {
  switch (event.type) {
    case extEventTypes.START_GAME:
      document.addEventListener('click', externalLinkListener);
      break;
    case extEventTypes.CANCEL_GAME:
      document.removeEventListener('click', externalLinkListener);
      break;
    default:
      throw `Unsupported event type: ${(event as any).type}`;
  }
};

(async () => {
  const { isPlaying } = await getLocalStorage();
  if (isPlaying) {
    document.addEventListener('click', externalLinkListener);
  }

  addExtEventListener(eventListener);
})();

export {};
