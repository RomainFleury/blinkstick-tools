# python-alerter
Small scripts to play with BlinkStick

## Setup for BlinkStick Square with TypeScript

This project uses [blinkstick-node](https://github.com/arvydas/blinkstick-node) to control the [BlinkStick Square](https://www.blinkstick.com/products/blinkstick-square) from Node.js/TypeScript.

### Prerequisites
- **Yarn** (v1.x)
- **Node.js** (preferably v16 LTS for best compatibility with native modules)
- **Apple Silicon (M1/M2/M3) users:**
  - Native modules like `node-hid` may not build on ARM64 Node.js. You may need to:
    - Use Node.js v16 (LTS) with [nvm](https://github.com/nvm-sh/nvm)
    - Or, run your terminal under Rosetta 2 (x86_64 emulation)

### Install dependencies
```sh
# Use Node.js v16 for best compatibility
nvm install 16
nvm use 16

# Install Yarn if not already installed
yarn install
```

### Running the test script
```sh
yarn test
```
This will run a TypeScript script that lights up your BlinkStick Square with a rainbow pattern.

### Troubleshooting
- If you see errors related to `node-hid` or native module builds:
  - Make sure you are using Node.js v16 (not v18, v20, or v22)
  - Try running your terminal under Rosetta 2 (right-click Terminal > Get Info > Open using Rosetta)
  - Ensure you have Xcode Command Line Tools installed: `xcode-select --install`
- For more help, see the [blinkstick-node issues](https://github.com/arvydas/blinkstick-node/issues)
