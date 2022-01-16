import { Account, Transaction, TransactionInstruction, Connection } from "@solana/web3.js";
import {
  BaseMessageSignerWalletAdapter,
} from '@solana/wallet-adapter-base';
import { COMMITMENT } from "./connection";
import { SolletWalletAdapter } from "lib/wallets/sollet";
import { PhantomWalletAdapter } from "lib/wallets/phantom";
import { Coin98WalletAdapter } from "lib/wallets/coin98";
import { SOLLET_ADAPTER_NETWORD } from './config';
import { PROVIDER_URL } from "data/constants";
import { HOST_NAME } from 'data/constants';

// const WALLET_LIST = ["sollet", "phantom"];

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

let sollet = new SolletWalletAdapter({ provider: PROVIDER_URL, network: SOLLET_ADAPTER_NETWORD });
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
  let wallet: BaseMessageSignerWalletAdapter;
  switch(adapterType){
    case("sollet"):
      await connectToSolletWallet();
      wallet = sollet;
      break;
    case("coin98"):
      await connectToCoin98Wallet();
      wallet = coin98;
      break;
    case("phantom"):
      await connectToPhantomWallet();
      wallet = phantom;
      break;
    }
    authenticate(wallet.publicKey.toString());
    return wallet;
};

const authenticate = (walletPubkey) => {
  fetch(`${HOST_NAME}/api/auth/`, {
    method: 'POST',
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({'user': walletPubkey})
  }).then(async response => {
    const responseData = await response.json();
    if (!response.ok) {
      const error = (responseData && responseData.message) || response.statusText;
      return Promise.reject(error);
    }
    
    window.sessionStorage.setItem('token', responseData['token']);
  }).catch(err => {
      console.log(err);
  })
}

// const connectToWallet = () => {
//   debugger
//   if (!sollet.connected) {
//     return sollet.connect() as Promise<void>;
//   } else {
//     return Promise.resolve();
//   }
// };

// export const UseWallet = async (adapterType: string): Promise<BaseMessageSignerWalletAdapter> => {
//   debugger
//   await connectToPhantomWallet();
//   return sollet;
// };
