import { Fragment, forwardRef } from "react";
import classes from './Input.module.css'

//refs ARE ONLY USED IN DEFAULT COMPONENTS. TO USE refs IN CUSTOM COMPONENTS WE USE forwardRef FROM REACT
const Input = forwardRef((props, ref) => {
    return (
        <Fragment>
            <div className={classes.input}>
                <label htmlFor={props.input.id}>{props.label}</label>
                <input ref={ref} {...props.input} />
            </div>
        </Fragment>
    )
});
export default Input;