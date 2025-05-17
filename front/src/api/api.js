import axios from 'axios';

const URLLOCAL = "http://localhost:4000/api";
const URLVERCEL = "https://backpruebatecnica.vercel.app/api";

const api = axios.create({
  baseURL: URLVERCEL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  try {
    console.log("Datos enviados:", { email, password });
    const response = await api.post('/usuarios/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const register = async (nombre, apellido, email, password, rol = "user") => {
  try {
    const response = await api.post('/usuarios', {
      nombre,
      apellido,
      email,
      password,
      rol
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const getProductoById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

export const createProducto = async (producto) => {
  const res = await api.post('/productos', producto);
  return res.data;
};

export const updateProducto = async (id, producto) => {
  const res = await api.put(`/productos/${id}`, producto);
  return res.data;
};

export const deleteProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data;
};


export const realizarCompra = async ({ userId, carrito }) => {
  const response = await api.post('/compras', { userId, carrito });
  return response.data;
};

export const getComprasUsuario = async (userId) => {
  try {
    const response = await api.get(`/compras/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener compras:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || 'Error al obtener las compras');
  }
};