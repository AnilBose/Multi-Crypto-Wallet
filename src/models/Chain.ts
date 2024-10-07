export type Chain = {
  chainId: string;
  name: string;
  blockExplorerUrl: string;
  rpcUrl: string;
  symbol: string;
};

export const goerli: Chain = {
  chainId: "5",
  name: "Holesky",
  blockExplorerUrl: "https://holesky.etherscan.io",
  rpcUrl: "",
  symbol: "ETH",
};

export const mainnet: Chain = {
  chainId: "1",
  name: "Ethereum",
  blockExplorerUrl: "https://etherscan.io",
  rpcUrl: "",
  symbol: "ETH",
};

export const polygon: Chain = {
  chainId: "80001",
  name: "Polygon Amoy",
  blockExplorerUrl: "https://amoy.polygonscan.com/",
  rpcUrl: "",
  symbol: "MATIC",
};

export const polygon_mainnet: Chain = {
  chainId: "137",
  name: "Polygon",
  blockExplorerUrl: "https://polygonscan.com",
  rpcUrl:
    "",
  symbol: "MATIC",
};

export const CHAINS_CONFIG = {
  [goerli.chainId]: goerli,
  [mainnet.chainId]: mainnet,
  [polygon.chainId]: polygon,
  [polygon_mainnet.chainId]: polygon_mainnet,
};
