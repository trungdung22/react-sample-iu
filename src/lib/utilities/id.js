const { PublicKey } = require('@solana/web3.js');


const toPublicKey = (key) => {
  if (typeof key !== 'string') {
    return key;
  }
  let result = new PublicKey(key);
  return result;
};


const pubkeyToString = (key) => {
  return typeof key === 'string' ? key : key?.toBase58() || '';
};


const WRAPPED_SOL_MINT = new PublicKey(
  'So11111111111111111111111111111111111111112',
);

const TRADE_MINT_TOKEN = new PublicKey(
  'AqtsoE5DqGNn5eN5G6vW5kCxT7KbZvJEPMYBP5UEw4pC',
);

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

const BPF_UPGRADE_LOADER_ID = new PublicKey(
  'BPFLoaderUpgradeab1e11111111111111111111111',
);

const MEMO_ID = new PublicKey(
  'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
);

const METADATA_PROGRAM_ID =
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';;

const VAULT_ID =
  'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn';;

const AUCTION_ID =
  'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8';;

const METAPLEX_ID =
  'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98';;

const SYSTEM = new PublicKey('11111111111111111111111111111111');

const AR_SOL_HOLDER_ID = new PublicKey(
  'HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm',
);


const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
    system: SYSTEM,
    metadata: METADATA_PROGRAM_ID,
    memo: MEMO_ID,
    vault: VAULT_ID,
    auction: AUCTION_ID,
    metaplex: METAPLEX_ID,
    metaplex_sol_holder: AR_SOL_HOLDER_ID
  };
};

module.exports = {
  programIds, 
  toPublicKey,
  pubkeyToString,
  TRADE_MINT_TOKEN,
  TOKEN_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  AR_SOL_HOLDER_ID
}