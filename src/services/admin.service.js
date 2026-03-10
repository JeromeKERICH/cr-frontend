import api from "./api";

export const createStaff = (data) =>
  api.post("/admin/users", data);

export const getAllUsers = () =>
  api.get("/admin/users");

export const getDashboardStats = () =>
    api.get("/admin/stats");
  

export const getAllBookings = () =>
    api.get("/admin/bookings");
  
  export const assignLawyer = (data) =>
    api.post("/admin/bookings/assign", data);
  
  export const updateBookingStatus = (data) =>
    api.post("/admin/bookings/status", data);

// In admin.service.js
export const getRecentActivity = () => {
    return api.get('/admin/recent-activity');
  };

  export const getRevenueTrend = () => {
    return api.get('/admin/revenue-trend');
  };

  export const getSystemMetrics = () => {
    return api.get('/admin/system-metric');
  };

  export const deleteUser = () => {
    return api.delete('/admin/delete-user');
  };

  export const updateUser = () => {
    return api.update('/admin/update-user');
  };

  export const getBookingStats = () => {
    return api.get('admin/booking-stats');
  };

  export const getAllPayments = () =>
    api.get("/admin/payments");
  
  export const getPaymentSummary = () =>
    api.get("/admin/payments/summary");