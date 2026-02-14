import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import quotes, { getRandomQuote } from './quotes';

export default function useEthereum() {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signature, setSignature] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const connect = useCallback(async () => {
    setError('');
    if (!window.ethereum) {
      setError('MetaMask not detected. Please install MetaMask.');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const s = await provider.getSigner();
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [],
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setSigner(s);
        setQuote(getRandomQuote());
        console.log('Ethereum account connected:', accounts[0]);
      }
    } catch (e) {
      setError('Failed to connect Ethereum wallet.');
      console.error(e);
    }
  }, []);

  const signPlain = useCallback(async () => {
    if (isSigning || !signer || !quote) return;
    setIsSigning(true);
    setError('');
    try {
      setSignature('SIGNING...');
      const sig = await signer.signMessage(quote);
      setSignature(sig);
      console.log('Signature:', sig);
      const verified = ethers.verifyMessage(quote, sig);
      console.log('Verified account:', verified);
      setQuote(getRandomQuote());
    } catch (e) {
      setError('Failed to sign message.');
      setSignature('');
      console.error(e);
    }
    setIsSigning(false);
  }, [isSigning, signer, quote]);

  const signTyped = useCallback(async () => {
    if (isSigning || !signer || !quote) return;
    setIsSigning(true);
    setError('');
    try {
      setSignature('SIGNING...');
      const domain = {
        name: 'Decentralise this!',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      };
      const types = {
        Quote: [
          { name: 'from', type: 'Character' },
          { name: 'to', type: 'Character' },
          { name: 'contents', type: 'string' },
        ],
        Character: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
      };
      const r = Math.floor(Math.random() * quotes.length);
      const receiver = quotes[r];
      const value = {
        from: {
          name: quote.split(' - ')[1],
          wallet: ethers.Wallet.createRandom().address,
        },
        to: {
          name: receiver.split(' - ')[1],
          wallet: ethers.Wallet.createRandom().address,
        },
        contents: quote.split(' - ')[0],
      };
      const sig = await signer.signTypedData(domain, types, value);
      const verified = ethers.verifyTypedData(domain, types, value, sig);
      console.log('Verified account:', verified);
      setSignature(sig);
      console.log('Signature:', sig);
      setQuote(getRandomQuote());
    } catch (e) {
      setError('Failed to sign typed message.');
      setSignature('');
      console.error(e);
    }
    setIsSigning(false);
  }, [isSigning, signer, quote]);

  const disconnect = useCallback(() => {
    setAccount(null);
    setSigner(null);
    setSignature('');
    setQuote('');
    setError('');
  }, []);

  return { account, quote, signature, error, isSigning, connect, signPlain, signTyped, disconnect };
}
