
import { connectAccount } from "lib/program/lottery-commands";
import { isConnect, HOST_NAME } from 'data/constants';

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
    const response = await fetch(`${HOST_NAME}/api/ticket/insert-bulk`, requestOptions);
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

export const fetchPlayerAccount = async (publicKey) => {
    const balance = await getBalance(publicKey)

    const balanceConvert = await convertLamport(balance);
    const ticketPrice = await priceTicket()
    return {
        balanceUSDT: balanceConvert['usdt'],
        balanceSOL: balanceConvert['sol'], 
        lamportUnit: ticketPrice['lamports']
    };
}