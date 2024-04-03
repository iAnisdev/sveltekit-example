import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { Product } from './Schema.js';
import { fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

export const load = async () => {
	// Create the form with the last step, to get all default values
	const form = await superValidate(zod(Product));
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(Product));

		if (!form.valid) {
			setFlash({ type: 'error', message: 'Invalid form!' }, cookies);
			return fail(400, { form });
		}

		setFlash({ type: 'success', message: 'Form posted successfully!' }, cookies);
		return message(form, 'Form posted successfully!');
	}
};
