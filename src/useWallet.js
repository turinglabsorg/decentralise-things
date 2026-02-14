import { useState, useCallback, useRef } from 'react'
import { ethers } from 'ethers'
import { getRandomQuote } from './quotes'

const EIP712_DOMAIN = {
  name: 'Decentralise this!',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
}

const EIP712_TYPES = {
  Quote: [
    { name: 'from', type: 'Character' },
    { name: 'to', type: 'Character' },
    { name: 'contents', type: 'string' },
  ],
  Character: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
}

export default function useWallet() {
  const [account, setAccount] = useState(null)
  const [quote, setQuote] = useState('')
  const [signature, setSignature] = useState('')
  const [isSigning, setIsSigning] = useState(false)
  const signerRef = useRef(null)

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!')
      return
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    signerRef.current = await provider.getSigner()
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    })
    if (accounts.length > 0) {
      setAccount(accounts[0])
      setQuote(getRandomQuote())
      console.log('Found account:', accounts[0])
    }
  }, [])

  const sign = useCallback(async () => {
    if (isSigning || !signerRef.current || !quote) return
    setIsSigning(true)
    try {
      setSignature('SIGNING...')
      const sig = await signerRef.current.signMessage(quote)
      setSignature(sig)
      console.log('Signature is:', sig)
      const verified = ethers.verifyMessage(quote, sig)
      console.log('Verified account is:', verified)
      setQuote(getRandomQuote())
    } catch (e) {
      console.log(e.message)
      alert("Can't sign message!")
      setSignature('')
    } finally {
      setIsSigning(false)
    }
  }, [isSigning, quote])

  const signTyped = useCallback(async () => {
    if (isSigning || !signerRef.current || !quote) return
    setIsSigning(true)
    try {
      setSignature('SIGNING...')
      const receiver = getRandomQuote()
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
      }
      const sig = await signerRef.current.signTypedData(
        EIP712_DOMAIN,
        EIP712_TYPES,
        value,
      )
      const verified = ethers.verifyTypedData(
        EIP712_DOMAIN,
        EIP712_TYPES,
        value,
        sig,
      )
      console.log('Verified account is:', verified)
      setSignature(sig)
      console.log('Signature is:', sig)
      setQuote(getRandomQuote())
    } catch (e) {
      console.log(e.message)
      alert("Can't sign message!")
      setSignature('')
    } finally {
      setIsSigning(false)
    }
  }, [isSigning, quote])

  return { account, quote, signature, isSigning, connect, sign, signTyped }
}
