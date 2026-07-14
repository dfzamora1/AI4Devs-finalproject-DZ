import type { SecurityContext } from './security.js';
declare global { namespace Express { interface Request { security?:SecurityContext } } }
export {};
