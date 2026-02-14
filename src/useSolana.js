import { useState, useCallback } from 'react';
import { getRandomQuote } from './quotes';

export default function useSolana() {
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const getProvider = () => {
    if (window.solana && window.solana.isPhantom) {
      return window.solana;
    }
    if (window.phantom && window.phantom.solana) {
      return window.phantom.solana;
    }
    return null;
  };

  const connect = useCallback(async () => {
    setError('');
    const provider = getProvider();
    if (!provider) {
      setError('Phantom wallet not detected. Please install Phantom.');
      return;
    }
    try {
      const resp = await provider.connect();
      const pubkey = resp.publicKey.toString();
      setAccount(pubkey);
      setQuote(getRandomQuote());
      console.log('Solana account connected:', pubkey);
    } catch (e) {
      setError('Failed to connect Solana wallet.');
      console.error(e);
    }
  }, []);

  const signPlain = useCallback(async () => {
    if (isSigning || !account || !quote) return;
    setIsSigning(true);
    setError('');
    const provider = getProvider();
    if (!provider) {
      setError('Phantom wallet not available.');
      setIsSigning(false);
      return;
    }
    try {
      setSignature('SIGNING...');
      const encodedMessage = new TextEncoder().encode(quote);
      const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
      const sigBytes = signedMessage.signature;
      const sigHex = Array.from(sigBytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setSignature('0x' + sigHex);
      console.log('Solana signature:', '0x' + sigHex);
      setQuote(getRandomQuote());
    } catch (e) {
      setError('Failed to sign message.');
      setSignature('');
      console.error(e);
    }
    setIsSigning(false);
  }, [isSigning, account, quote]);

  const disconnect = useCallback(async () => {
    const provider = getProvider();
    if (provider) {
      try {
        await provider.disconnect();
      } catch (e) {
        // ignore
      }
    }
    setAccount(null);
    setSignature('');
    setQuote('');
    setError('');
  }, []);

  return { account, quote, signature, error, isSigning, connect, signPlain, disconnect };
}
