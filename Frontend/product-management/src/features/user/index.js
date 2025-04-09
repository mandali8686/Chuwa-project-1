import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    loading: false,
    currentUser: null,
    isAuthenticated: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        clearUser: (state) => {
            localStorage.removeItem("token");
            state.currentUser = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.token)
            state.loading = false;
            state.currentUser = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(createUserAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createUserAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;
          })
          .addCase(createUserAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
          });
      },

})

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData, {dispatch, rejectWithValue}) => {
        try {
            const res = await fetch("http://localhost:5400/api/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              });
            if (!res.ok) {
                const data = await res.json();
                return rejectWithValue(data.message); // the rejected case in the slice will handle the error when the action is rejected
            }
            const data = await res.json();
            const loginData = {
                email: userData.email,
                password: userData.password,
              };

            await dispatch(loginUser(loginData));
            return data;
        } catch(e){
            return rejectWithValue(e.message);
        }
    }
)


export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, {rejectWithValue}) => {
        try {
            const res = await fetch("http://localhost:5400/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
              });
            const data = await res.json();
            return data;
        } catch(e){
            return rejectWithValue(e.message);
        }
    }
)

export const userReducer = userSlice.reducer
export const {setCurrentUser} = userSlice.actions
