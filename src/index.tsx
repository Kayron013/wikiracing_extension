import { LocalStorageProvider } from 'components/LocalStorageProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/Popup/App';

ReactDOM.render(
  <React.StrictMode>
    <LocalStorageProvider>
      <App />
    </LocalStorageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
