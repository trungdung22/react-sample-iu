import * as ProgramCommand from './builder'
import { Account, Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction, sendAndConfirmTransaction, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TICKET_ACCOUNT_DATA_LAYOUT, MILLI_USER_ACCOUNT_DATA_LAYOUT } from './state';
import { sendTxUsingExternalSignature, UseWallet, sendTxUsingExternalSignatureV2 } from './wallet-provider';
import { CONNECTION_ULR } from './config';
import { convertUSDT } from 'lib/utilities/utils';
import { TOKEN_PROGRAM_ID, Token} from '@solana/spl-token';
import { getOrCreateTokenAccountInstruction } from 'lib/utilities/utils';
import { USDC_REP_MINT_TOKEN, MILLI_MINT_KEY, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from 'lib/utilities/id';
const axios = require('axios');
//const connection = new Connection("http://localhost:8899", 'singleGossip');
const connection = new Connection("https://api.devnet.solana.com", 'singleGossip');
// const connection = new Connection(CONNECTION_ULR, 'singleGossip');
const SEED = 'milli';

async function getTokenAmount(walletAddress, tokenMintAddress) {

    const response = await axios({
      url: CONNECTION_ULR,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: [
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenAccountsByOwner",
            params: [
              walletAddress,
              {
                mint: tokenMintAddress,
              },
              {
                encoding: "jsonParsed",
              },
            ],
          }
      ]
    });
    return Number(response.data[0].result.value[0].account.data.parsed.info.tokenAmount.amount);
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
    const minToken_token = new Token(
        connection,
        MILLI_MINT_KEY,
        TOKEN_PROGRAM_ID,
        playerWallet.publicKey
    );
    debugger
    const playerTokenAccount = await minToken_token.getOrCreateAssociatedAccountInfo(playerWallet.publicKey);
    const ownerTokenAccount = await minToken_token.getOrCreateAssociatedAccountInfo(gameOwnerPubkey);
    let ticketKeyArr = [];
    let ticketAccounts = [];
    let createAccountIxArr = [];
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
                { pubkey: playerTokenAccount.address, isSigner: false, isWritable: true },
                { pubkey: ownerTokenAccount.address, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
            ],
            data: ProgramCommand.buyTicket(ticketSetNumbers[i])
        });

        createAccountIxArr.push(ticketAccountTx);
        createAccountIxArr.push(buyIx);
        const ticketObj = {
            publicKey: ticketAccount.publicKey.toBase58(),
            numbers: ticketSetNumbers[i]

        }
        ticketKeyArr.push(ticketObj);
        ticketAccounts.push(ticketAccount);
    }

    await sendTxUsingExternalSignature(connection, createAccountIxArr, null, ticketAccounts, playerWallet);
    return ticketKeyArr;
}

export const getBalance = async (publicKey, adapter_type) => {
    if (typeof publicKey === 'string' || publicKey instanceof String) {
        publicKey = new PublicKey(publicKey);
    }
    try {
        const balance = await getTokenAmount(publicKey.toBase58(), MILLI_MINT_KEY.toBase58());
        return balance;
    } catch (error) {
        console.log(error);
    }
    
};

export const buyNFTTicket = async (milli_nft_account, owner_pubkey, token_account_pubkey, mint_pubkey, price, adapter_type) => {
    const onwerAccount = new PublicKey(owner_pubkey);
    const milliNftAccount = new PublicKey(milli_nft_account);

    // const programId = new PublicKey('Fx1q31GChnsdaZauYRTcfKjwUAK1Jqyj6CFvzGcem1Ft');
    const programId = new PublicKey('8pKHJxuSqkUHRx4vS1H3jaDXzBF4hdC2YL1Hic4ejwep');


    const playerWallet = await UseWallet(adapter_type);
    const mintPubkey = new PublicKey(mint_pubkey);
    
    let instructions = [];
    
    const ticket_token = new Token(
        connection,
        mintPubkey,
        TOKEN_PROGRAM_ID,
        playerWallet.publicKey
    );

    const USDC_token = new Token(
        connection,
        USDC_REP_MINT_TOKEN,
        TOKEN_PROGRAM_ID,
        playerWallet.publicKey
    );
    const owner_tokenAccount = new PublicKey(token_account_pubkey);

    const buyer_tokenAccount = await getOrCreateTokenAccountInstruction(connection, playerWallet.publicKey, instructions, mintPubkey);

    const buyer_USDC_tokenAccount = await getOrCreateTokenAccountInstruction(connection, playerWallet.publicKey, instructions, USDC_REP_MINT_TOKEN);

    const owner_USDC_tokenAccount = await getOrCreateTokenAccountInstruction(connection, onwerAccount, instructions, USDC_REP_MINT_TOKEN);

    const pda_account = await PublicKey.findProgramAddress(
        [Buffer.from("milli-auction")],
        programId
    );

    const buyIx = new TransactionInstruction({
        programId: programId,
        keys: [
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: milliNftAccount, isSigner: false, isWritable: true },
            { pubkey: onwerAccount, isSigner: false, isWritable: false },
            { pubkey: owner_tokenAccount, isSigner: false, isWritable: true },
            { pubkey: USDC_REP_MINT_TOKEN, isSigner: false, isWritable: false },
            { pubkey: owner_USDC_tokenAccount, isSigner: false, isWritable: true },
            { pubkey: buyer_tokenAccount, isSigner: false, isWritable: true },
            { pubkey: playerWallet.publicKey, isSigner: false, isWritable: false },
            { pubkey: buyer_USDC_tokenAccount, isSigner: false, isWritable: true },
            { pubkey: pda_account[0], isSigner: false, isWritable: true },
        ],
        data: ProgramCommand.buyNFTTicket(price)
    });
    instructions.push(buyIx);
    const tx = await sendTxUsingExternalSignature(connection, instructions, null, null, playerWallet);
    return buyer_tokenAccount.toBase58();
}

const handleConnectionError = (error) => {
    console.error(error);
};