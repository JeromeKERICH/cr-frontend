import api from "./api";

export const getLawyerBookings = () =>
api.get("/lawyer/bookings");

export const updateBookingStatus = (data)=>
    api.put("/lawyer/booking/status",data);
    
    export const getLawyerStats = ()=>
    api.get("/lawyer/stats");

