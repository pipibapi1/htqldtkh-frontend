import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  
);

