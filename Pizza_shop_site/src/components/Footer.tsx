import React from 'react'
import logo from '../assets/img/logo.png'

const Footer: React.FC = () => {
   return (
      <footer className="footer">
         <div className="footer__logo-and-text">
            <img src={logo} alt="" width={38} height={38} />
            <p>перша доставка<br />безплатно</p>
         </div>
         <div className="footer__info">
            <a className="footer__info-item">Про нас</a>
            <a className="footer__info-item">Пропозиції</a>
            <a className="footer__info-item">Відгуки</a>
         </div>
         <div className="footer__contact">
            <div className="footer__contact-tel">8 800 000-00-00</div>
            <div className="footer__contact-text">дзвінки безплатні</div>
         </div>
      </footer>
   )
}

export default Footer