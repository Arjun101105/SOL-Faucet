import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(1);

    async function requestAirdrop() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        setLoading(true);
        try {
            const signature = await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            
            // Wait for confirmation
            await connection.confirmTransaction(signature);
            
            alert(`Successfully airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed. You might have reached the rate limit (1 SOL per 24 hours).");
        } finally {
            setLoading(false);
        }
    }

    if (!wallet.publicKey) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">👝 Connect your wallet to request airdrop</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                    Amount (SOL)
                </label>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="0.1"
                    max="2"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={loading}
                />
                <p className="text-xs text-gray-500">
                    ⚠️ Maximum 2 SOL per request, 1 SOL per 24 hours
                </p>
            </div>
            
            <button 
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                onClick={requestAirdrop}
                disabled={loading || !wallet.publicKey}
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Requesting Airdrop...
                    </>
                ) : (
                    <>
                        🚀 Request {amount} SOL Airdrop
                    </>
                )}
            </button>
        </div>
    );
}