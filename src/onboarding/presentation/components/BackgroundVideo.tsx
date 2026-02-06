import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import type { VideoSource, VideoPlayer } from 'expo-video';

interface BackgroundVideoProps {
    source: VideoSource;
    overlayOpacity?: number;
}

export const BackgroundVideo = ({ source, overlayOpacity = 0.5 }: BackgroundVideoProps) => {
    const player = useVideoPlayer(source, (p: VideoPlayer) => {
        p.loop = true;
        p.play();
        p.muted = true;
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]} />
        </View>
    );
};

