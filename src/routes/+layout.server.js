import BlockchainAPI from '../lib/BlockchainAPI';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async () => {
	const response = await BlockchainAPI.get('/ticker');
	let tickerData = {
		usd: response.data.USD.sell,
		eur: response.data.EUR.sell,
		gbp: response.data.GBP.sell
	};
	return {
		ticker: tickerData
	};
});
