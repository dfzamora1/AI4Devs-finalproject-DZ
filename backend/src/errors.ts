import type { NextFunction,Request,Response } from 'express';
import { ZodError } from 'zod';
export class AppError extends Error { constructor(public status:number,public code:string,message:string){super(message)} }
export const asyncHandler=(fn:(r:Request,s:Response,n:NextFunction)=>Promise<unknown>)=>(r:Request,s:Response,n:NextFunction)=>void fn(r,s,n).catch(n);
export const errorHandler=(e:unknown,_r:Request,s:Response,_n:NextFunction)=>{if(e instanceof ZodError)return s.status(422).json({success:false,error:{code:'VALIDATION_ERROR',message:'Datos inválidos',details:e.flatten()}});if(e instanceof AppError)return s.status(e.status).json({success:false,error:{code:e.code,message:e.message}});console.error(e);return s.status(500).json({success:false,error:{code:'INTERNAL_ERROR',message:'Error interno del servidor'}})};
