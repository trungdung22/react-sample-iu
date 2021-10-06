import * as ProgramCommand from './builder'
import { Account, Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";
import { TICKET_ACCOUNT_DATA_LAYOUT } from './state';

const connection = new Connection("http://localhost:8899", 'singleGossip');
//const connection = new Connection("https://api.devnet.solana.com", 'singleGossip');
const SEED = 'milli'; 

export const buyTicket = async(programIdString, betLamports, ticketNumbers, privateKeyByteArray, lotteryGamePubkey, lotteryOwnerPubkey) => {
    const privateKeyDecoded = privateKeyByteArray.split(',').map(s => parseInt(s));
    const playerAccount = new Account(privateKeyDecoded);
    const rentAmount = await connection.getMinimumBalanceForRentExemption(TICKET_ACCOUNT_DATA_LAYOUT.span, 'singleGossip');
    const ticketAccount = new Account();
    const programId = new PublicKey(programIdString)
    const ticketAccountTx = SystemProgram.createAccount({
        programId: programId,
        space: TICKET_ACCOUNT_DATA_LAYOUT.span,
        lamports: rentAmount,
        fromPubkey: playerAccount.publicKey,
        basePubkey: playerAccount.publicKey,
        newAccountPubkey: ticketAccount.publicKey
    });

    const buyIx = new TransactionInstruction({
        programId: programId, 
        keys: [
            { pubkey: playerAccount.publicKey, isSigner: true, isWritable: true},
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
        [playerAccount, ticketAccount],
        {commitment: 'singleGossip', preflightCommitment: 'singleGossip',}
    )
    return ticketAccount.publicKey.toBase58();
}

export const buyBulkTicket = async (programIdStr, ticketSetNumbers, privateKeyByteArray, buyLamports, gamePubkeyStr, gameOwnerPubkeyStr) => {
    const programId = new PublicKey(programIdStr);
    const gamePubkey = new PublicKey(gamePubkeyStr);
    const gameOwnerPubkey = new PublicKey(gameOwnerPubkeyStr);
    const privateKeyDecoded = privateKeyByteArray.split(',').map(s => parseInt(s));
    const playerAccount = new Account(privateKeyDecoded);
    const rentAmount = await connection.getMinimumBalanceForRentExemption(TICKET_ACCOUNT_DATA_LAYOUT.span, 'singleGossip');
    let ticketKeyArr = [];
    let ticketAccounts = [playerAccount];
    const transaction = new Transaction();
    debugger
    for(let i=0; i < ticketSetNumbers.length; i++) {

        const ticketAccount = new Account();
        const ticketAccountTx = SystemProgram.createAccount({
            programId: programId,
            space: TICKET_ACCOUNT_DATA_LAYOUT.span,
            lamports: rentAmount,
            fromPubkey: playerAccount.publicKey,
            basePubkey: playerAccount.publicKey,
            newAccountPubkey: ticketAccount.publicKey
        });
    
        const buyIx = new TransactionInstruction({
            programId: programId, 
            keys: [
                { pubkey: playerAccount.publicKey, isSigner: true, isWritable: true},
                { pubkey: ticketAccount.publicKey, isSigner: false, isWritable: true},
                { pubkey: gamePubkey, isSigner: false, isWritable: false },
                { pubkey: gameOwnerPubkey, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: true}
            ], 
            data: ProgramCommand.buyTicket(buyLamports, ticketSetNumbers[i])
        });
        
        transaction.add(ticketAccountTx);
        transaction.add(buyIx); 
        ticketKeyArr.push(ticketAccount.publicKey.toBase58());
        ticketAccounts.push(ticketAccount);
    }

    await sendAndConfirmTransaction(
        connection,
        transaction,
        ticketAccounts,
        {commitment: 'singleGossip', preflightCommitment: 'singleGossip',}
    )
    return ticketKeyArr;
}

export const getBalance = async (publicKey) => {
    if (typeof publicKey === 'string' || publicKey instanceof String){
        publicKey = new PublicKey(publicKey);
    }
    const balance = await connection.getBalance(publicKey).catch(handleConnectionError);
    return balance;
};

export const connectAccount = async(privateKeyByteArray) => {
    const privateKeyDecoded = privateKeyByteArray.split(',').map(s => parseInt(s));
    const account = new Account(privateKeyDecoded);
    const balance = await getBalance(account.publicKey); 

    return {
        publicKey: account.publicKey.toBase58(), 
        balance: balance
    }
}

const handleConnectionError = (error) => {
    console.error(error);
};