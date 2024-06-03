import { Fragment, useRef } from "react";
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        
        if( enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5 ) 
            {
                return;
            }

            props.onAddToCart(enteredAmountNumber);


    }

    return <Fragment>
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref = {amountInputRef}
                label="Amount"
                input={{
                    id: "amount",
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button type="submit" className={classes.button}>+ Add</button>
        </form>
    </Fragment>
}
export default MealItemForm;