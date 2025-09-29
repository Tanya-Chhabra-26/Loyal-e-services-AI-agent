// src/lib/validation/contactSchema.ts
import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(8, 'Phone must be at least 8 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
