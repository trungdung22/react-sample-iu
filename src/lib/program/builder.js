import { BN } from 'bn.js';


const Command = {
  InitGame: 0, // Initialize a dashboard account
  BuyTicket: 1,
  MakeReveal: 2,
  PoolAllocate: 3,
  ClaimReward: 4,
  CloseGame: 5,
  UpdateTicketPrice: 6,
  CreateMilliPad: 7,
  UpdateMiliPad: 8,
  SaleMilliPad: 9,
  BuyNFTTIcket: 12
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

export function buyMilliPad(lamports) {
  const data_amount = new BN(lamports).toArray("le", 8);
  const data = Buffer.from(Uint8Array.of(Command.SaleMilliPad,
    ...data_amount
  ))
  return data;
}

export function buyNFTTicket(price) {
  const data = Buffer.from(Uint8Array.of(Command.BuyNFTTIcket,
    ...new BN(price).toArray("le", 8))
  )
  return data;
}