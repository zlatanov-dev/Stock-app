import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";


import App from "./App";
import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5DB43D',
          colorLink: '#1890FF',
          colorSuccess: '#52C41A',
          colorWarning: '#FAAD14',
          colorError: '#FF4D4F',
          colorDisabled: '#D9D9D9',
          colorBackground: '#F5F5F5',
          colorText: '#333333',
        },
      }}
    >
    <App />
    </ConfigProvider>
    </Provider>
  </Router>
); 