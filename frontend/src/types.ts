export type Permission = string;
export interface User { id:string; firstName:string; lastName:string; email:string; }
export interface Complex { id:string; name:string; }
export interface PropertyUnit { id:string; identifier:string; name?:string; unitGroup?:{name:string}|null; unitType?:{name:string}; }
export interface Session { user:User; activeComplex:Complex; roles:Array<string|{code:string}>; permissions:Array<string|{code:string}>; primaryPropertyUnit?:PropertyUnit|null; }
export interface CommonArea { id:string; name:string; description?:string; capacity:number; openingTime:string; closingTime:string; reservationDurationMinutes:number; active?:boolean; }
export interface Guest { id:string; fullName:string; documentType:string; documentNumber:string; notes?:string|null; }
export interface Reservation { id:string; startAt:string; endAt:string; status:'APPROVED'|'CANCELLED'|'COMPLETED'; purpose?:string; attendeeCount:number; commonArea:CommonArea; resident?:User; propertyUnit?:PropertyUnit; guests?:Guest[]; }
export interface ApiEnvelope<T>{success:boolean;data:T;message?:string}
