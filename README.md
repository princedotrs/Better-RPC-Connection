# Better-RPC-Connection: one shared Solana RPC connection

A tiny TypeScript pattern for Solana apps: create the `@solana/web3.js` `Connection` once and reuse it everywhere, instead of calling `new Connection(...)` in every function.

What you'll find here:

- a singleton `RpcConnection` class with a private constructor
- a single place to set the RPC endpoint and default commitment
- an example that fetches the latest blockhash through the shared connection

## Why share one connection

It's common to see `new Connection(url)` inside every handler or helper. That works, but:

- **Config drifts.** Each call site picks its own endpoint and commitment, and they stop matching.
- **Subscriptions multiply.** Each `Connection` manages its own WebSocket for `onAccountChange`, `onLogs` and similar, so many instances can mean many sockets to your RPC provider.
- **Swapping providers is painful.** Moving to a paid RPC, or adding a fallback, means hunting down every `new Connection`.

With one shared instance, the endpoint and commitment live in one file and every part of the app sees the same configuration.

## How it works

```typescript
export class RpcConnection {
  static _connection: Connection;
  static _commitment: Commitment = "confirmed";

  private constructor() {}

  public static getConnection(): Connection {
    if (this._connection === undefined) {
      this._connection = new Connection(clusterApiUrl("mainnet-beta"), this._commitment);
    }
    return this._connection;
  }
}
```

The first call creates the connection; every later call returns the same object. Change the URL in [`src/RpcConnection.ts`](src/RpcConnection.ts) to point at your own RPC.

Use it anywhere:

```typescript
import { RpcConnection } from "./RpcConnection";

const connection = RpcConnection.getConnection();
const { blockhash } = await connection.getLatestBlockhash();
```

## Run it

Prerequisites: Node.js 18+.

```bash
git clone https://github.com/princedotrs/Better-RPC-Connection.git
cd Better-RPC-Connection
npm install
npm run compile
node dist/index.js
```

It prints the RPC endpoint, the commitment level and the latest blockhash.

## Project layout

```
src/
├── RpcConnection.ts   # the singleton
└── index.ts           # example usage
```

## Ideas to extend it

- Read the endpoint from an environment variable
- Keep a list of endpoints and fail over when one errors or rate-limits
- Add a second shared connection for a different cluster (devnet, mainnet)

## License

MIT
