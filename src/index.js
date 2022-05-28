import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<App />} />
            {/* <Route path='/external-link' element={<RedirectPage />} /> */}
         </Routes>
      </BrowserRouter>
  </StrictMode>
);
