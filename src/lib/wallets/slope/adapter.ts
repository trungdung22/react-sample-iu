import {
    BaseMessageSignerWalletAdapter,
    WalletAccountError,
    WalletConnectionError,
    WalletDisconnectionError,
    WalletError,
    // WalletName,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletPublicKeyError,
    // WalletReadyState,
    // scopePollingDetectionStrategy,
    WalletSignTransactionError,
} from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';
import bs58 from 'bs58';

interface SlopeWallet {
    connect(): Promise<{
        msg: string;
        data: {
            publicKey?: string;
        };
    }>;
    disconnect(): Promise<{ msg: string }>;
    signTransaction(message: string): Promise<{
        msg: string;
        data: {
            publicKey?: string;
            signature?: string;
        };
    }>;
    signAllTransactions(messages: string[]): Promise<{
        msg: string;
        data: {
            publicKey?: string;
            signatures?: string[];
        };
    }>;
    signMessage(message: Uint8Array): Promise<{ data: { signature: string } }>;
}

interface SlopeWindow extends Window {
    Slope?: {
        new (): SlopeWallet;
    };
}

declare const window: SlopeWindow;

export interface SlopeWalletAdapterConfig {}

// export const SlopeWalletName = 'Slope' as WalletName;

export class SlopeWalletAdapter extends BaseMessageSignerWalletAdapter {
    // name = SlopeWalletName;
    private _connecting: boolean;
    private _wallet: SlopeWallet | null;
    private _publicKey: PublicKey | null;
    // private _readyState: WalletReadyState =
    //     typeof window === 'undefined' || typeof document === 'undefined'
    //         ? WalletReadyState.Unsupported
    //         : WalletReadyState.NotDetected;

    constructor(config: SlopeWalletAdapterConfig = {}) {
        super();
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        // if (this._readyState !== WalletReadyState.Unsupported) {
        //     scopePollingDetectionStrategy(() => {
        //         if (typeof window.Slope === 'function') {
        //             this._readyState = WalletReadyState.Installed;
        //             this.emit('readyStateChange', this._readyState);
        //             return true;
        //         }
        //         return false;
        //     });
        // }
    }

    get connected(): boolean {
        return !!this._wallet?.connect;
    }

    get ready(): boolean {
        return typeof window !== 'undefined' && !!window.solana?.isPhantom;
    }

    get publicKey(): PublicKey | null {
        return this._publicKey;
    }

    get connecting(): boolean {
        return this._connecting;
    }

    // get readyState(): WalletReadyState {
    //     return this._readyState;
    // }

    async connect(): Promise<void> {
        try {
            if (this.connected || this.connecting) return;
            // if (this._readyState !== WalletReadyState.Installed) throw new WalletNotReadyError();

            this._connecting = true;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const wallet = new window!.Slope!();

            let data: { publicKey?: string | undefined };
            try {
                ({ data } = await wallet.connect());
            } catch (error: any) {
                throw new WalletConnectionError(error?.message, error);
            }

            if (!data.publicKey) throw new WalletAccountError();

            let publicKey: PublicKey;
            try {
                publicKey = new PublicKey(data.publicKey);
            } catch (error: any) {
                throw new WalletPublicKeyError(error?.message, error);
            }

            this._wallet = wallet;
            this._publicKey = publicKey;

            this.emit('connect');
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        const wallet = this._wallet;
        if (wallet) {
            this._wallet = null;
            this._publicKey = null;

            try {
                const { msg } = await wallet.disconnect();
                if (msg !== 'ok') throw new WalletDisconnectionError(msg);
            } catch (error: any) {
                if (!(error instanceof WalletError)) {
                    // eslint-disable-next-line no-ex-assign
                    error = new WalletDisconnectionError(error?.message, error);
                }
                this.emit('error', error);
            }
        }

        this.emit('disconnect');
    }

    async signTransaction(transaction: Transaction): Promise<Transaction> {
        try {
            const wallet = this._wallet;
            if (!wallet) throw new WalletNotConnectedError();

            try {
                const message = bs58.encode(transaction.serializeMessage());
                const { msg, data } = await wallet.signTransaction(message);

                if (!data.publicKey || !data.signature) throw new WalletSignTransactionError(msg);

                const publicKey = new PublicKey(data.publicKey);
                const signature = bs58.decode(data.signature);

                transaction.addSignature(publicKey, signature);
                return transaction;
            } catch (error: any) {
                if (error instanceof WalletError) throw error;
                throw new WalletSignTransactionError(error?.message, error);
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        }
    }

    async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
        try {
            const wallet = this._wallet;
            if (!wallet) throw new WalletNotConnectedError();

            try {
                const messages = transactions.map((transaction) => bs58.encode(transaction.serializeMessage()));
                const { msg, data } = await wallet.signAllTransactions(messages);

                const length = transactions.length;
                if (!data.publicKey || data.signatures?.length !== length) throw new WalletSignTransactionError(msg);

                const publicKey = new PublicKey(data.publicKey);

                for (let i = 0; i < length; i++) {
                    transactions[i].addSignature(publicKey, bs58.decode(data.signatures[i]));
                }

                return transactions;
            } catch (error: any) {
                if (error instanceof WalletError) throw error;
                throw new WalletSignTransactionError(error?.message, error);
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        }
    }

    async signMessage(message: Uint8Array): Promise<Uint8Array> {
        try {
            const wallet = this._wallet;
            if (!wallet) throw new WalletNotConnectedError();

            try {
                const response = await wallet.signMessage(message);
                return bs58.decode(response.data.signature);
            } catch (error: any) {
                throw new WalletSignTransactionError(error?.message, error);
            }
        } catch (error: any) {
            this.emit('error', error);
            throw error;
        }
    }
}