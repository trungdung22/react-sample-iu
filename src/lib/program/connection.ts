import {
    Cluster,
    clusterApiUrl,
    Commitment,
    Connection
} from "@solana/web3.js";

type Localnet = "localnet";

export const COMMITMENT: Commitment = "singleGossip";

export const CLUSTERS = {
    MAINNET: "mainnet-beta" as Cluster,
    TESTNET: "testnet" as Cluster,
    DEVNET: "devnet" as Cluster,
    LOCALNET: "localnet" as Localnet
};

export const getConnection = (clusterName: Cluster | Localnet) => {
    const connection = new Connection(
        clusterName === CLUSTERS.LOCALNET
            ? "http://localhost:8899"
            : clusterApiUrl(clusterName),
        COMMITMENT
    );
    return connection
};
