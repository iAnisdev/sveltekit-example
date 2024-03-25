import { writable } from 'svelte/store';
import BlockchainAPI from '../lib/BlockchainAPI';

// Create a writable store
export const ticker = writable([]);
export const unconfirmedTransactions = writable([]);

// function to load unconfirmed transactions
export async function LoadUnconfirmedTransactions() {
  const response = await BlockchainAPI.get('/unconfirmed-transactions?format=json');
  unconfirmedTransactions.set(response.data.txs);
}