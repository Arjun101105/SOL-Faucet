import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    return <div className="flex gap-1">
        <br/><br/>
        <input id="amount" type="text" placeholder="Amount - 1 SOL" className="border p-2 rounded-lg font-bold" disabled/>
        <button className="border p-2 rounded-lg text-white bg-purple-900 font-bold hover:bg-gray-900" onClick={requestAirdrop}>Get Airdrop🚀</button>
    </div>
}