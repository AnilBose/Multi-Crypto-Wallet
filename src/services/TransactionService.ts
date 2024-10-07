import axios from 'axios';
import { Chain } from '../models/Chain';

export class TransactionService {
  static API_URL = 'https://deep-index.moralis.io/api/v2.2';
  static API_KEY = '';

  static async getTransactions(address: string, selectedChain: Chain) {
    const chainParam = selectedChain.name === 'Ethereum' ? 'eth' : selectedChain.name.toLowerCase();
    
    const options = {
      method: 'GET',
      url: `${TransactionService.API_URL}/${address}`,
      params: {chain: chainParam},
      headers: {accept: 'application/json', 'X-API-Key': TransactionService.API_KEY}
    };

    const response = await axios.request(options);
    return response;
  }
}