import {NavLink,Navigate,Outlet} from 'react-router-dom';import type {ReactNode} from 'react';import {useAuth} from './auth';
export function Spinner(){return <div className="center"><span className="spinner"/> Cargando…</div>}
export function Alert({children,kind='error'}:{children:ReactNode;kind?:'error'|'success'|'info'}){return <div className={`alert ${kind}`} role="alert">{children}</div>}
export function Empty({children}:{children:ReactNode}){return <div className="empty">{children}</div>}
export function Protected({permission}:{permission?:string}){const {session,loading,has}=useAuth();if(loading)return <Spinner/>;if(!session)return <Navigate to="/login" replace/>;if(permission&&!has(permission))return <Navigate to="/" replace/>;return <Outlet/>}
export function Layout(){const {session,has,logout}=useAuth();const name=session?.user.firstName;return <div className="shell"><header><NavLink className="brand" to="/">Conecta<span>PH</span></NavLink><div className="identity"><small>{session?.activeComplex.name}</small><b>{name}</b><button className="link" onClick={logout}>Salir</button></div></header><aside><nav>
 {has('COMMON_AREA_VIEW')&&<NavLink to="/areas">Zonas comunes</NavLink>}{has('RESERVATION_VIEW_OWN')&&<NavLink to="/reservations">Mis reservas</NavLink>}{has('RESERVATION_VIEW_APPROVED')&&<NavLink to="/security">Vigilancia</NavLink>}{has('RESERVATION_VIEW_ALL')&&<NavLink to="/admin/reservations">Reservas</NavLink>}{has('USER_VIEW')&&<NavLink to="/admin/users">Usuarios</NavLink>}{has('PROPERTY_UNIT_VIEW')&&<NavLink to="/admin/units">Unidades</NavLink>}
 </nav></aside><main><Outlet/></main></div>}
export const fmt=(v:string)=>new Intl.DateTimeFormat('es-CO',{dateStyle:'medium',timeStyle:'short'}).format(new Date(v));
