import { IDataState, IFoodItem } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IDataState = {
    items: [
        {
            id: '',
            title: '',
            imageURL: '',
            category: '',
            calories: 0,
            qty: 1,
            price: 0,
        },
    ],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setFoodItems: (state, action: PayloadAction<IFoodItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const { setFoodItems } = dataSlice.actions;
export default dataSlice.reducer;
