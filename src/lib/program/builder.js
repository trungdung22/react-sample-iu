import { BN } from 'bn.js'; 


const Command = {
  InitGame: 0, // Initialize a dashboard account
  BuyTicket: 1,
  MakeReveal: 2,
  PoolAllocate: 4,
  ClaimReward: 5,
};

export function buyTicket(ticketNumbers) {
  const data = Buffer.from(Uint8Array.of(Command.BuyTicket,
    ...new BN(ticketNumbers[0]).toArray("le", 1),
    ...new BN(ticketNumbers[1]).toArray("le", 1),
    ...new BN(ticketNumbers[2]).toArray("le", 1),
    ...new BN(ticketNumbers[3]).toArray("le", 1),
    ...new BN(ticketNumbers[4]).toArray("le", 1),
    ...new BN(ticketNumbers[5]).toArray("le", 1),
  ))
  return data;
}