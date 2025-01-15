import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const getProduct = createAsyncThunk("product/getProduct", async () => {
//   const response = await axios.get("/products");
//   return response.data;
// });

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  const response = await axios.get("/products");
  return response.data;
});


// export const getProductByCategory = createAsyncThunk(
//   "product/getProductByCategory",
//   async (category) => {
//     const response = await axios.get(`/products?category_id=${category}`);
//     return response.data;
//   }
// );

// export const getProductByCategory = createAsyncThunk("product/getProductByCategory", async (categoryId) => {
//   const response = await axios.get(`/products?categoryId=${categoryId}`);
//   console.log("Produk berdasarkan kategori:", response.data.id);
//   return response.data;
// });


export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (categoryId) => {
    try {
      const response = await axios.get(`/products/${categoryId}`);
      // const response = await axios.get(`/products/category?categoryId=${categoryId}`);
      // await axios.get(`/products/category?categoryId=${categoryId}`);
      console.log("Produk berdasarkan kategori:", response.data); // Log seluruh data
      return response.data; // Pastikan mengembalikan seluruh array produk
    } catch (error) {
      console.error("Error fetching products by category:", error.message);
      throw error; // Lempar error agar dapat di-catch di rejected state
    }
  }
);



const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        // state.loading = true;
        // state.error = null;
        // state.data = null;
        state.loading = true;
        state.data = [];
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        // state.data = action.payload;
        // state.loading = false;
        // state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        // state.error = action.error.message;
        // state.loading = false;
        // state.data = null;
        state.error = action.error.message;
        state.loading = false;
      })
      // get product by category
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = false;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        // state.data = action.payload;
        // state.loading = false;
        // state.error = null;
        state.data = action.payload; // Menyimpan produk berdasarkan kategori
        state.loading = false;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      });
  },
});

export default productSlice.reducer;