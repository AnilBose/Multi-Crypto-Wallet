export type Chain = {
    chainId: string;
    name: string;
    blockExplorerUrl: string;
    rpcUrl: string;
  };
  
export const goerli: Chain = {
    chainId: '5',
    name: 'Holesky',
    blockExplorerUrl: 'https://holesky.etherscan.io',
    rpcUrl: 'https://holesky.infura.io/v3/5ff96c2e8245482b8a91a646f780445f',
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/5ff96c2e8245482b8a91a646f780445f',
};

export const CHAINS_CONFIG = {
    [goerli.chainId]: goerli,
    [mainnet.chainId]: mainnet,
};