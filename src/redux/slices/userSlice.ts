import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { LoginData } from '../../types/interface';

interface UserState {
  authenticated: boolean;
  mfaVerified: boolean;
  loginData: LoginData;
}

const initialState: UserState = {
  authenticated: false,
  mfaVerified: false,
  loginData: {
    access_token: '',
    refresh_token: '',
    is_first_login: false,
    is_mfa_active: false,
    session_key: '',
    id_token: '',
    expires_in: 0,
    expiry_time: 0,
    login_time: 0,
    date: '',
    email: '',
    username: '',
    phone_number: '',
    user_id: 0,
    owner_company: 0,
    programme_manager: 0,
    subprogramme_manager: 0,
    corporate: 0,
    entity_id: 0,
    default_profile: '',
    current_profile: '',
    permissions: [],
    user_state: '',
    user_status: '',
    user_upcoming_status: '',
    msgAlreadyShown: false,
    kybStatus: '',
    onboardingStatus: '',
    entity_name: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Login: (state, action: PayloadAction<LoginData>) => {
      state.authenticated = true;
      state.mfaVerified = false;
      state.loginData = action.payload;
    },
    MfaVerify: (state, action: PayloadAction<LoginData>) => {
      state.authenticated = true;
      state.mfaVerified = true;
      state.loginData = action.payload;
    },
    Logout: state => {
      state.authenticated = false;
      state.mfaVerified = false;
      state.loginData = initialState.loginData;
    },
  },
});

export const {Login, MfaVerify, Logout} = userSlice.actions;

export default userSlice.reducer;
