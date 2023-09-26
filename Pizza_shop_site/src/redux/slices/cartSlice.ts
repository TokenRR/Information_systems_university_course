import { getCartFromLocalStorage, getCountFromLocalStorage, getPriceFromLocalStorage } from './../../utils/getInfoFromLS';
import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IdAndTypeOfItem = {
   id: string,
   type: string,
}

type ItemCartType = {
   imageUrl: string;
   price: number;
   title: string;
   count: number;
}

interface CartSliceType {
   itemsCart: Record<string, Record<string, ItemCartType>>
   totalCount: number,
   totalPrice: number,
}

const initialState: CartSliceType = {
   itemsCart: getCartFromLocalStorage(),  // { id1: { t0: {imageUrl, price, title, count}, t1: {} },    id2: { t0: {}, t1: {} }, }    t - type
   totalCount: getCountFromLocalStorage(),
   totalPrice: getPriceFromLocalStorage(),
}

const calculationPriceAndCount = (state: CartSliceType) => {
   let count = 0
   let price = 0

   let idArray: string[] = Object.keys(state.itemsCart)
   if (idArray.length !== 0) {
      idArray.map(id => {
         let typeArray: string[] = Object.keys(state.itemsCart[id])
         typeArray.map(type => {
            count += state.itemsCart[id][type].count
            price += state.itemsCart[id][type].price * state.itemsCart[id][type].count
         })
      })
   }
   return [count, price]
}


export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addPizzasFromHome: (state, action: PayloadAction<{
         id: string,                                       //! зробити оптиціональним вище
         imageUrl: string,
         price: number,
         title: string,
         type: string,
      }>) => {
         if (state.itemsCart[action.payload.id]) {                               // є така піца і її тип
            if (state.itemsCart[action.payload.id][action.payload.type]) {
               state.itemsCart[action.payload.id][action.payload.type].count += 1

            } else {                                                             // є така піца але немає її тип
               state.itemsCart[action.payload.id][action.payload.type] = {
                  'imageUrl': action.payload.imageUrl,
                  'price': action.payload.price,
                  'title': action.payload.title,
                  'count': 1,
               }
            }
         } else {                                                                // немає такої піци
            state.itemsCart[action.payload.id] = {
               [action.payload.type]: {
                  'imageUrl': action.payload.imageUrl,
                  'price': action.payload.price,
                  'title': action.payload.title,
                  'count': 1,
               }
            }
         }

         [state.totalCount, state.totalPrice] = calculationPriceAndCount(state)
      },
      addOnePizza: (state, action: PayloadAction<IdAndTypeOfItem>) => {
         state.itemsCart[action.payload.id][action.payload.type].count += 1;

         [state.totalCount, state.totalPrice] = calculationPriceAndCount(state)
      },
      removeOnePizza: (state, action: PayloadAction<IdAndTypeOfItem>) => {
         state.itemsCart[action.payload.id][action.payload.type].count -= 1;

         [state.totalCount, state.totalPrice] = calculationPriceAndCount(state)
      },
      removeTypePizza: (state, action: PayloadAction<IdAndTypeOfItem>) => {
         if (Object.keys(state.itemsCart[action.payload.id]).length > 1) {
            delete state.itemsCart[action.payload.id][action.payload.type];
         } else {
            delete state.itemsCart[action.payload.id]    // щоб не залишалося { 0: {} }
         }

         [state.totalCount, state.totalPrice] = calculationPriceAndCount(state)
      },
      removeAllPizzas: (state) => {
         state.itemsCart = {};
         [state.totalCount, state.totalPrice] = [0, 0]
      },

   },
})

export const selectCart = (state: RootState) => state.cart

export const { addPizzasFromHome, addOnePizza, removeOnePizza, removeTypePizza, removeAllPizzas } = cartSlice.actions

export default cartSlice.reducer