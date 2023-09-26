import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type PizzaItemType = {
   id: string;
   imageUrl: string;
   price: number;
   title: string;
   types: number[];
}

interface PizzaStateType {
   items: PizzaItemType[];
   isLoaded: boolean;
}


export const fetchPizzas = createAsyncThunk<PizzaItemType[], { categoryId: number, sortBy: string }>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const { categoryId, sortBy } = params
      const res = await axios.get<PizzaItemType[]>(`https://639a102ae916a46ec0a84e7a.mockapi.io/pizzas?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}`) //http://localhost:3001
      return res.data
   })

const initialState: PizzaStateType = {
   items: [],
   isLoaded: false
}

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems: (state, action) => {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {       // якщо відправка
         state.items = []               // щоб випадко не показало старі елементи, після вибору нових
         state.isLoaded = false;
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {     // якщо успішно
         state.items = action.payload
         state.isLoaded = true;
      });
      builder.addCase(fetchPizzas.rejected, (state) => {      // якщо помилка
         state.items = [];
         state.isLoaded = true;
      });
   },

})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer