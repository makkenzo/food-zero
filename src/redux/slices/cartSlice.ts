import { IDataState, IFoodItem } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IDataState = {
    items: [],
    isCartShow: false,
    subTotal: 0,
    deliveryPrice: 0,
};

const findItemIndex = (cartItems: IFoodItem[], newItem: IFoodItem): number => {
    return cartItems.findIndex((item) => item.id === newItem.id);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemsToCart: (state, action: PayloadAction<IFoodItem[]>) => {
            const newItems = action.payload;

            for (const newItem of newItems) {
                const existingIndex = findItemIndex(state.items, newItem);

                if (existingIndex !== -1) {
                    state.items[existingIndex].qty = (state.items[existingIndex].qty || 1) + 1;
                } else {
                    state.items.push({ ...newItem, qty: 1 });
                }
            }
        },
        setCartItems: (state, action: PayloadAction<IFoodItem[]>) => {
            state.items = action.payload;
        },
        setIsCartShow: (state, action: PayloadAction<boolean>) => {
            state.isCartShow = action.payload;
        },
        clearCartReducer: (state, action: PayloadAction<boolean>) => {
            state.items = action.payload === true ? [] : [...state.items];
        },
        setPriceReducer: (state, action: PayloadAction<{ subTotal: number; deliveryPrice: number }>) => {
            state.subTotal = action.payload.subTotal;
            state.deliveryPrice = action.payload.deliveryPrice;
        },
    },
});

export const { addItemsToCart, setIsCartShow, clearCartReducer, setCartItems, setPriceReducer } = cartSlice.actions;
export default cartSlice.reducer;
