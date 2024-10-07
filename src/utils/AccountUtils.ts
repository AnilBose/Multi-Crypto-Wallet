import { Wallet } from 'ethers';
import { Account } from '../models/Account';
import { Chain } from '../models/Chain';

export function generateAccount(seedPhrase: string = "", chain: Chain): 
{ account: Account, seedPhrase: string } {
  let wallet: Wallet;

  if (seedPhrase === "") {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }

  wallet = (seedPhrase.includes(" ")) ? Wallet.fromMnemonic(seedPhrase) : new Wallet(seedPhrase);

  const { address } = wallet;
  const account = { address, privateKey: wallet.privateKey, balance: "0", chain: chain.chainId };
  
  return { account, seedPhrase: seedPhrase.includes(" ")? seedPhrase : "" };
}

export function shortenAddress(str: string, numChars: number=4) {
  return `${str.substring(0, numChars)}...${str.substring(str.length - numChars)}`;
}

export function toFixedIfNecessary(value: string, decimalPlaces: number = 6): string {
  const num = parseFloat(value);
  if (num < 1e-6) {
    return num.toFixed(decimalPlaces);
  }
  return num.toString();
}