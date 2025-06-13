import { Telemetry } from "./telemetry-model";

export function getRpmColor(telemetry: Telemetry): { r: number, g: number, b: number } {
    // Calculate RPM percentage
    const maxRPM = telemetry.values.PlayerCarSLBlinkRPM;
    const currentRPM = telemetry.values.RPM;
    const rpmPercentage = (currentRPM / maxRPM) * 100;
    
    if (rpmPercentage >= 99) {
        return { r: 0, g: 0, b: 255 }; // Blue
    }
    if (rpmPercentage >= 93) {
        return { r: 255, g: 165, b: 0 }; // Orange
    } 
    if (rpmPercentage >= 88) {
        return { r: 255, g: 255, b: 0 }; // Yellow
    }
    if (rpmPercentage >= 70) {
        return { r: 0, g: 255, b: 0 }; // Green
    }
    
    return { r: 0, g: 0, b: 0 }; // Default to black
}