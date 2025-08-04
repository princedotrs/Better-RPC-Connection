import { clusterApiUrl, Commitment, Connection } from "@solana/web3.js";

export class RpcConnection {
    static _connection: Connection;
    static _commitment: Commitment = "confirmed";

    private constructor() {};

    public static getConnection(): Connection {
        if(this._connection === undefined) {
            this._connection = new Connection(clusterApiUrl("mainnet-beta"), this._commitment);
            return this._connection;
        }
        return this._connection;
    }
}