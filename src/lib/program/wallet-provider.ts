import { Account, Transaction, TransactionInstruction, Connection } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";
import {
  BaseMessageSignerWalletAdapter,
  WalletAdapterNetwork,
} from '@solana/wallet-adapter-base';
import {COMMITMENT, CLUSTERS } from "./connection";
import { SolletWalletAdapter } from "lib/wallets/sollet";
import { PhantomWalletAdapter } from "lib/wallets/phantom";

const WALLET_LIST = ["sollet", "phantom"];
const PROVIDER_URL = "https://www.sollet.io";
//let wallet = new Wallet(PROVIDER_URL, CLUSTERS.DEVNET);

export const sendTxUsingExternalSignature = async (
  connection: Connection,
  instructions: TransactionInstruction[],
  feePayer: Account | null,
  signersExceptWallet: Account[],
  wallet: BaseMessageSignerWalletAdapter
) => {
  let tx = new Transaction().add(...instructions);
  debugger
  tx.setSigners(
    ...(feePayer
      ? [(feePayer as Account).publicKey, wallet.publicKey]
      : [wallet.publicKey]),
    ...signersExceptWallet.map(s => s.publicKey)
  );
  let { blockhash } = await connection.getRecentBlockhash();
  tx.recentBlockhash = blockhash;
  signersExceptWallet.forEach(acc => {
    tx.partialSign(acc);
  });
  let signed = await wallet.signTransaction(tx);
  let txid = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: COMMITMENT
  });
  return connection.confirmTransaction(txid, COMMITMENT);
};

let sollet = new SolletWalletAdapter({provider: PROVIDER_URL, network: WalletAdapterNetwork.Devnet});
let phantom = new PhantomWalletAdapter();

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

export const UseWallet = async (adapterType: string): Promise<BaseMessageSignerWalletAdapter> => {
  if (adapterType === "sollet"){
    await connectToSolletWallet();
    return sollet;
  } else {
    await connectToPhantomWallet();
    return phantom;
  }
};