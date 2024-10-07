# Crypto Wallet

A crypto wallet that makes it easy to use the blockchain.
This wallet currently supports Ethereum, Polygon, and Holosky. If you need to add support for more coins, you can do so by modifying the Chain model and TransactionUtils accordingly.

1. Create account
2. Restore account
3. Send ETH
4. View transactions

## Quickstart

```
yarn install
yarn start
```

## Build as an extension:

1. `yarn build`
1. Visit `chrome://extensions` in Chrome browser and 
1. Turn on developer mode
1. Click load unpacked and select the `build/` folder generated from `yarn build`

## Publish to Chrome Store
1. Update the version number in manifest.json
1. Build deployment package: `yarn build`
1. Zip `build/` folder: `zip -r build.zip build`
1. Upload package in Chrome web store developer dashboard
1. Follow instructions on page to submit for review

## Before running the application, please make the following updates:

Update API_KEY in TransactionService
In `src/services/TransactionService.ts`, update the API_KEY variable with your own API key.

Update rpcUrl in Chain model
In `src/models/Chain.ts`, update the rpcUrl property with the relevant URL for each chain.

Once you have made these updates, you can run the application.

Note: The Chain model is not shown in the provided code, so you will need to find the Chain.ts file and update the rpcUrl property accordingly.

Also, please be aware that hardcoding API keys and other sensitive information in your code is not recommended for security reasons. You should consider using environment variables or a secure storage mechanism to store and retrieve these values.