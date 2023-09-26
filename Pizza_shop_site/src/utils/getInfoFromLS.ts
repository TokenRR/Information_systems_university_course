export const getCartFromLocalStorage = () => {
   const data = localStorage.getItem('cart')
   return data ? JSON.parse(data) : {}
}

export const getCountFromLocalStorage = () => {
   const data = localStorage.getItem('count')
   return data ? JSON.parse(data) : 0
}

export const getPriceFromLocalStorage = () => {
   const data = localStorage.getItem('price')
   return data ? JSON.parse(data) : 0
}