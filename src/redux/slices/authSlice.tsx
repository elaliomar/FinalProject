import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  authToken: string | null;
}

const initialState: AuthState = {
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
  },
});

export const {setAuthToken, clearAuthToken} = authSlice.actions;
export default authSlice.reducer;
