# Python Alerter

A TypeScript project that uses BlinkStick LED devices to create visual alerts and animations.

## Features

- Control BlinkStick LED devices
- Create and manage LED animations
- Support for multiple LED patterns and colors
- Unit testing with Jest
- TypeScript support

## Prerequisites

- Node.js (v22.0.0 or higher)
- Yarn package manager
- BlinkStick device (tested with BS019328-3.0)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blinkstick-tools
```

2. Install dependencies:
```bash
yarn install
```

## Usage

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch
```

### Running Animations

```bash
# Run animation test
yarn test-animate

# Run monitor
yarn monitor
```

### iRacing Integration

```bash
# Run iRacing telemetry
yarn iracing
```


## Development

The project uses:
- TypeScript for type safety
- BlinkStick v2 library for LED control

### Testing

The project includes a mock implementation of the BlinkStick device for testing. Tests are located in the `__tests__` directories and can be run using Jest.

### Building

```bash
yarn build
```

## License

MIT
