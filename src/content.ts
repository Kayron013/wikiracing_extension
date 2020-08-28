import { eventTypes, addEventListener } from 'utils/chrome/events';
import 'utils/dev';

console.log('Hello Content');

addEventListener(msg => {
  const content = document.querySelector('#content');
  switch (msg.type) {
    case eventTypes.START_GAME:
      content?.addEventListener('click', clickListener);
      break;
    case eventTypes.END_GAME:
      //
      break;
    default:
      throw `Unsupported event type: ${msg.type}`;
  }
});

const clickListener = (event: Event) => {
  const link = event.target as HTMLLinkElement;
  if (link.nodeName === 'A') {
  }
};

export {};
