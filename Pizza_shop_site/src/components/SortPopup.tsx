import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort, SortByType } from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'


const sortLabel: SortByType[] = [
   {
      popupName: 'популярності',
      backendName: 'rating'
   },
   {
      popupName: 'ціні',
      backendName: 'price'
   },
   {
      popupName: 'алфавіту',
      backendName: 'title'
   }
]

const SortPopup: React.FC = () => {
   const dispatch = useDispatch()
   const sortRef = useRef<HTMLDivElement>(null)

   const activeLabelPopup = useSelector((state: RootState) => state.filter.sortBy.popupName)

   const setActiveLabel = (obj: SortByType) => {
      dispatch(setSort(obj))
      setVisiblePopup(false)
   }

   const [visiblePopup, setVisiblePopup] = useState(false)

   let toggleVisiblePopup = () => {
      setVisiblePopup(!visiblePopup)
   }

   React.useEffect(() => {
      const catchClickOutside = (event: MouseEvent) => {
         const _event = event as MouseEvent & { path: Node[] }
         if (sortRef.current && !_event.path.includes(sortRef.current)) {   // перевіряємо sortRef.current бо TS дає помилку
            setVisiblePopup(false)
         }

      }
      document.body.addEventListener('click', catchClickOutside)

      return () => {    // виконується коли компонент демонтується
         document.body.removeEventListener('click', catchClickOutside)
      }
   }, [])

   return (
      <div ref={sortRef} className="sort-popup">
         {
            visiblePopup
               ? <b className="sort-popup__sort-by sort-popup__triangle-inactive">Сортувати по: </b>
               : <b className="sort-popup__sort-by sort-popup__triangle-active">Сортувати по: </b>
         }
         <button className="sort-popup__label" onClick={toggleVisiblePopup}>{activeLabelPopup}</button>
         <ul className={`sort-popup__popup ${visiblePopup && 'sort-popup__popup-active'}`}>
            {
               sortLabel.map((obj, index) => (
                  <li
                     className={`sort-popup__popup-item ${activeLabelPopup === obj.popupName ? 'sort-popup__item-active' : ''} `}
                     key={`${obj.popupName}_${index}`}
                     onClick={() => {
                        setActiveLabel(sortLabel[index])
                     }}
                  >{obj.popupName}</li>
               ))
            }
         </ul>
      </div>
   )
}

export default SortPopup