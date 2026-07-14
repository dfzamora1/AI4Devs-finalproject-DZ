import 'dotenv/config';
import { z } from 'zod';
const schema=z.object({DATABASE_URL:z.string().min(1),JWT_SECRET:z.string().min(32),JWT_EXPIRES_IN:z.string().default('8h'),PORT:z.coerce.number().int().positive().default(3000),CORS_ORIGIN:z.string().default('http://localhost:5173')});
export const config=schema.parse(process.env);
