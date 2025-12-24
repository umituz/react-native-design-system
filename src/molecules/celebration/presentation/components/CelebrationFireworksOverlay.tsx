/**
 * Celebration Fireworks Overlay
 * Renders fireworks effect as an overlay
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Fireworks } from "../../../animation";
import type { FireworksConfig } from "../../../animation";

export interface CelebrationFireworksOverlayProps {
    visible: boolean;
    config: FireworksConfig;
}

export const CelebrationFireworksOverlay: React.FC<CelebrationFireworksOverlayProps> = ({
    visible,
    config,
}) => {
    if (!visible) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Fireworks
                autoTrigger
                triggerX={0.5}
                triggerY={0.5}
                {...config}
                style={StyleSheet.absoluteFill}
            />
        </View>
    );
};
