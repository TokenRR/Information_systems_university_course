import React from 'react'

const NonFound: React.FC = () => {
   return (
      <div className="non-found">
         <h2 className="non-found__header">Нічого не знайдено 😕</h2>
         <div className="non-found__information">
            <p>На жаль, дана сторінка відсутня у нашому інтернет-магазині</p>
         </div>
      </div>
   )
}

export default NonFound