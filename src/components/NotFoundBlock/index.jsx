import React from 'react'
import { Link } from "react-router-dom";

export const NotFoundBlock = () => {
    return(
        <div className="cart cart--empty">
            <h2>Страница не существует</h2>
            <p>
                Ты можешь выбрать пиццу на главной странице
            </p>
            <Link to="/" className="button button--black">
                <span>На главную</span>
            </Link>
        </div>
    )
}

export default NotFoundBlock