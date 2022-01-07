import * as ProgramCommand from './builder'
import { Account, Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";
import { TICKET_ACCOUNT_DATA_LAYOUT, MILLI_USER_ACCOUNT_DATA_LAYOUT } from './state';
import { sendTxUsingExternalSignature, UseWallet, sendTxUsingExternalSignatureV2 } from './wallet-provider';
import { CONNECTION_ULR } from './config';
import { convertUSDT } from 'lib/utilities/utils';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TRADE_MINT_TOKEN } from 'lib/utilities/id';
import { Token } from '@solana/spl-token';
//const connection = new Connection("http://localhost:8899", 'singleGossip');
//const connection = new Connection("https://api.devnet.solana.com", 'singleGossip');
const connection = new Connection(CONNECTION_ULR, 'singleGossip');
const SEED = 'milli';

export const buyTicket = async (programIdString, ticketNumbers, lotteryGamePubkey, lotteryOwnerPubkey) => {
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
            { pubkey: playerWallet.publicKey, isSigner: true, isWritable: true },
            { pubkey: ticketAccount.publicKey, isSigner: false, isWritable: true },
            { pubkey: lotteryGamePubkey, isSigner: false, isWritable: false },
            { pubkey: lotteryOwnerPubkey, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: true }
        ],
        data: ProgramCommand.buyTicket(ticketNumbers)
    });

    const transaction = new Transaction().add(ticketAccountTx, buyIx);
    await sendAndConfirmTransaction(
        connection,
        transaction,
        [playerWallet, ticketAccount],
        { commitment: 'singleGossip', preflightCommitment: 'singleGossip', }
    )
    return ticketAccount.publicKey.toBase58();
}

export const buyMilliPad = async (programIdStr, milliPadPubkeyStr, milliPadOwnerPubKeyStr, adapter_type, usdt_amount) => {
    const programId = new PublicKey(programIdStr);
    const milliPadPubkey = new PublicKey(milliPadPubkeyStr);
    const milliPadOwnerPubKey = new PublicKey(milliPadOwnerPubKeyStr);
    const convertAmount = await convertUSDT(usdt_amount);
    const playerWallet = await UseWallet(adapter_type);
    let IxArr = [];

    const buyIx = new TransactionInstruction({
        programId: programId,
        keys: [
            { pubkey: milliPadPubkey, isSigner: false, isWritable: false },
            { pubkey: milliPadOwnerPubKey, isSigner: false, isWritable: true },
            { pubkey: playerWallet.publicKey, isSigner: true, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: true }
        ],
        data: ProgramCommand.buyMilliPad(convertAmount.lamports)
    });
    IxArr.push(buyIx);
    await sendTxUsingExternalSignature(connection, IxArr, null, null, playerWallet);
    return convertAmount.lamports;
}

export const buyBulkTicket = async (programIdStr, ticketSetNumbers, gamePubkeyStr, gameOwnerPubkeyStr, adapter_type) => {
    const programId = new PublicKey(programIdStr);
    const gamePubkey = new PublicKey(gamePubkeyStr);
    const gameOwnerPubkey = new PublicKey(gameOwnerPubkeyStr);
    const playerWallet = await UseWallet(adapter_type);
    const rentAmount = await connection.getMinimumBalanceForRentExemption(TICKET_ACCOUNT_DATA_LAYOUT.span, 'singleGossip');
    let ticketKeyArr = [];
    let ticketAccounts = [];
    let createAccountIxArr = [];
    let ticketIxArr = [];
    for (let i = 0; i < ticketSetNumbers.length; i++) {

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
                { pubkey: playerWallet.publicKey, isSigner: true, isWritable: true },
                { pubkey: ticketAccount.publicKey, isSigner: false, isWritable: true },
                { pubkey: gamePubkey, isSigner: false, isWritable: false },
                { pubkey: gameOwnerPubkey, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: true }
            ],
            data: ProgramCommand.buyTicket(ticketSetNumbers[i])
        });

        createAccountIxArr.push(ticketAccountTx);
        createAccountIxArr.push(buyIx);
        // ticketIxArr.push(buyIx); 
        const ticketObj = {
            publicKey: ticketAccount.publicKey.toBase58(),
            numbers: ticketSetNumbers[i]

        }
        ticketKeyArr.push(ticketObj);
        ticketAccounts.push(ticketAccount);
    }

    await sendTxUsingExternalSignature(connection, createAccountIxArr, null, ticketAccounts, playerWallet);
    //await sendTxUsingExternalSignature(connection, ticketIxArr, null, null, playerWallet);
    return ticketKeyArr;
}

export const getBalance = async (publicKey) => {
    if (typeof publicKey === 'string' || publicKey instanceof String) {
        publicKey = new PublicKey(publicKey);
    }
    const balance = await connection.getBalance(publicKey).catch(handleConnectionError);
    return balance;
};

export const buyNFTTicket = async (token_account_pubkey, mint_pubkey, adapter_type) => {

    // const programId = new PublicKey(programIdStr);
    // const gamePubkey = new PublicKey(gamePubkeyStr);
    // const gameOwnerPubkey = new PublicKey(gameOwnerPubkeyStr);
    // const playerWallet = await UseWallet(adapter_type);
    const playerWallet = await UseWallet(adapter_type);
    
    const minToken_token = new Token(
        connection,
        TRADE_MINT_TOKEN,
        TOKEN_PROGRAM_ID,
        playerWallet.publicKey
    );

    // console.log(minToken_token.publicKey.toBase58());
    const a = await minToken_token.getOrCreateAssociatedAccountInfo(new PublicKey('5UzNew13BgVFi8E1cmSu6YoHzC9ka36GgonBwdgmjzi8'));
    console.log(a.amount);
    
    // const mintPubkey = new PublicKey(mint_pubkey);
    // const tokenAccount = new PublicKey(token_account_pubkey);

    // const buyIx = new TransactionInstruction({
    //     programId: programId,
    //     keys: [
    //         { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    //         { pubkey: tokenAccount, isSigner: false, isWritable: true },
    //         { pubkey: from_trade_token_account, isSigner: false, isWritable: false },
    //         { pubkey: buyer_account, isSigner: false, isWritable: true },
    //         { pubkey: buyer_token_account, isSigner: false, isWritable: true },
    //         { pubkey: buyer_trade_token_account, isSigner: false, isWritable: true },
    //         { pubkey: pda_account, isSigner: false, isWritable: true },
    //     ],
    //     data: ProgramCommand.buyTicket(ticketSetNumbers[i])
    // });
    // await sendTxUsingExternalSignature(connection, createAccountIxArr, null, ticketAccounts, playerWallet);

    return "hello";
}

const handleConnectionError = (error) => {
    console.error(error);
};