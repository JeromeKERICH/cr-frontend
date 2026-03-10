import api from "./api";

export const getProducts = () => api.get("/products");

export const getAdminProducts = () => api.get("/products/admin");

export const createProduct = (data)=>{
    return api.post("/products",data,{
    headers:{
    "Content-Type":"multipart/form-data"
    }
    });
    };

export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);

export const getProductCategories = () =>
    api.get("/products/categories");

export const searchProducts = (query) =>
    api.get(`/products/search?query=${query}`);

export const getProductById = (id) =>
    api.get(`/products/${id}`);

export const getRelatedProducts = (category, excludeId) =>
    api.get(`/products/search?query=${category}`).then(res => 
        res.data.filter(p => p._id !== excludeId)
    );

export const downloadDocument = (productId) =>
    api.get(`/products/download/${productId}`);