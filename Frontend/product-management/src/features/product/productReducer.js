import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  makeHTTPGETRequest,
  makeHTTPPOSTRequest,
  makeHTTPPUTRequest,
  makeHTTPDELETERequest,
} from '../../api/abstract';

const getURL = (endpoint = '') => `api/products/${endpoint}`;

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeHTTPGETRequest(getURL());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      return await makeHTTPGETRequest(getURL(productId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      return await makeHTTPPOSTRequest(getURL(), productData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductById = createAsyncThunk(
  'products/update',
  async ({ productId, updatedData }, { rejectWithValue }) => {
    try {
      return await makeHTTPPUTRequest(getURL(productId), updatedData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  'products/delete',
  async (productId, { rejectWithValue }) => {
    try {
      return await makeHTTPDELETERequest(getURL(productId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductState: (state) => {
      state.list = [];
      state.currentProduct = null;
      state.loading = false;
      state.error = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })

      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateProductById.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.meta.arg);
      });
  },
});

export const { clearProductState, setCurrentProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;