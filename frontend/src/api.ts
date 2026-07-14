import type {ApiEnvelope, CommonArea, Guest, PropertyUnit, Reservation, Session, User} from './types';
const BASE=(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/,'');
export class ApiError extends Error { constructor(public status:number, public code:string, message:string){super(message)} }
async function request<T>(path:string, options:RequestInit={}):Promise<T>{
 const token=sessionStorage.getItem('conectaph_token');
 const response=await fetch(`${BASE}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...options.headers}});
 let body:ApiEnvelope<T>|{error?:{code?:string;message?:string}}|undefined;
 try{body=await response.json()}catch{body=undefined}
 if(!response.ok){const error=body && 'error' in body ? body.error:undefined; throw new ApiError(response.status,error?.code ?? 'REQUEST_FAILED',error?.message ?? 'No fue posible completar la solicitud');}
 return (body as ApiEnvelope<T>).data;
}
export const api={
 login:(email:string,password:string)=>request<{token:string}>('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})}), me:()=>request<Session>('/api/auth/me'),
 areas:()=>request<CommonArea[]>('/api/common-areas'), area:(id:string)=>request<CommonArea>(`/api/common-areas/${id}`),
 availability:(id:string,q:{date:string;startTime:string;endTime:string})=>request<{available:boolean}>(`/api/common-areas/${id}/availability?${new URLSearchParams(q)}`),
 createReservation:(data:{commonAreaId:string;startAt:string;endAt:string;purpose:string;attendeeCount:number})=>request<Reservation>('/api/reservations',{method:'POST',body:JSON.stringify(data)}),
 myReservations:()=>request<Reservation[]>('/api/reservations/my'), reservation:(id:string)=>request<Reservation>(`/api/reservations/${id}`), cancel:(id:string)=>request<Reservation>(`/api/reservations/${id}/cancel`,{method:'PATCH'}),
 guests:(id:string)=>request<Guest[]>(`/api/reservations/${id}/guests`), addGuest:(id:string,data:Omit<Guest,'id'>)=>request<Guest>(`/api/reservations/${id}/guests`,{method:'POST',body:JSON.stringify(data)}), deleteGuest:(rid:string,gid:string)=>request<void>(`/api/reservations/${rid}/guests/${gid}`,{method:'DELETE'}),
 securityReservations:(date:string)=>request<Reservation[]>(`/api/security/reservations?date=${date}`), securityReservation:(id:string)=>request<Reservation>(`/api/security/reservations/${id}`),
 adminReservations:()=>request<Reservation[]>('/api/admin/reservations'), adminUsers:()=>request<User[]>('/api/admin/users'), adminUnits:()=>request<PropertyUnit[]>('/api/admin/property-units')
};
