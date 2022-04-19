import _ from 'lodash';
import Web3 from "web3";
// Used for demo
let web3
let account
let balance
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
    web3 = await new Web3(window.ethereum);
    // Checking if networkId matches
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });
    console.log(accounts)
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

async function sign() {
    if (!isSigning) {
        isSigning = true
        try {
            document.getElementById('eth-signature').innerText = "SIGNING, PLEASE WAIT..."
            const words = "I WANT TO BE A NERD!"
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