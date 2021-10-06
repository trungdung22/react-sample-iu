import { Account, Transaction, TransactionInstruction } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";
import { getConnection, COMMITMENT, CLUSTERS } from "./connection";

const PROVIDER_URL = "https://www.sollet.io";
let wallet = new Wallet(PROVIDER_URL, CLUSTERS.DEVNET);
const connection = getConnection(CLUSTERS.DEVNET);

export const sendTxUsingExternalSignature = async (
  instructions: TransactionInstruction[],
  feePayer: Account | null,
  signersExceptWallet: Account[],
  wallet: Wallet
) => {
  let tx = new Transaction().add(...instructions);
  tx.setSigners(
    ...(feePayer
      ? [(feePayer as Account).publicKey, wallet.publicKey]
      : [wallet.publicKey]),
    ...signersExceptWallet.map(s => s.publicKey)
  );
  tx.recentBlockhash = (await connection.getRecentBlockhash("max")).blockhash;
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
