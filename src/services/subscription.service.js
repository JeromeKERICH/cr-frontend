import api from "./api";

export const subscribe = (plan)=>
api.post("/subscriptions/subscribe",{plan});