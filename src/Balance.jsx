import { WalletAccountError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useState } from "react";


export function Balance(){
    const [balanceSol, setBalanceSol] = useState(null);

    const { connection } = useConnection();
    
    const wallet = useWallet();

    async function getBalance() {
        if(wallet.publicKey){
            const balance = await connection.getBalance(wallet.publicKey);
            setBalanceSol(balance / LAMPORTS_PER_SOL);
        }
    }
getBalance();

    return <div className="flex gap-2 p-2">
        <h1 className="text-blue-800 font-bold">SOL Balance: </h1>
        <h1 className="text-green-800 font-bold">{balanceSol}</h1>
    </div>
}