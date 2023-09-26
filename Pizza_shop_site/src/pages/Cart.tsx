import React from 'react'
import CartBlock from '../components/CartBlock'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllPizzas, selectCart } from '../redux/slices/cartSlice';

import emptyCart from '../assets/img/cart_empty-cart.svg';
import cartIcon from '../assets/img/cart_cart-icon.svg';


const Cart: React.FC = () => {
   const dispatch = useDispatch()
   const { itemsCart, totalCount, totalPrice } = useSelector(selectCart)

   const deleteAllPizzas = () => {
      if (window.confirm('Ви впевнені що хочете очистити корзину?')) {
         dispatch(removeAllPizzas())
      }
   }

   return (
      <div className="cart">
         {Object.keys(itemsCart).length !== 0
            ? <div>
               <div className="cart__header">
                  <div className="cart__img-and-tittle">
                     <img src={cartIcon} alt="" className="cart__img-cart" width={29} height={29} />
                     <h2 className="cart__tittle">Корзина</h2>
                  </div>
                  <button onClick={deleteAllPizzas} className="cart__delete-cart">
                     <svg className="cart__delete-cart-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <span className="cart__delete-cart-text">Очистити корзину</span>
                  </button>
               </div>
               <div className="cart__cart-blocks">
                  {
                     Object.keys(itemsCart).map(id => (
                        Object.keys(itemsCart[id]).map(type => (
                           <CartBlock
                              id={id}
                              imageUrl={itemsCart[id][type].imageUrl}
                              price={itemsCart[id][type].price}
                              title={itemsCart[id][type].title}
                              type={type}
                              count={itemsCart[id][type].count}
                              key={`${id}_${type}`}
                           />
                        ))
                     ))
                  }
               </div>
               <div className="cart__number-and-price">
                  <div className="cart__number">Всього піц: <span>{totalCount} шт.</span></div>
                  <div className="cart__price">Сума заказа: <span>{totalPrice} ₴</span></div>
               </div>
               <nav className="cart__navigation">
                  <Link to="/">
                     <button className="cart__back-home cart__button">
                        <svg className='cart__back-home-img' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M7 13L1 6.93015L6.86175 1" stroke="#898989" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Повернутись назад</span>
                     </button>
                  </Link>
                  <button className="cart__buy cart__button">Оплатити зараз</button>
               </nav>
            </div>

            : <div className="cart-empty">
               <h2 className="cart-empty__header">Корзина пуста 😕</h2>
               <div className="cart-empty__information">
                  <p>Ймовірно, ви не заказували ще піцу</p>
                  <p>Для того, щоб заказати піцу, перейдіть на головну сторінку</p>
               </div>

               <img src={emptyCart} alt="" className="cart-empty__empty-img" width="300" height="255" />
               <br />
               <Link to="/">
                  <button className="cart-empty__button">
                     <span>Повернутись назад</span>
                  </button>
               </Link>
            </div>
         }
      </div>
   )
}

export default Cart