import _ from 'lodash';
import { ethers, utils } from "ethers";

let web3
let account
let signer = null;
let provider;
let isSigning = false
let quote

const quotes = [
    "“Mornings are for coffee and contemplation.” - Chief Hopper",
    "“She's our friend and she's crazy.” - Dustin",
    "“You shouldn't like things because people tell you you're supposed to.” - Jonathan Byers",
    "“Friends don't lie.” - Eleven",
    "“If anyone asks where I am, I've left the country.” - Mike",
    "“Sometimes, your total obliviousness just blows my mind.” - Dustin",
    "“I'm stealthy, like a ninja.” - Steve Harrington",
    "“Why are you keeping this curiosity door locked?” - Dustin",
    "“This is not yours to fix alone. You act like you're all alone out there in the world, but you're not. You're not alone.” - Joyce",
    "“I am on a curiosity voyage, and I need my paddles to travel. These books…these books are my paddles.” - Dustin",
    "“Bitchin'.” - Eleven",
    "“Do you wanna be normal? Do you wanna be just like everyone else? Being a freak is the best. I'm a freak!” - Jonathan",
    "“Son of a bitch. You know, you're really no help at all, you know that?” - Dustin",
    "“You're gonna slay 'em dead.” - Steve",
    "“I asked if you wanted to be my friend. And you said yes. You said yes. It was the best thing I've ever done.” - Mike",
    "“She will not be able to resist these pearls.” *Purrs* - Dustin",
    "“If we're both going crazy, then we'll go crazy together, right?” - Mike",
    "“It's called code shut-your-mouth.” - Erica Sinclair",
    "“Nobody normal ever accomplished anything meaningful in this world.” - Jonathan",
    "“You tell anyone I just told you that and your ass is grass.” - Steve",
    "“You can't spell America without Erica.” - Erica",
    "“There's more to life than stupid boys, you know.” - Max Mayfield"
]

const connectEl = document.getElementById('connect-button');
connectEl.addEventListener("click", connect, false);
const signEl = document.getElementById('sign-button');
signEl.addEventListener("click", sign, false);
const signTypedEl = document.getElementById('sign-typed-button');
signTypedEl.addEventListener("click", signTyped, false);

async function connect() {
    // Create new Web3 instance
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
    // Ask accounts
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
    });
    if (accounts.length > 0) {
        // Pick first account
        account = accounts[0];
        document.getElementById('eth-address').innerText = account
        console.log('Found account: ' + account)
        // Pick random quote
        const random = Math.floor(Math.random() * quotes.length);
        quote = quotes[random]
        document.getElementById('stranger-things-quote').innerText = quote
        connectEl.style.display = 'none'
        signEl.style.display = 'inline-block'
        signTypedEl.style.display = 'inline-block'
    }
}

async function sign() {
    if (!isSigning) {
        isSigning = true
        try {
            document.getElementById('eth-signature').innerText = "SIGNING..."
            // Ask signature to wallet
            const signature = await signer.signMessage(quote)
            document.getElementById('eth-signature').innerText = signature
            console.log("Signature is:", signature)
            const verified = await ethers.verifyMessage(quote, signature);
            console.log("Verified account is:", verified)
            // Pick new random quote
            const random = Math.floor(Math.random() * quotes.length);
            quote = quotes[random]
            document.getElementById('stranger-things-quote').innerText = quote
            isSigning = false
        } catch (e) {
            isSigning = false
            console.log(e.message)
            alert("Can't sign message!")
        }
    }
}

async function signTyped() {
    if (!isSigning) {
        isSigning = true
        try {
            document.getElementById('eth-signature').innerText = "SIGNING..."
            const domain = {
                name: 'Ether Mail',
                version: '1',
                chainId: 1,
                verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
            };

            // The named list of all type definitions
            const types = {
                Person: [
                    { name: 'name', type: 'string' },
                    { name: 'wallet', type: 'address' }
                ],
                Mail: [
                    { name: 'from', type: 'Person' },
                    { name: 'to', type: 'Person' },
                    { name: 'contents', type: 'string' }
                ]
            };

            // The data to sign
            const value = {
                from: {
                    name: 'You',
                    wallet: account
                },
                to: {
                    name: 'Bob',
                    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
                },
                contents: 'Hello, Bob!'
            };

            const signature = await signer.signTypedData(domain, types, value)
            const verified = ethers.verifyTypedData(domain, types, value, signature);
            console.log("Verified account is:", verified)
            document.getElementById('eth-signature').innerText = signature
            console.log("Signature is:", signature)
            // Pick new random quote
            const random = Math.floor(Math.random() * quotes.length);
            quote = quotes[random]
            document.getElementById('stranger-things-quote').innerText = quote
            isSigning = false
        } catch (e) {
            isSigning = false
            console.log(e.message)
            alert("Can't sign message!")
        }
    }
}