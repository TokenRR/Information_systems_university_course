import React, { useEffect } from 'react'
import Footer from './components/Footer';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';

import { Route, Routes, useLocation } from 'react-router-dom';

import './scss/App.scss';
import NonFound from './pages/NonFound';

function App() {
   const location = useLocation();
   useEffect(() => {
      document.documentElement.scrollTo(0, 0);
   }, [location.pathname]);

   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/cart' element={<Cart />} />
               <Route path='*' element={<NonFound />} />
            </Routes>
         </div>
         <Footer />
      </div>

   )
}

export default App