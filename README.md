# Basketball Score Counter DApp

## Overview

This is a decentralized application (DApp) built using **Solidity** for the smart contract and **React** for the frontend. The app allows users to track the score of a basketball game on the Ethereum blockchain. Users can increment or decrement the score through simple button interactions, and the app updates the score in real-time by querying the smart contract.

## Features

- **MetaMask Integration**: Users can connect their MetaMask wallet to interact with the smart contract.
- **Add and Remove Points**: Users can add or remove points from the basketball score with simple button clicks.
- **Real-Time Score Updates**: The score is automatically updated on the frontend whenever points are added or removed, based on data from the Ethereum blockchain.

## Project Structure

- **Smart Contract** (`Assessment.sol`):
  - This contract manages the basketball score with functions to add, remove points, and fetch the current score. It prevents overflow and underflow by using `require` statements.

- **Frontend** (`HomePage.js`):
  - A React application that integrates with the smart contract via **ethers.js**. It allows users to connect their wallet, view the score, and interact with the contract to update the score.

- **Technologies Used**:
  - **Solidity**: For writing the smart contract.
  - **React**: For building the frontend.
  - **ethers.js**: For interacting with the Ethereum blockchain.
  - **MetaMask**: For wallet integration and interacting with the Ethereum network.

---
