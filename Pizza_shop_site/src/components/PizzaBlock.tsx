import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addPizzasFromHome } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';


type PizzaBlockProps = {
   id: string,
   imageUrl: string,
   price: number,
   title: string,
   types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, price, title, types }) => {
   const dispatch = useDispatch()
   const type = ["тонка", "традиційна"]

   let addedPizza = useSelector((state: RootState) => state.cart.itemsCart[id])
   let numberOfPizza = 0

   if (addedPizza) {
      Object.keys(addedPizza).map(type => (
         numberOfPizza += addedPizza[type].count
      ))
   }

   const [activeType, setActiveType] = useState(types[0])

   const addToCart = () => {
      dispatch(addPizzasFromHome({
         id,
         imageUrl,
         price,
         title,
         type: String(activeType),
      }))
   }

   return (
      <div className="wrapper-pizza-block">
         <div className="pizza-block">
            <img src={imageUrl} alt="" className="pizza-block__img" width={260} height={260} />
            <h3 className="pizza-block__title">{title}</h3>
            <div className="pizza-block__choice-types">
               {
                  types.map(name => (
                     <button
                        className={`pizza-block__type ${name === activeType ? 'pizza-block__type-active' : ''}`}
                        key={`${name}`}
                        onClick={() => { setActiveType(name) }}
                     >
                        {type[name]}
                     </button>
                  ))
               }
            </div>
            <div className="pizza-block__price-and-button">
               <div className="pizza-block__price">від {price} ₴</div>
               <button className="pizza-block__button" onClick={addToCart}>
                  <span className="pizza-block__button-text">Добавити</span>
                  <div className="pizza-block__button-counter"><span>{numberOfPizza}</span></div>
               </button>
            </div>
         </div>
      </div>
   )
}

export default PizzaBlock