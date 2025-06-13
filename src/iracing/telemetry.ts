// Telemetry / values
// "ShiftIndicatorPct": 0,
// "ShiftPowerPct": 0,
// "ShiftGrindRPM": 0,
// "Brake": 1,
// "Clutch": 0,
// "Gear": 0,
// "RPM": 300,

import { getDevice, setColorForAllLeds } from "../helpers";
import { getRpmColor } from "./helpers";
import { Telemetry } from "./telemetry-model";

// Parse command line arguments
const args = process.argv.slice(2);
const intervalArg = args.find(arg => arg.startsWith('--interval='));
const interval = intervalArg ? parseInt(intervalArg.split('=')[1]) : 1000; // Default to 1000ms if not specified

console.log(`Using telemetry interval: ${interval}ms`);

// start telemetry and log values

let blinkStick: any;

getDevice().then(device => {
    blinkStick = device;
    setColorForAllLeds(blinkStick, {r: 0, g: 0, b: 0});
});

// @ts-ignore
const irsdk = require('iracing-sdk-js')
// const iracing = irsdk.getInstance()
// Create SDK instance
// @ts-ignore
const sdk = irsdk.init({telemetryUpdateInterval: 100})

// Connect to iRacing
sdk.on('Telemetry', function (telemetry: Telemetry) {
    // console.log(telemetry)
    const rpmColor = getRpmColor(telemetry);
    console.log('\n=== iRacing Telemetry Data ===');
    console.log('Time:', new Date().toLocaleTimeString());
    
    const maxRPM = telemetry.values.PlayerCarSLBlinkRPM;
    const currentRPM = telemetry.values.RPM;
    const rpmPercentage = (currentRPM / maxRPM) * 100;
    
    // Speed and Position
    console.log('\nSpeed and Position:');
    console.log('Speed:', Math.round(telemetry.values.Speed * 3.6), 'km/h'); // Convert m/s to km/h
    console.log('RPM:', `${rpmColor}${Math.round(telemetry.values.RPM)} (${rpmPercentage.toFixed(1)}%)\x1b[0m`);
    console.log('Gear:', telemetry.values.Gear);

    if(blinkStick) {
        if(rpmColor === 'blue') {   
            setColorForAllLeds(blinkStick, {r: 0, g: 0, b: 255});
        } else if(rpmColor === 'orange') {
            setColorForAllLeds(blinkStick, {r: 255, g: 165, b: 0});
        } else if(rpmColor === 'yellow') {
            setColorForAllLeds(blinkStick, {r: 255, g: 255, b: 0});
        }
    }
})

// // Set up interval for logging
// const logInterval = setInterval(async () => {
//     const device = await getDevice();
//     if(!device) {
//         throw new Error('No device found')
//     }
//     console.log(device.deviceDescription) 
// //   if (sdk.isConnected()) {
//     const telemetry = sdk.telemetry;
//     if(!telemetry) {
//         console.log('No telemetry data')
//         return;
//     }
//     // const session = sdk.getSession();

//     console.log('\n=== iRacing Telemetry Data ===');
//     console.log('Time:', new Date().toLocaleTimeString());
    
//     // Car and Track Info
//     console.log('\nCar and Track:');
//     console.log('Car:', telemetry.CarPath);
//     console.log('Track:', telemetry.TrackName);
//     console.log('Track Temperature:', telemetry.TrackTemp, '°C');
//     console.log('Air Temperature:', telemetry.AirTemp, '°C');
    
//     // Speed and Position
//     console.log('\nSpeed and Position:');
//     console.log('Speed:', Math.round(telemetry.Speed * 3.6), 'km/h'); // Convert m/s to km/h
//     console.log('RPM:', Math.round(telemetry.RPM));
//     console.log('Gear:', telemetry.Gear);


//     // console.log('Lap:', telemetry.Lap);
//     // console.log('Lap Time:', telemetry.LapTime.toFixed(2), 's');
//     // console.log('Last Lap Time:', telemetry.LastLapTime.toFixed(2), 's');
    
//     // // Race Info
//     // console.log('\nRace Info:');
//     // console.log('Position:', telemetry.Position);
//     // console.log('Class Position:', telemetry.ClassPosition);
//     // console.log('Fuel Level:', telemetry.FuelLevel.toFixed(2), 'L');
//     // console.log('Fuel Use Per Hour:', telemetry.FuelUsePerHour.toFixed(2), 'L/h');
    
//     // // Session Info
//     // console.log('\nSession Info:');
//     // console.log('Session Type:', session.SessionType);
//     // console.log('Session Time:', session.SessionTime.toFixed(2), 's');
//     // console.log('Session State:', session.SessionState);
//     console.log('================================\n');
// //   } else {
// //     console.log('Waiting for iRacing connection...');
// //   }
// }, interval);

// Handle process termination
process.on('SIGINT', async () => {
    console.log('\nDisconnecting from iRacing...');
    // clearInterval(logInterval);
//   sdk.disconnect();
    const device = await getDevice();
    if(device) {
        setColorForAllLeds(device, {r: 0, g: 0, b: 0});
    }
    process.exit();
});

console.log('iRacing telemetry logger started. Press Ctrl+C to exit.');
console.log('Usage: yarn iracing [--interval=<milliseconds>]');








