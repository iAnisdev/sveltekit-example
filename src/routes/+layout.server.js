import BlockchainAPI from '../lib/BlockchainAPI';

export async function load() {
    const response = await BlockchainAPI.get('/ticker');
    let tickerData = {
        usd: response.data.USD.sell,
        eur: response.data.EUR.sell,
        gbp: response.data.GBP.sell,
    };
    return {
        ticker: tickerData
    };
}