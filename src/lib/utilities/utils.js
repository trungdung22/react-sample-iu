
import { getBalance } from "lib/program/lottery-commands";
import { IS_CONNECT, HOST_NAME } from 'data/constants';

export const convertLamport = async (lamports) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST_NAME}/api/rate-converter?lamports=${lamports}`, requestOptions);
    const data = await response.json();
    return { usdt: data["usdt"], sol: data["sol"]};
}

export const convertUSDT= async (amount) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${HOST_NAME}/api/rate-converter-usdt?amount=${amount}`, requestOptions);
    const data = await response.json();
    return { lamports: data["lamports"]};
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
    if (publicKey === undefined || publicKey === '') {
        return {
            balanceUSDT: 0,
            balanceSOL: 0, 
            lamportUnit: 0,
            publicKey: ''
        };
    }
    const balance = await getBalance(publicKey)

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
          'Content-Type': 'application/json',
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