
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
    const response = await fetch(`${HOST}/api/ticket/insert-bulk`, requestOptions);
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
    const playerPrivateKey = "216,13,81,214,163,57,189,23,162,68,225,126,69,177,228,11,32,225,197,239,244,31,45,197,223,159,69,171,224,163,251,40,17,219,128,52,170,252,166,80,143,176,250,255,57,115,193,182,214,81,97,220,123,48,39,128,254,62,60,186,17,133,76,48"
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