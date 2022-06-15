import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { LoginData, AccountDataInterface } from '../../types/interface';

interface AccountsState {
  accountList: AccountDataInterface[];
}

const initialState: AccountsState = {
  accountList: []
};

export const accountsReducer = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccountList: (state, action: PayloadAction<AccountDataInterface[]>) => {
      state.accountList = action.payload;
    },
  },
});

export const {setAccountList} = accountsReducer.actions;

export default accountsReducer.reducer;
