import api from "./api";

export const initPayment = (data) =>
  api.post("/payments/initialize", data);

export const verifyPayment = (reference) =>
  api.get(`/payments/verify/${reference}`);


