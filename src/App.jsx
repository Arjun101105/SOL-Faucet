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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-8">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com/"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  🚰 Solana Faucet
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Get free SOL tokens for testing on Devnet
                </p>
              </div>

              {/* Wallet Connection */}
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !font-medium" />
                  <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 !rounded-lg !font-medium" />
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Balance Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    💰 Wallet Balance
                  </h2>
                  <Balance />
                </div>

                {/* Airdrop Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    🪂 Request Airdrop
                  </h2>
                  <RequestAirdrop />
                </div>
              </div>

              {/* Info Card */}
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 md:p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
                    <div className="text-sm md:text-base text-yellow-700 space-y-2">
                      <p>
                        • You can claim <span className="font-semibold text-purple-600">one airdrop every 24 hours</span>
                      </p>
                      <p>
                        • Make sure to switch to <span className="font-semibold text-blue-600">Devnet mode</span> in your wallet
                      </p>
                      <p>
                        • These are test tokens with no real value
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-8 text-gray-500 text-sm">
                <p>Built with ❤️ for Solana developers</p>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
