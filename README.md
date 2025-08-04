# Better RPC Connection for Solana

This project provides an efficient way to manage RPC connections to the Solana blockchain using a singleton pattern. This ensures that a single connection instance is reused throughout the application, improving performance and resource management.

## The Problem with Multiple Connections

When building applications on Solana, developers frequently need to interact with the blockchain via an RPC (Remote Procedure Call) connection. A common but inefficient practice is to create a new `Connection` object every time an interaction is needed.

Creating a new connection for each request can lead to several issues:
- **Performance Overhead**: Establishing a new connection involves a network handshake and resource allocation, which adds latency to each request.
- **Resource Consumption**: Each connection consumes memory and network resources on both the client and the RPC node. Creating numerous connections can strain the RPC provider's infrastructure, potentially leading to rate-limiting or degraded performance.
- **Inconsistent State**: If different parts of an application use different connection objects, they might have slightly different configurations or be connected to different RPC nodes (in a load-balanced setup), leading to inconsistent views of the blockchain state.

## The Singleton Solution

This repository implements a `RpcConnection` class that follows the singleton design pattern. A singleton ensures that only one instance of a class is ever created.

The `RpcConnection.getConnection()` method checks if a `Connection` object already exists.
- If it does, it returns the existing instance.
- If it doesn't, it creates a new one, stores it for future use, and then returns it.

## Benefits of this Approach

Using a singleton for your Solana RPC connection provides several benefits:

- **Improved Performance**: By reusing a single connection, you avoid the overhead of creating new connections for each request, resulting in faster interactions with the blockchain.
- **Efficient Resource Management**: It reduces the memory and network footprint of your application, leading to better overall performance and stability.
- **Consistency**: All parts of your application will use the same connection instance, ensuring a consistent configuration (e.g., commitment level) and view of the blockchain.
- **Simplified Connection Management**: You no longer need to pass connection objects around your application. You can simply call `RpcConnection.getConnection()` wherever you need it.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/prince981620/Better-RPC-Connection.git
    cd Better-RPC-Connection
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

## Usage

The `RpcConnection` class is straightforward to use. Simply import it and call the static `getConnection()` method to get the connection instance.

```typescript
import { RpcConnection } from "./RpcConnection";

const connection = RpcConnection.getConnection();

// You can now use the connection object to interact with the Solana blockchain
(async () => {
    const version = await connection.getVersion();
    console.log("Connection to cluster is successful:", version);
})();
```

The default commitment level is set to `"confirmed"`.

## Running the Example

This repository includes an example file `src/index.ts` that demonstrates how to use the `RpcConnection` class.

To run the example:

1.  Compile the TypeScript code:
    ```bash
    npm run compile
    ```

2.  Run the compiled JavaScript code:
    ```bash
    node dist/index.js
    ```

You should see output showing that a connection has been established and the latest blockhash has been fetched.
