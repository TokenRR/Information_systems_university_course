import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortByType = {
   popupName: 'популярності' | 'ціні' | 'алфавіту';
   backendName: 'rating' | 'price' | 'title';
}

interface FilterStateType {
   categoryId: number;
   sortBy: SortByType;
}

const initialState: FilterStateType = {
   categoryId: 0,
   sortBy: {
      popupName: 'популярності',
      backendName: 'rating'
   }
}

export const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setCategory: (state, action: PayloadAction<number>) => {
         state.categoryId = action.payload
      },
      setSort: (state, action: PayloadAction<SortByType>) => {
         state.sortBy = action.payload
      }
   },
})

export const selectFilterCategoryId = (state: RootState) => state.filter.categoryId

export const { setCategory, setSort } = filterSlice.actions

export default filterSlice.reducer