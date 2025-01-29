import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Estado inicial
const initialState = {
  auth: {},
  cargando: true,
};

// AsyncThunk para autenticar usuario
export const autenticarUsuario = createAsyncThunk(
  "auth/autenticarUsuario",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No hay token disponible");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        "http://localhost:4000/infra/perfil",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cerrarSesion(state) {
      localStorage.removeItem("token");
      state.auth = {};
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(autenticarUsuario.pending, (state) => {
        state.cargando = true;
      })
      .addCase(autenticarUsuario.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.cargando = false;
      })
      .addCase(autenticarUsuario.rejected, (state) => {
        state.auth = {};
        state.cargando = false;
      });
  },
});

export const { cerrarSesion, setAuth } = authSlice.actions;

export default authSlice.reducer;
