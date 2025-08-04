import { RpcConnection } from "./RpcConnection";

(async ()=>{
    const connection = RpcConnection.getConnection();
    console.log("Connected to Solana cluster:", connection.rpcEndpoint);
    console.log("Commitment level:", RpcConnection._commitment);

    const recentBlockhash = await connection.getLatestBlockhash();
    console.log("Latest Blockhash:", recentBlockhash.blockhash);

})();