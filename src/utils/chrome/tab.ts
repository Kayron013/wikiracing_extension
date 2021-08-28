export const getCurrentTab = (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0]);
    });
  });
};

export const navigateTo = (url: string) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.update({ url }, () => {
      resolve(null);
    });
  });
};
