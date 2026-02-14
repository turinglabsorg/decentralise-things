import useWallet from './useWallet'

export default function App() {
  const { account, quote, signature, isSigning, connect, sign, signTyped } =
    useWallet()

  return (
    <>
      <h1 style={{ fontSize: '120px', marginTop: '20px' }}>
        DECENTRALISE
        <br />
        THINGS
      </h1>

      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          paddingTop: '30px',
          paddingBottom: '40px',
        }}
      >
        <div>{account || 'WALLET NOT CONNECTED'}</div>
        <br />

        {quote && (
          <div style={{ marginBottom: '40px', fontSize: '28px' }}>{quote}</div>
        )}

        <div>
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
        <br />

        {signature && (
          <div
            style={{
              fontSize: '22px',
              width: '200px',
              wordBreak: 'break-all',
              display: 'inline-block',
              marginTop: '20px',
            }}
          >
            {signature}
          </div>
        )}
      </div>
    </>
  )
}
