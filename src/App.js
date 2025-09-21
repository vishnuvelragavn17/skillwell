import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';//home page 
import LoginPage from './components/LoginPage';//login page
import AboutPage from './components/About';//about us page

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
