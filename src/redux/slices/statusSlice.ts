import { IStatus, StatusEnum } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IStatus = {
    status: StatusEnum.Failure,
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<IStatus>) => {
            state.status = action.payload.status;
        },
    },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
