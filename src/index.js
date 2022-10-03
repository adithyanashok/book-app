import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios'
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

