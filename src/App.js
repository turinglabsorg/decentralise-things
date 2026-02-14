import React, { useState } from 'react';
import useEthereum from './useEthereum';
import useSolana from './useSolana';
import './App.css';

const CHAINS = {
  ETHEREUM: 'ethereum',
  SOLANA: 'solana',
};

export default function App() {
  const [chain, setChain] = useState(CHAINS.ETHEREUM);
  const eth = useEthereum();
  const sol = useSolana();

  const isEth = chain === CHAINS.ETHEREUM;
  const current = isEth ? eth : sol;
  const connected = !!current.account;

  const switchChain = (newChain) => {
    if (newChain !== chain) {
      if (chain === CHAINS.ETHEREUM && eth.account) eth.disconnect();
      if (chain === CHAINS.SOLANA && sol.account) sol.disconnect();
      setChain(newChain);
    }
  };

  return (
    <div className="app">
      <h1>DECENTRALISE<br />THINGS</h1>
      <div className="content-area">
        <div className="chain-selector">
          <button
            className={isEth ? 'active' : ''}
            onClick={() => switchChain(CHAINS.ETHEREUM)}
          >
            ETHEREUM
          </button>
          <button
            className={!isEth ? 'active' : ''}
            onClick={() => switchChain(CHAINS.SOLANA)}
          >
            SOLANA
          </button>
        </div>

        <div className="wallet-address">
          {connected ? current.account : 'WALLET NOT CONNECTED'}
        </div>
        <br />

        {current.quote && (
          <div className="quote-display">{current.quote}</div>
        )}

        <div className="buttons">
          {!connected && (
            <button onClick={current.connect}>CONNECT WALLET</button>
          )}

          {connected && (
            <>
              <button onClick={current.signPlain} disabled={current.isSigning}>
                SIGN PLAIN MESSAGE
              </button>
              {isEth && (
                <button onClick={current.signTyped} disabled={current.isSigning}>
                  SIGN TYPED MESSAGE
                </button>
              )}
            </>
          )}
        </div>
        <br />

        {current.error && (
          <div className="error-message">{current.error}</div>
        )}

        {current.signature && (
          <div className="signature-display">{current.signature}</div>
        )}
      </div>
    </div>
  );
}
