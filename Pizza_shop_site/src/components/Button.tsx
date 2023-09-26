import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/slices/cartSlice';

import buttonIcon from '../assets/img/header-button_cart-icon.svg'

const Button: React.FC = () => {
   const { totalCount, totalPrice } = useSelector(selectCart)

   return (
      <Link to="cart">
         <button className="header-button">
            <div className="header-button__price">{totalPrice} ₴</div>
            <div className="header-button__number-and-icon">
               <img src={buttonIcon} alt="" className="header-button__icon" width={16} height={16} />
               <p className="header-button__number">{totalCount}</p>
            </div>
         </button>
      </Link>
   )
}

export default Button