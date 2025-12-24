import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownHeader } from './CountdownHeader';
import { TimeUnit } from './TimeUnit';
import type { CountdownTarget, CountdownDisplayConfig } from '../types/CountdownTypes';
import type { IconName } from '../../../atoms/AtomicIcon';

export interface CountdownProps {
    target: CountdownTarget;
    alternateTargets?: CountdownTarget[];
    displayConfig?: CountdownDisplayConfig;
    interval?: number;
    onExpire?: () => void;
    onTargetChange?: (target: CountdownTarget) => void;
}

export const Countdown: React.FC<CountdownProps> = ({
    target,
    alternateTargets = [],
    displayConfig = {},
    interval = 1000,
    onExpire,
    onTargetChange,
}) => {
    const tokens = useAppDesignTokens();
    const {
        showIcon = true,
        showLabel = true,
        showToggle = alternateTargets.length > 0,
        layout = 'grid',
        size = 'medium',
    } = displayConfig;

    const [currentTargetIndex, setCurrentTargetIndex] = React.useState(0);
    const allTargets = useMemo(
        () => [target, ...alternateTargets],
        [target, alternateTargets]
    );
    const currentTarget = allTargets[currentTargetIndex];

    const { timeRemaining } = useCountdown(currentTarget, {
        interval,
        onExpire,
    });

    const handleToggle = () => {
        const nextIndex = (currentTargetIndex + 1) % allTargets.length;
        setCurrentTargetIndex(nextIndex);
        if (onTargetChange) {
            onTargetChange(allTargets[nextIndex]);
        }
    };

    const timeUnits = useMemo(() => {
        const units = [];

        if (timeRemaining.days > 0) {
            units.push({ value: timeRemaining.days, label: 'Days' });
        }
        units.push({ value: timeRemaining.hours, label: 'Hours' });
        units.push({ value: timeRemaining.minutes, label: 'Minutes' });
        units.push({ value: timeRemaining.seconds, label: 'Seconds' });

        return units;
    }, [timeRemaining]);

    return (
        <View style={styles.container}>
            {showLabel && (
                <CountdownHeader
                    title={currentTarget.label || 'Countdown'}
                    icon={currentTarget.icon as IconName}
                    showToggle={showToggle}
                    onToggle={handleToggle}
                />
            )}

            <View style={[styles.grid, { gap: tokens.spacing.sm }]}>
                {timeUnits.map((unit, index) => (
                    <TimeUnit
                        key={index}
                        value={unit.value}
                        label={unit.label}
                        size={size}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
