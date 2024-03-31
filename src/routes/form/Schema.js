import { z } from 'zod';

export const Product = z.object({
	name: z.string(),
    color: z.enum(["White", "Silver", "Black"]),
    type: z.string().min(2),
    price: z.coerce.number().int().positive().min(99).max(99999)
});