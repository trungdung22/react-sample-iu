import { ENV } from '../../data/constants';
import {
    WalletAdapterNetwork,
  } from '@solana/wallet-adapter-base';

var connection_url = ""; 
var adapter_type;
if (ENV === "mainet") {
    connection_url = "https://api.mainnet-beta.solana.com";
    adapter_type = WalletAdapterNetwork.Mainnet;
} else {
    connection_url = "https://api.devnet.solana.com";
    adapter_type = WalletAdapterNetwork.Devnet;
}

export const CONNECTION_ULR = connection_url;
export const SOLLET_ADAPTER_NETWORD = adapter_type;