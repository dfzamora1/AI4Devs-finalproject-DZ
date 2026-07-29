import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import {api} from './api'; import type {Session} from './types';
type Auth={session:Session|null;loading:boolean;login:(e:string,p:string)=>Promise<void>;logout:()=>void;has:(p:string)=>boolean};
const Context=createContext<Auth|null>(null);
export function AuthProvider({children}:{children:ReactNode}){const [session,setSession]=useState<Session|null>(null);const [loading,setLoading]=useState(true);
 const logout=useCallback(()=>{sessionStorage.removeItem('conectaph_token');setSession(null)},[]);
 useEffect(()=>{if(!sessionStorage.getItem('conectaph_token')){setLoading(false);return} api.me().then(setSession).catch(logout).finally(()=>setLoading(false))},[logout]);
 const login=async(email:string,password:string)=>{const {token}=await api.login(email,password);sessionStorage.setItem('conectaph_token',token);try{setSession(await api.me())}catch(e){logout();throw e}};
 const value=useMemo(()=>({session,loading,login,logout,has:(p:string)=>session?.permissions.some(x=>(typeof x==='string'?x:x.code)===p)??false}),[session,loading,logout]);return <Context.Provider value={value}>{children}</Context.Provider>}
export function useAuth(){const v=useContext(Context);if(!v)throw new Error('AuthProvider requerido');return v}
