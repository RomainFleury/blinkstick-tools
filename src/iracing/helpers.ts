import { Telemetry } from "./telemetry-model";

export function getRpmColor(telemetry: Telemetry) {
    // Calculate RPM percentage
    const maxRPM = telemetry.values.PlayerCarSLBlinkRPM;
    const currentRPM = telemetry.values.RPM;
    const rpmPercentage = (currentRPM / maxRPM) * 100;
    
    // Get color based on RPM percentage
    let rpmColor = 'black'; // Default color (reset)
    if (rpmPercentage >= 99) {
        rpmColor = 'blue'; // Blue
    } else if (rpmPercentage >= 93) {
        rpmColor = 'orange'; // Orange
    } else if (rpmPercentage >= 88) {
        rpmColor = 'yellow'; // Yellow
    }
    return rpmColor;
}