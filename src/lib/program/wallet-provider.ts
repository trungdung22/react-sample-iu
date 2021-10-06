import { Account, Transaction, TransactionInstruction, Connection } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";
import {COMMITMENT, CLUSTERS } from "./connection";

const PROVIDER_URL = "https://www.sollet.io";
let wallet = new Wallet(PROVIDER_URL, CLUSTERS.DEVNET);

export const sendTxUsingExternalSignature = async (
  connection: Connection,
  instructions: TransactionInstruction[],
  feePayer: Account | null,
  signersExceptWallet: Account[],
  wallet: Wallet
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

const connectToSolletWallet = () => {
  if (!wallet.connected) {
    return wallet.connect() as Promise<void>;
  } else {
    return Promise.resolve();
  }
};

export const UseWallet = async (): Promise<Wallet> => {
  await connectToSolletWallet();
  return wallet;
};
