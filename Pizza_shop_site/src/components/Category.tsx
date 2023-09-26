import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilterCategoryId, setCategory } from '../redux/slices/filterSlice';


const category = ["Всі", "М'ясні", "Вегетеріанські", "Гриль", "Гострі"];

const Category: React.FC = () => {
   const dispatch = useDispatch()
   const categoryRef = useRef<HTMLDivElement>(null)

   const [visiblePopup, setVisiblePopup] = useState(false)

   let toggleVisiblePopup = () => {
      setVisiblePopup(!visiblePopup)
   }

   React.useEffect(() => {
      const catchClickOutside = (event: MouseEvent) => {
         const _event = event as MouseEvent & { path: Node[] }
         if (categoryRef.current && !_event.path.includes(categoryRef.current)) {   // перевіряємо categoryRef.current бо TS дає помилку
            setVisiblePopup(false)
         }

      }
      document.body.addEventListener('click', catchClickOutside)

      return () => {    // виконується коли компонент демонтується
         document.body.removeEventListener('click', catchClickOutside)
      }
   }, [])

   const activeLabelId = useSelector(selectFilterCategoryId)

   const setActiveLabelId = (id: number) => {
      dispatch(setCategory(id))
      setVisiblePopup(false)
   }

   return (
      <div ref={categoryRef} className="category">
         <div className="category__small-screen">
            <span className="category__label">Показати:</span>
            <button
               className="category__item category__active category__first-button"
               onClick={toggleVisiblePopup}
            >{category[activeLabelId]}</button>

            <div className={`category__popup ${visiblePopup ? 'category__popup-active' : 'category__popup-inactive'}`}>
               {
                  category.map((name, index) => (
                     <button
                        className={`category__item ${index === activeLabelId ? 'category__active' : ''}`}
                        key={`${name}_${index}`}
                        onClick={() => { setActiveLabelId(index) }}
                     >{name}</button>
                  ))
               }
            </div>
         </div>
      </div >

   )
}

export default Category