import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import { RequestAirdrop } from "./RequestAirdrop";
import { Balance } from "./Balance";

function App() {
  return (
    <>
      {" "}
      <div className="flex justify-center items-center h-screen w-screen bg-gray-300">
        <ConnectionProvider endpoint={"https://api.devnet.solana.com/"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div>
                <div className="p-2 flex gap-2">
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                <div>
                  <Balance />
                </div>
                <div>
                  <RequestAirdrop />
                </div> <br />
                <div className="p-3 bg-gray-100 rounded-md border border-gray-300 shadow-sm text-sm text-gray-700">
                  <p className="mb-1 font-medium">
                    ⚠️ Heads up: You can claim{" "}
                    <span className="text-purple-600 font-semibold">
                      one airdrop every 24 hours
                    </span>
                    .
                  </p>
                  <p>
                    🔄 Switch to{" "}
                    <span className="text-blue-600 font-semibold">
                      Devnet mode
                    </span>{" "}
                    to check your airdrop balance.
                  </p>
                </div>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </>
  );
}

export default App;
