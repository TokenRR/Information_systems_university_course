import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";

import logo from '../assets/img/logo.png'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const Header: React.FC = () => {
   const { itemsCart, totalCount, totalPrice } = useSelector((state: RootState) => state.cart)
   const isMounted = React.useRef(false)

   let location = useLocation();
   let isButton = location.pathname !== '/cart' ? true : false;

   React.useEffect(() => {
      if (isMounted.current) {
         localStorage.setItem('cart', JSON.stringify(itemsCart))
         localStorage.setItem('count', JSON.stringify(totalCount))
         localStorage.setItem('price', JSON.stringify(totalPrice))
      }
      isMounted.current = true;

   }, [itemsCart])

   return (
      <header className="header">
         <Link to="/">
            <div className="header__logo-and-name">
               <img src={logo} alt="" className="header__logo" width={38} height={38} />

               <div>
                  <h1 className="header__name">PIZZA SHOP</h1>
                  <p className="header__description">Найсмачніша піца у світі</p>
               </div>
            </div>
         </Link>
         {isButton &&
            <Button />
         }
      </header>
   )
}

export default Header