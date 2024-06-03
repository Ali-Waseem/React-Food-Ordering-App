import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [buttonBumped, setButtonBumped] = useState(false);
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((currentNo, item) => {
        return currentNo + item.amount
    },0);

    const btnClasses = `${classes.button} ${buttonBumped ? classes.bump : ''}`;

    // useEffect IS USED HERE SO WE CAN SHOW ANIMATION ON EVERYTIME WHEN THE ITEMS IN A CART WILL CHANGE (add or remove)
    useEffect(() => {
        if(cartCtx.items.length === 0) {
            return;
        }
 
        setButtonBumped(true);
        const timer = setInterval(() => {
            setButtonBumped(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [cartCtx.items]);

    return <Fragment>
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    </Fragment>
}
export default HeaderCartButton;