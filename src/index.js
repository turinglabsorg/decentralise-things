import _ from 'lodash';
import Web3 from "web3";
import Web3Modal, { isMobile } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// Used for demo
const randomWords = require('random-words');

let web3
let account
let balance
let signature
let isSigning = false

const networks = {
    ethereum: 1,
    rinkeby: 4,
    mumbai: 80001,
    polygon: 137,
    ganache: 5777
}


const el = document.getElementById('eth-button');
if (el === null) {
    console.warn('eth-button not found, can\'t init minting element.')
} else {
    el.addEventListener("click", connect, false);
}

async function connect() {
    let network = 'ethereum'
    // Checking if different network was chosen
    if (el.getAttribute('network') !== undefined) {
        network = el.getAttribute('network')
    }
    console.log('Connecting using network: ' + network)
    // Checking if infura exists for WalletConnect
    let providerOptions = {}
    if (el.getAttribute('infura') !== undefined) {
        providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: el.getAttribute('infura'),
                },
            },
        }
    }
    // Instantiating Web3Modal
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: providerOptions,
    });
    const provider = await web3Modal.connect();
    web3 = await new Web3(provider);
    // Checking if networkId matches
    const netId = await web3.eth.net.getId();
    if (netId !== networks[network]) {
        console.log('Found different network: ' + netId + ',needed ' + networks[network])
        await switchNetwork(network);
    } else {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            balance = await web3.eth.getBalance(accounts[0]);
            account = accounts[0];
            balance = parseFloat(
                web3.utils.fromWei(balance, "ether")
            ).toFixed(10);
            console.log('Found account: ' + account)
            console.log('Account balance: ' + balance)
            document.getElementById('eth-button').innerText = "SIGN MESSAGE"
            el.addEventListener("click", sign, false);
        }
    }
}

async function sign() {
    if (!isSigning) {
        isSigning = true
        try {
            document.getElementById('eth-signature').innerText = "SIGNING, PLEASE WAIT..."
            const words = randomWords({exactly:5, wordsPerString:2, formatter: (word)=> word.toUpperCase()}).join(' ')
            const signature = await web3.eth.personal.sign(words, account);
            document.getElementById('eth-signature').innerText = signature
            document.getElementById('eth-button').innerText = "SIGN MESSAGE"
            isSigning = false
        } catch (e) {
            isSigning = false
            document.getElementById('eth-button').innerText = "SIGN MESSAGE"
            alert(e.message)
        }
    }
}

async function switchNetwork() {
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: "0x89",
                chainName: "Polygon",
                rpcUrls: ["https://rpc-mainnet.matic.network"],
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
            },
        ],
    });
}