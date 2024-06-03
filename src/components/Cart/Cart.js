import { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import baseUrls from '../../baseUrls';
const Cart = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;


    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            id: item.id,
            name: item.name,
            amount: item.amount,
            price: item.price
        })
    }
    
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cartItems = <ul className={classes['cart-items']}>
        {
        cartCtx.items.map((item) => <CartItem 
        key={item.id}
        name = {item.name}
        amount = {item.amount}
        price = {item.price}
        onAdd = {cartItemAddHandler.bind(null, item)}
        onRemove = {cartItemRemoveHandler.bind(null, item.id)}
        /> )}
        </ul>;

        const submitOrder = async (userData) => {
            setIsSubmitting(true);
            const response = await fetch(baseUrls.fetchOrdersUrl,{
                method:'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            });
            if(!response.ok) {
                throw new Error('Request Failed');
            }
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
        }

        const isSubmittingModalContent = <p>Sending order data...</p>;

        const modalActions = (
            <div className={classes.actions}>
              <button className={classes['button--alt']} onClick={props.hideCart}>
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          );


        const cartModalContent = (
            <Fragment>
              {cartItems}
              <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
              </div>
              {isCheckout && (
                <Checkout onConfirm={submitOrder} onCancel={props.hideCart} />
              )}
              {!isCheckout && modalActions}
            </Fragment>
          );

          const didSubmitModalContent = (
            <Fragment>
              <p>Successfully sent the order!</p>
              <div className={classes.actions}>
              <button className={classes.button} onClick={props.hideCart}>
                Close
              </button>
            </div>
            </Fragment>
          );

    return <Modal backDrop={props.hideCart}>
        {/* {cartItems}
        <div className={classes['total']}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCheckoutHandler={submitOrder} />}
        {!isCheckout && <div className={classes['actions']}>
              {<button onClick={props.hideCart} className={classes['button--alt']}>Close</button>}
              {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
        </div>} */}

      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}



    </Modal>
}
export default Cart;