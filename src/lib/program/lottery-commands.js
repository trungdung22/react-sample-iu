import * as ProgramCommand from './builder'
import { Account, Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";
import { TICKET_ACCOUNT_DATA_LAYOUT } from './state';
import { sendTxUsingExternalSignature, UseWallet } from './wallet-provider';

//const connection = new Connection("http://localhost:8899", 'singleGossip');
const connection = new Connection("https://api.devnet.solana.com", 'singleGossip');
const SEED = 'milli'; 

export const buyTicket = async(programIdString, betLamports, ticketNumbers, lotteryGamePubkey, lotteryOwnerPubkey) => {
    // const privateKeyDecoded = privateKeyByteArray.split(',').map(s => parseInt(s));
    //const playerAccount = new Account(privateKeyDecoded);
    const playerWallet = await UseWallet();
    const rentAmount = await connection.getMinimumBalanceForRentExemption(TICKET_ACCOUNT_DATA_LAYOUT.span, 'singleGossip');
    const ticketAccount = new Account();
    const programId = new PublicKey(programIdString)
    const ticketAccountTx = SystemProgram.createAccount({
        programId: programId,
        space: TICKET_ACCOUNT_DATA_LAYOUT.span,
        lamports: rentAmount,
        fromPubkey: playerWallet.publicKey,
        basePubkey: playerWallet.publicKey,
        newAccountPubkey: ticketAccount.publicKey
    });

    const buyIx = new TransactionInstruction({
        programId: programId, 
        keys: [
            { pubkey: playerWallet.publicKey, isSigner: true, isWritable: true},
            { pubkey: ticketAccount.publicKey, isSigner: false, isWritable: true},
            { pubkey: lotteryGamePubkey, isSigner: false, isWritable: false },
            { pubkey: lotteryOwnerPubkey, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: true}
        ], 
        data: ProgramCommand.buyTicket(betLamports, ticketNumbers)
    });

    const transaction = new Transaction().add(ticketAccountTx, buyIx);
    await sendAndConfirmTransaction(
        connection,
        transaction,
        [playerWallet, ticketAccount],
        {commitment: 'singleGossip', preflightCommitment: 'singleGossip',}
    )
    return ticketAccount.publicKey.toBase58();
}

export const buyBulkTicket = async (programIdStr, ticketSetNumbers, buyLamports, gamePubkeyStr, gameOwnerPubkeyStr, adapter_type) => {
    const programId = new PublicKey(programIdStr);
    const gamePubkey = new PublicKey(gamePubkeyStr);
    const gameOwnerPubkey = new PublicKey(gameOwnerPubkeyStr);
    const playerWallet = await UseWallet(adapter_type);
    const rentAmount = await connection.getMinimumBalanceForRentExemption(TICKET_ACCOUNT_DATA_LAYOUT.span, 'singleGossip');
    let ticketKeyArr = [];
    let ticketAccounts = [];
    let trasactionIxs = []
    for(let i=0; i < ticketSetNumbers.length; i++) {

        const ticketAccount = new Account();
        const ticketAccountTx = SystemProgram.createAccount({
            programId: programId,
            space: TICKET_ACCOUNT_DATA_LAYOUT.span,
            lamports: rentAmount,
            fromPubkey: playerWallet.publicKey,
            basePubkey: playerWallet.publicKey,
            newAccountPubkey: ticketAccount.publicKey
        });
    
        const buyIx = new TransactionInstruction({
            programId: programId, 
            keys: [
                { pubkey: playerWallet.publicKey, isSigner: true, isWritable: true},
                { pubkey: ticketAccount.publicKey, isSigner: false, isWritable: true},
                { pubkey: gamePubkey, isSigner: false, isWritable: false },
                { pubkey: gameOwnerPubkey, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: true}
            ], 
            data: ProgramCommand.buyTicket(buyLamports, ticketSetNumbers[i])
        });
        
        trasactionIxs.push(ticketAccountTx);
        trasactionIxs.push(buyIx); 
        ticketKeyArr.push(ticketAccount.publicKey.toBase58());
        ticketAccounts.push(ticketAccount);
    }

    await sendTxUsingExternalSignature(connection, trasactionIxs, null, ticketAccounts, playerWallet);
    return ticketKeyArr;
}

export const getBalance = async (publicKey) => {
    if (typeof publicKey === 'string' || publicKey instanceof String){
        publicKey = new PublicKey(publicKey);
    }
    const balance = await connection.getBalance(publicKey).catch(handleConnectionError);
    return balance;
};

const handleConnectionError = (error) => {
    console.error(error);
};