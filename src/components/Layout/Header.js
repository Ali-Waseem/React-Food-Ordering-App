import { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.showCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="A food table"/>
        </div>
    </Fragment>
}
export default Header;