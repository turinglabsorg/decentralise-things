import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { quotes, getRandomQuote } from './quotes.js'

export default function App() {
  const [account, setAccount] = useState(null)
  const [quote, setQuote] = useState('')
  const [signature, setSignature] = useState('')
  const [isSigning, setIsSigning] = useState(false)
  const [signer, setSigner] = useState(null)

  const connect = useCallback(async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const newSigner = await provider.getSigner()
      setSigner(newSigner)

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [],
      })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        setQuote(getRandomQuote())
        console.log('Found account: ' + accounts[0])
      }
    } catch (e) {
      console.error(e.message)
      alert('Failed to connect wallet!')
    }
  }, [])

  const sign = useCallback(async () => {
    if (isSigning || !signer) return
    setIsSigning(true)
    try {
      setSignature('SIGNING...')
      const sig = await signer.signMessage(quote)
      setSignature(sig)
      console.log('Signature is:', sig)

      const verified = ethers.verifyMessage(quote, sig)
      console.log('Verified account is:', verified)

      setQuote(getRandomQuote())
    } catch (e) {
      console.error(e.message)
      alert("Can't sign message!")
    } finally {
      setIsSigning(false)
    }
  }, [isSigning, signer, quote])

  const signTyped = useCallback(async () => {
    if (isSigning || !signer) return
    setIsSigning(true)
    try {
      setSignature('SIGNING...')

      const domain = {
        name: 'Decentralise this!',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      }

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
      }

      const r = Math.floor(Math.random() * quotes.length)
      const receiver = quotes[r]
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

      const sig = await signer.signTypedData(domain, types, value)
      const verified = ethers.verifyTypedData(domain, types, value, sig)
      console.log('Verified account is:', verified)

      setSignature(sig)
      console.log('Signature is:', sig)

      setQuote(getRandomQuote())
    } catch (e) {
      console.error(e.message)
      alert("Can't sign message!")
    } finally {
      setIsSigning(false)
    }
  }, [isSigning, signer, quote])

  return (
    <>
      <h1>DECENTRALISE<br />THINGS</h1>
      <div className="content-box">
        <div className="address">
          {account || 'WALLET NOT CONNECTED'}
        </div>

        {quote && <div className="quote">{quote}</div>}

        <div className="buttons">
          {!account ? (
            <button onClick={connect}>CONNECT WALLET</button>
          ) : (
            <>
              <button onClick={sign} disabled={isSigning}>
                SIGN PLAIN MESSAGE
              </button>
              <button onClick={signTyped} disabled={isSigning}>
                SIGN TYPED MESSAGE
              </button>
            </>
          )}
        </div>

        {signature && <div className="signature">{signature}</div>}
      </div>
    </>
  )
}
