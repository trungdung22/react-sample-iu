import { Account, Transaction, TransactionInstruction, Connection } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";
import {
  BaseMessageSignerWalletAdapter,
  WalletAdapterNetwork,
} from '@solana/wallet-adapter-base';
import { COMMITMENT, CLUSTERS } from "./connection";
import { SolletWalletAdapter } from "lib/wallets/sollet";
import { PhantomWalletAdapter } from "lib/wallets/phantom";
import { Coin98WalletAdapter } from "lib/wallets/coin98";
import { SOLLET_ADAPTER_NETWORD } from './config'; 

const WALLET_LIST = ["sollet", "phantom"];
const PROVIDER_URL = "https://www.sollet.io";


export const sendTxUsingExternalSignature = async (
  connection: Connection,
  instructions: TransactionInstruction[],
  feePayer: Account | null,
  signersExceptWallet: Account[] | null,
  wallet: BaseMessageSignerWalletAdapter
) => {
  let tx = new Transaction().add(...instructions);
  let { blockhash } = await connection.getRecentBlockhash();
  tx.recentBlockhash = blockhash;

  if (signersExceptWallet !== null) {
    tx.setSigners(
      ...(feePayer
        ? [(feePayer as Account).publicKey, wallet.publicKey]
        : [wallet.publicKey]),
      ...signersExceptWallet.map(s => s.publicKey)
    );
    signersExceptWallet.forEach(acc => {
      tx.partialSign(acc);
    });
  } else {
    tx.setSigners(
      ...(feePayer
        ? [(feePayer as Account).publicKey, wallet.publicKey]
        : [wallet.publicKey])
    );
  }
  let signed = await wallet.signTransaction(tx);
  let txid = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: COMMITMENT
  });
  return connection.confirmTransaction(txid, COMMITMENT);
};

let sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD});
let phantom = new PhantomWalletAdapter();
let coin98 = new Coin98WalletAdapter();

const connectToSolletWallet = () => {

  if (!sollet.connected) {
    return sollet.connect() as Promise<void>;
  } else {
    return Promise.resolve();
  }
};

const connectToPhantomWallet = () => {
  if (!phantom.connected) {
    return phantom.connect() as Promise<void>;
  } else {
    return Promise.resolve();
  }
};

const connectToCoin98Wallet = () => {
  if (!coin98.connected) {
    return coin98.connect() as Promise<void>;
  } else {
    return Promise.resolve();
  }
};

export const UseWallet = async (adapterType: string): Promise<BaseMessageSignerWalletAdapter> => {
  if (adapterType === "sollet") {
    await connectToSolletWallet();
    return sollet;
  } else if (adapterType === "coin98") {
    await connectToCoin98Wallet();
    return coin98;
  } else {
    await connectToPhantomWallet();
    return phantom;
  }
};

// let wallet = new Wallet(PROVIDER_URL, CLUSTERS.DEVNET);

// const connectToWallet = () => {
//   if (!wallet.connected) {
//     return wallet.connect() as Promise<void>;
//   } else {
//     return Promise.resolve();
//   }
// };

// export const UseWallet = async (adapterType: string): Promise<Wallet> => {
//   await connectToWallet();
//   return wallet;
// };
