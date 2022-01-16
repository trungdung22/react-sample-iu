
import { getBalance } from "lib/program/lottery-commands";
import { IS_CONNECT, HOST_NAME } from 'data/constants';
import { SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, TOKEN_PROGRAM_ID } from "./id";
import { sendTxUsingExternalSignature } from "lib/program/wallet-provider";
const {
    SystemProgram,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    SYSVAR_RENT_PUBKEY,
    TransactionInstruction,
    Account
} = require('@solana/web3.js');

export const convertLamport = async (lamports) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST_NAME}/api/rate-converter?lamports=${lamports}`, requestOptions);
    const data = await response.json();
    return { usdt: data["usdt"], sol: data["sol"] };
}

export const convertUSDT = async (amount) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    debugger
    const response = await fetch(`${HOST_NAME}/api/rate-converter-usdt?amount=${amount}`, requestOptions);
    const data = await response.json();
    return { lamports: data["lamports"] };
}

export const priceTicket = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST_NAME}/api/price-per-ticket`, requestOptions);
    const data = await response.json();
    return { lamports: data["lamports"], usdt: data["usdt"], sol: data["sol"] };
}

export const registerMilipadPlayer = async (playerPubkey, missions, code) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerPubkey: playerPubkey,
            missions: missions,
            code: code
        })
    };
    const response = await fetch(`${HOST_NAME}/api/milli-pads/register`, requestOptions);
    return response;
}

export const getMillipads = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST_NAME}/api/milli-pads`, requestOptions);
    const data = await response.json();
    return data;
}

export const updateMiliPadPlayer = async (amount, code, playerPubkey) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount,
            code: code,
            playerPubkey: playerPubkey
        })

    };
    const response = await fetch(`${HOST_NAME}/api/milli-pads/update-amount`, requestOptions);
    return response;
}

export const insertBulkTicket = async (gamePubkey, playerPubkey, tickets) => {
    //post add ticket
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.token}`
        },
        body: JSON.stringify({
            gamePubkey: gamePubkey,
            tickets: tickets,
            playerPubkey: playerPubkey
        })

    };
    const response = await fetch(`${HOST_NAME}/api/ticket/insert-bulk`, requestOptions);
    return response;
}

export const insertNFTTransaction = async (
    user_pubkey,
    mint_pubkey,
    token_account_pubkey,
    milli_nft_account_pubkey) => {
    const token = `Bearer ${sessionStorage.getItem('token')}` ;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            user_pubkey : user_pubkey,
            mint_pubkey : mint_pubkey,
            token_account_pubkey : token_account_pubkey,
            milli_nft_account_pubkey : milli_nft_account_pubkey
        })

    };
    const response = await fetch(`${HOST_NAME}/api/nft-buy-ticket`, requestOptions);
    return response;
}

export const getGameBoardInfo = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST_NAME}/api/game-info`, requestOptions);
    const data = await response.json();
    return data;
}

export const fetchPlayerAccount = async (publicKey, walletType) => {
    if (publicKey === undefined || publicKey === '') {
        return {
            balanceUSDT: 0,
            balanceSOL: 0,
            lamportUnit: 0,
            publicKey: ''
        };
    }
    const balance = await getBalance(publicKey, walletType);

    const balanceConvert = await convertLamport(balance);
    const ticketPrice = await priceTicket()
    return {
        balanceUSDT: balanceConvert['usdt'],
        balanceSOL: balanceConvert['sol'],
        lamportUnit: ticketPrice['lamports'],
        publicKey: publicKey
    };
}

export const updateMissionPlayer = async (playerPubkey, missions, code) => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerPubkey: playerPubkey,
            mission: missions,
            code: code
        })
    };
    const response = await fetch(`${HOST_NAME}/api/milli-pads/update-mission`, requestOptions);
    return response;
}

export const updateJoinWhiteListUser = async (playerPubkey) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerPubkey: playerPubkey
        })
    };
    const response = await fetch(`${HOST_NAME}/api/milli-pads/update-first-quest`, requestOptions);
    return response;
}

export async function getOrCreateTokenAccountInstruction(connection, walletPubkey, instructions, mintKey) {
    const tokenKey = (
        await findProgramAddress(
            [
                walletPubkey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mintKey.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        )
    )[0];
    const accountKey = new PublicKey(tokenKey);
    const account = await connection.getAccountInfo(accountKey);
    if (account === null) {
        createAssociatedTokenAccountInstruction(
            instructions,
            accountKey,
            walletPubkey,
            walletPubkey,
            mintKey,
        );
    }
    return accountKey;
}

function createAssociatedTokenAccountInstruction(
    instructions,
    associatedTokenAddress,
    payer,
    walletAddress,
    splTokenMintAddress,
) {
    const keys = [
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true,
        },
        {
            pubkey: associatedTokenAddress,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: walletAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: splTokenMintAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    instructions.push(
        new TransactionInstruction({
            keys,
            programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
            data: Buffer.from([]),
        }),
    );
}

const findProgramAddress = async (
    seeds,
    programId,
) => {
    const result = await PublicKey.findProgramAddress(seeds, programId);
    return [result[0].toBase58(), result[1]];
};

const toPublicKey = (key) => {
    if (typeof key !== 'string') {
        return key;
    }
    let result = new PublicKey(key);
    return result;
};