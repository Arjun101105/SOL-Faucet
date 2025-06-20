import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useState, useEffect } from "react";

export function Balance(){
    const [balanceSol, setBalanceSol] = useState(null);
    const [loading, setLoading] = useState(false);

    const { connection } = useConnection();
    const wallet = useWallet();

    async function getBalance() {
        if(wallet.publicKey){
            setLoading(true);
            try {
                const balance = await connection.getBalance(wallet.publicKey);
                setBalanceSol(balance / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error("Error fetching balance:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setBalanceSol(null);
        }
    }

    useEffect(() => {
        const fetchBalance = async () => {
            if(wallet.publicKey){
                setLoading(true);
                try {
                    const balance = await connection.getBalance(wallet.publicKey);
                    setBalanceSol(balance / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error("Error fetching balance:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setBalanceSol(null);
            }
        };
        
        fetchBalance();
    }, [wallet.publicKey, connection]);

    if (!wallet.publicKey) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 mb-4">👝 Connect your wallet to view balance</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <span className="text-lg font-medium text-gray-700">Current Balance:</span>
                </div>
                <div className="text-right">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                            <span className="text-gray-500">Loading...</span>
                        </div>
                    ) : (
                        <span className="text-2xl font-bold text-green-600">
                            {balanceSol !== null ? `${balanceSol.toFixed(4)} SOL` : '0.0000 SOL'}
                        </span>
                    )}
                </div>
            </div>
            
            <button 
                onClick={getBalance}
                disabled={loading}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
                🔄 Refresh Balance
            </button>
        </div>
    );
}