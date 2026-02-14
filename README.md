# Decentralise Things

> "Friends don't lie." - Eleven
>
> But your centralized auth server might. So we built this.

## WTF is this?

A simple, ready-to-use Ethereum login with signature verification — powered by MetaMask, React, and an unhealthy obsession with Stranger Things.

Connect your wallet. Get a random Stranger Things quote. Sign it. Verify it. Feel like a cryptographic Demogorgon slayer.

That's it. That's the app.

## Why?

Because logging in with a password is the Upside Down of authentication. We live in 2026. Let your wallet do the talking.

## Features

- **Connect Wallet** — One click. No email. No password. No "forgot password" flow that sends you to the Shadow Realm.
- **Sign Messages** — Get a random Stranger Things quote and sign it with your wallet. Because why sign boring things?
- **EIP-712 Typed Signing** — For the nerds who want structured data. Stranger Things characters sending quotes to each other, on-chain style.
- **Signature Verification** — Proves you are who you say you are. Unlike Vecna, who is definitely catfishing.

## Quick Start

```bash
# Install dependencies (it's not the Upside Down, just node_modules)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## How It Works

1. User clicks "Connect"
2. MetaMask pops up like Eleven crawling out of a sensory deprivation tank
3. A random Stranger Things quote appears
4. User signs the quote (regular or EIP-712 typed data)
5. Signature is verified client-side
6. Repeat until you've collected them all like Dungeons & Dragons dice

## Tech Stack

- **React** — Because components are the new Demogorgons
- **Vite** — Faster than Eleven escaping Hawkins Lab
- **ethers.js** — The Hawkins Lab of Ethereum libraries

## Project Structure

```
src/
  main.jsx       # Entry point
  App.jsx        # Main App component
  useWallet.js   # Custom hook for wallet connection & signing
  quotes.js      # Stranger Things quotes collection
  index.css      # Global styles with Stranger Things theming
```

## Contributing

PRs welcome. Just remember:

> "It's called code shut-your-mouth." - Erica Sinclair

## License

MIT — Free as in "free to roam Hawkins unsupervised on a bicycle at night."
