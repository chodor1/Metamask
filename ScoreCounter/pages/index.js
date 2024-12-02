import { useState, useEffect } from "react";
import { ethers } from "ethers";
import basketballScoreCounterAbi from "../artifacts/contracts/Assessment.sol/BasketballScoreCounter.json"; // Assuming ABI name is updated

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [basketballScoreCounterContract, setBasketballScoreCounterContract] = useState(undefined);
  const [score, setScore] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
  const basketballScoreCounterABI = basketballScoreCounterAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getBasketballScoreCounterContract();
  };

  const getBasketballScoreCounterContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, basketballScoreCounterABI, signer);

    setBasketballScoreCounterContract(contract);
  };

  const getScoreValue = async () => {
    if (basketballScoreCounterContract) {
      const value = await basketballScoreCounterContract.getScore();
      setScore(value.toNumber());
    }
  };

  const addPoint = async () => {
    if (basketballScoreCounterContract) {
      const tx = await basketballScoreCounterContract.addPoint();
      await tx.wait();
      getScoreValue();
    }
  };

  const removePoint = async () => {
    if (basketballScoreCounterContract) {
      const tx = await basketballScoreCounterContract.removePoint();
      await tx.wait();
      getScoreValue();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this app.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect Wallet</button>;
    }

    if (score === undefined) {
      getScoreValue();
    }

    return (
      <div className="content">
        <p>Your Account: {account}</p>
        <p>Score: {score}</p>
        <div className="buttons">
          <button onClick={addPoint}>Add Point</button>
          <button onClick={removePoint}>Remove Point</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Basketball Score Counter</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #f8f8f8;
          font-family: 'Arial', sans-serif;
          padding: 30px 20px;
        }
        header h1 {
          font-size: 36px;
          color: #f53b3a; /* Basketball team color */
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .content p {
          font-size: 24px;
          margin: 10px 0;
          color: #333;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        .buttons button {
          background-color: #f53b3a;
          color: white;
          font-size: 20px;
          padding: 15px 40px;
          border: none;
          cursor: pointer;
          border-radius: 10px;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .buttons button:hover {
          background-color: #e60000;
          transform: scale(1.1);
        }
        .buttons button:active {
          transform: scale(1);
        }
      `}</style>
    </main>
  );
}
