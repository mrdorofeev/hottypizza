import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/empty-cart.png"

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>В корзине пусто </h2>
            <p>
                Ты можешь выбрать пиццу на главной странице
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>На главную</span>
            </Link>
        </div>
    )
}

export default CartEmpty