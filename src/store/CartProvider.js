import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + (action.item.amount * action.item.price);
        
        // const updatedItem = state.items.concat(action.item);

        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id );
        const existingItem = state.items[existingItemIndex];
        let updatedItems;

        if(existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;

        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if(action.type === 'REMOVE_ITEM') {

        const existingItemIndex = state.items.findIndex((item) => item.id === action.id );
        const existingItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems
        if(existingItem.amount === 1) {
            updatedItems = state.items.filter(ele => ele.id !== action.id);

        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    } else if(action.type === 'CLEAR_CART'){
        return defaultCartState;
    }
    return defaultCartState
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        })
    }
    
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        })
    }
    
    const clearCartHandler = () => {
        dispatchCartAction({
            type: 'CLEAR_CART'
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;