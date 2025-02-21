// components/VirtualJoystick.tsx
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    runOnJS,
} from 'react-native-reanimated';
import { useTetris } from '@/context/TetrisContext';

const JOYSTICK_RADIUS = 50; // Rayon du joystick (base)
const KNOB_RADIUS = 20; // Rayon du knob
const MOVE_THRESHOLD = 20; // Chaque 20 px, on déclenche un déplacement

const { width } = Dimensions.get('window');

export default function VirtualJoystick() {
    const { moveLeft, moveRight, softDrop } = useTetris();

    // Valeurs partagées pour le déplacement du knob
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);

    // Utiliser un contexte (ctx) pour stocker la dernière position franchie
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.prevX = 0;
            ctx.prevY = 0;
        },
        onActive: (event, ctx: any) => {
            // Calculer le delta depuis la dernière étape enregistrée
            const dx = event.translationX - ctx.prevX;
            const dy = event.translationY - ctx.prevY;

            // Pour les mouvements horizontaux
            if (dx <= -MOVE_THRESHOLD) {
                runOnJS(moveLeft)();
                ctx.prevX -= MOVE_THRESHOLD;
            } else if (dx >= MOVE_THRESHOLD) {
                runOnJS(moveRight)();
                ctx.prevX += MOVE_THRESHOLD;
            }

            // Pour le mouvement vertical (vers le bas pour descendre)
            if (dy >= MOVE_THRESHOLD) {
                runOnJS(softDrop)();
                ctx.prevY += MOVE_THRESHOLD;
            }
            // Tu peux ajouter ici un swipe vertical vers le haut si souhaité (ex: rotation)
        },
        onEnd: () => {
            // Réinitialise le knob au centre quand le geste se termine
            translationX.value = 0;
            translationY.value = 0;
        },
    });

    const knobStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.container}>
                <Animated.View style={styles.joystickBase} />
                <Animated.View style={[styles.knob, knobStyle]} />
            </Animated.View>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        width: JOYSTICK_RADIUS * 2,
        height: JOYSTICK_RADIUS * 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystickBase: {
        position: 'absolute',
        width: JOYSTICK_RADIUS * 2,
        height: JOYSTICK_RADIUS * 2,
        borderRadius: JOYSTICK_RADIUS,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
        borderColor: '#fff',
    },
    knob: {
        width: KNOB_RADIUS * 2,
        height: KNOB_RADIUS * 2,
        borderRadius: KNOB_RADIUS,
        backgroundColor: '#fff',
    },
});
