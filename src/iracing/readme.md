# iRacing node sdk

Comes from: https://apihlaja.github.io/node-irsdk/#node-irsdk-api-documentation-irsdk

```javascript
var irsdk = require('node-irsdk')
// look for telemetry updates only once per 100 ms
var iracing = irsdk.init({telemetryUpdateInterval: 100})
```

Sample data:

https://github.com/apihlaja/node-irsdk/tree/master/sample-data

# iRacing SDK JS

We are now using the `iracing-sdk-js` package (version 1.4.0) which provides a more modern and TypeScript-friendly interface to the iRacing SDK.

## Installation

The package is already installed in the project. You can use it by importing it in your TypeScript files:

```typescript
import { IRacingSDK } from 'iracing-sdk-js';
```

## Basic Usage

```typescript
const sdk = new IRacingSDK();

// Connect to iRacing
sdk.connect();

// Listen for telemetry updates
sdk.on('telemetry', (data) => {
  console.log('Telemetry data:', data);
});

// Listen for session updates
sdk.on('session', (data) => {
  console.log('Session data:', data);
});

// Disconnect when done
sdk.disconnect();
```

## Documentation

For more information about the package and its API, visit:
https://github.com/irsdk-node/irsdk-node

## Note

This package is used alongside the original `node-irsdk` package. Both can be used depending on your needs, but `iracing-sdk-js` is recommended for new code as it provides better TypeScript support and a more modern API.



