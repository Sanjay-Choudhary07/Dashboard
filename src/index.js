import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App'; 
import store from './store/store'; 
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  );
} else {
  console.error('Root element not found');
}
