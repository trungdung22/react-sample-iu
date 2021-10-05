
import { connectAccount } from "lib/program/lottery-commands";

const HOST = "http://localhost:8080"

export const convertLamport = async (lamports) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST}/api/rate-converter?lamports=${lamports}`, requestOptions);
    const data = await response.json();
    return { usdt: data["usdt"], sol: data["sol"] };
}

export const priceTicket = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST}/api/price-per-ticket`, requestOptions);
    const data = await response.json();
    return { lamports: data["lamports"], usdt: data["usdt"], sol: data["sol"] };
}

export const insertBulkTicket = async (programId, playerPubkey, tickets) => {
    //post add ticket
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            programId: programId, 
            tickets: tickets,
            playerPubkey: playerPubkey
        })
        
    };
    const response = await fetch(`${HOST}/api/insert-bulk`, requestOptions);
    return response;
}

export const getGameBoardInfo = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST}/api/game-info`, requestOptions);
    const data = await response.json();
    return data;
}

export const connectPlayerAccount = async () => {
    const playerPrivateKey = "235,125,243,193,96,192,125,224,193,232,217,231,94,199,33,213,131,223,8,36,190,147,5,132,184,8,16,60,217,44,131,85,201,142,139,249,109,4,142,110,243,21,53,102,254,53,77,99,152,252,214,56,120,34,139,111,199,230,205,236,156,109,177,161"
    const {
        publicKey,
        balance
    } = await connectAccount(playerPrivateKey)

    const balanceConvert = await convertLamport(balance);
    const ticketPrice = await priceTicket()
    return {
        privateKey: playerPrivateKey, publicKey: publicKey,
        balanceUSDT: balanceConvert['usdt'],
        balanceSOL: balanceConvert['sol'], 
        lamportUnit: ticketPrice['lamports']
    };
}