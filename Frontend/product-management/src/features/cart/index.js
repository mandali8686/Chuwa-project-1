import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch user's cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:5400/api/carts/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch cart.");
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Add item to cart
export const addCartItem = createAsyncThunk("cart/addItem", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5400/api/carts/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to add item to cart.");
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Remove item from cart
export const removeCartItem = createAsyncThunk("cart/removeItem", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5400/api/carts/remove', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to remove item.");
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Clear a specific item from the cart
export const clearCartItem = createAsyncThunk("cart/clearItem", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:5400/api/carts/clear-item', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to clear item.");
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Clear entire cart
export const clearCart = createAsyncThunk("cart/clearAll", async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:5400/api/carts/clear/${userId}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to clear cart.");
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    CartItems: {},      // { [productId]: { ...productInfo, cartQuantity } }
    loading: false,
    error: null,
    count: 0,
    totalPrice: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        const items = action.payload;
        let total = 0, count = 0;
        state.CartItems = {};
        items.forEach(item => {
          const id = item.product._id;
          state.CartItems[id] = {
            ...item.product,
            cartQuantity: item.cartQuantity
          };
          total += item.product.price * item.cartQuantity;
          count += item.cartQuantity;
        });
        state.totalPrice = total;
        state.count = count;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const items = action.payload.items;
        let total = 0, count = 0;
        state.CartItems = {};
        items.forEach(item => {
          const id = item.product._id;
          state.CartItems[id] = {
            ...item.product,
            cartQuantity: item.cartQuantity
          };
          total += item.product.price * item.cartQuantity;
          count += item.cartQuantity;
        });
        state.totalPrice = total;
        state.count = count;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const items = action.payload.items;
        let total = 0, count = 0;
        state.CartItems = {};
        items.forEach(item => {
          const id = item.product._id;
          state.CartItems[id] = {
            ...item.product,
            cartQuantity: item.cartQuantity
          };
          total += item.product.price * item.cartQuantity;
          count += item.cartQuantity;
        });
        state.totalPrice = total;
        state.count = count;
        state.error = null;
      })
      .addCase(clearCartItem.fulfilled, (state, action) => {
        const items = action.payload.items;
        let total = 0, count = 0;
        state.CartItems = {};
        items.forEach(item => {
          const id = item.product._id;
          state.CartItems[id] = {
            ...item.product,
            cartQuantity: item.cartQuantity
          };
          total += item.product.price * item.cartQuantity;
          count += item.cartQuantity;
        });
        state.totalPrice = total;
        state.count = count;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.CartItems = {};
        state.totalPrice = 0;
        state.count = 0;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload || action.error.message;
        }
      );
  }
});

export const selectQuantityById = (id) => (state) =>
  state.cart.CartItems[id]?.cartQuantity || 0;

export const cartReducer = cartSlice.reducer;
