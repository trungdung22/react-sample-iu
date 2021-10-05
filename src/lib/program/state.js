/**
 * Functions to deserialize Dice Game and Dashboard account data
 *
 * @flow
 */
 const BufferLayout = require('buffer-layout');
 const { PublicKey } = require("@solana/web3.js");
 const BN = require("bn.js");
 /**
  * Layout for a public key
  */
 const publicKey = (property = "publicKey") => {
   return BufferLayout.blob(32, property);
 };
 
 const uint64 = (property = "uint64") => {
   return BufferLayout.blob(8, property);
 };
 
 const GAME_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
   BufferLayout.u8("status"),
   BufferLayout.u8("reward_type"),
   BufferLayout.u8("game_no"),
   uint64("total_pool"),
   uint64("match_pool3"),
   BufferLayout.u8("match_pool3_count"),
   uint64("match_pool4"),
   BufferLayout.u8("match_pool4_count"),
   uint64("match_pool5"),
   BufferLayout.u8("match_pool5_count"),
   uint64("match_pool6"),
   BufferLayout.u8("match_pool6_count"),
   uint64("burn_pool"),
   publicKey("owner_pubkey"),
   uint64("created_time"),
   uint64("closed_time"),
   BufferLayout.u8("num_one"),
   BufferLayout.u8("num_two"),
   BufferLayout.u8("num_three"),
   BufferLayout.u8("num_four"),
   BufferLayout.u8("num_five"),
   BufferLayout.u8("num_six"),
 ]);
 
 const TICKET_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
   BufferLayout.u8("status"),
   BufferLayout.u8("reward_type"),
   publicKey("player_pubkey"),
   publicKey("game_pubkey"),
   BufferLayout.u8("num_one"),
   BufferLayout.u8("num_two"),
   BufferLayout.u8("num_three"),
   BufferLayout.u8("num_four"),
   BufferLayout.u8("num_five"),
   BufferLayout.u8("num_six")
 ]);
 
 
 function deserializeGame(accountInfo) {
   if (accountInfo.data.length === 0){
     return {};
   }
   const game = GAME_ACCOUNT_DATA_LAYOUT.decode(accountInfo.data);
 
   const gameStates = [
     'Uninitialized',
     'Active',
     'Reveal',
     'Completed',
     'Terminated',
   ];
 
   const gameRewards = [
     'Uninitialized',
     'Match3',
     'Match4',
     'Match5',
     'Match6',
     'NoMatch'
   ];
 
   return {
     status: gameStates[game.status],
     reward_type: gameRewards[game.reward_type],
     game_no: new BN(game.game_no, 1, "le").toNumber(),
     total_pool: new BN(game.PublicKey, 8, "le").toNumber(),
     owner_pubkey: new PublicKey(game.owner_pubkey).toBase58(),
     created_time: new BN(game.duration, 8, "le").toNumber(),
     closed_time: new BN(game.duration, 8, "le").toNumber(),
     num_one: new BN(game.num_one, 1, "le").toNumber(),
     num_two: new BN(game.num_two, 1, "le").toNumber(),
     num_three: new BN(game.num_three, 1, "le").toNumber(),
     num_four: new BN(game.num_four, 1, "le").toNumber(),
     num_five: new BN(game.num_five, 1, "le").toNumber(),
     num_six: new BN(game.num_six, 1, "le").toNumber(),
     match_pool3: new BN(game.match_pool3, 8, "le").toNumber(), 
     match_pool4: new BN(game.match_pool4, 8, "le").toNumber(),
     match_pool5: new BN(game.match_pool5, 8, "le").toNumber(),
     match_pool6: new BN(game.match_pool6, 8, "le").toNumber(),
     burn_pool: new BN(game.burn_pool, 8, "le").toNumber(),
     match_pool3_count: new BN(game.match_pool3_count, 1, "le").toNumber(),
     match_pool4_count: new BN(game.match_pool4_count, 1, "le").toNumber(),
     match_pool5_count: new BN(game.match_pool5_count, 1, "le").toNumber(),
     match_pool6_count: new BN(game.match_pool6_count, 1, "le").toNumber(),
   };
 }
 
 
 function deserializeTicket(accountInfo) {
   if (accountInfo.data.length === 0){
     return {};
   }
   const ticket = TICKET_ACCOUNT_DATA_LAYOUT.decode(accountInfo.data);
 
   const ticketStates = [
     'Uninitialized',
     'Active',
     'Completed',
     'Terminated'
   ];
 
   const ticketRewards = [
     'Uninitialized',
     'Match3',
     'Match4',
     'Match5',
     'Match6',
     'NoMatch'
   ];
 
   return {
     status: ticketStates[ticket.status],
     reward_type: ticketRewards[ticket.reward_type],
     player_pubkey: new PublicKey(ticket.player_pubkey).toBase58(),
     game_pubkey: new PublicKey(ticket.game_pubkey).toBase58(),
     num_one: new BN(ticket.num_one, 1, "le").toNumber(),
     num_two: new BN(ticket.num_two, 1, "le").toNumber(),
     num_three: new BN(ticket.num_three, 1, "le").toNumber(),
     num_four: new BN(ticket.num_four, 1, "le").toNumber(),
     num_five: new BN(ticket.num_five, 1, "le").toNumber(),
     num_six: new BN(ticket.num_six, 1, "le").toNumber()
   };
 }
 
 module.exports = {
   GAME_ACCOUNT_DATA_LAYOUT, 
   TICKET_ACCOUNT_DATA_LAYOUT,
   deserializeGame,
   deserializeTicket
 }