import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTetrisGame } from '@/context/TestGameContext';

const JOYSTICK_RADIUS = 50; // Rayon du joystick (base)
const KNOB_RADIUS = 20; // Rayon du knob
const MOVE_THRESHOLD = 40; // Chaque 20 px, on déclenche un déplacement

const { width } = Dimensions.get('window');

export default function VirtualJoystick() {
  const { game } = useTetrisGame();

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const lastMoveX = useSharedValue(0);
  const lastMoveY = useSharedValue(0);

  const joystickGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      translationX.value = 0;
      translationY.value = 0;
      lastMoveX.value = 0;
      lastMoveY.value = 0;
    })
    .onUpdate((event) => {
      let newTranslationX = event.translationX;
      let newTranslationY = event.translationY;

      // Calculer la distance entre le centre du joystick et la position actuelle du knob
      const distance = Math.sqrt(newTranslationX ** 2 + newTranslationY ** 2);

      // Si la distance dépasse le rayon du joystick, on limite les translations
      if (distance > JOYSTICK_RADIUS - KNOB_RADIUS) {
        const angle = Math.atan2(newTranslationY, newTranslationX);
        newTranslationX = (JOYSTICK_RADIUS - KNOB_RADIUS) * Math.cos(angle);
        newTranslationY = (JOYSTICK_RADIUS - KNOB_RADIUS) * Math.sin(angle);
      }

      translationX.value = newTranslationX;
      translationY.value = newTranslationY;

      if (game) {
        if (event.translationX - lastMoveX.value <= -MOVE_THRESHOLD) {
          game.moveLeft();
          lastMoveX.value = event.translationX;
        } else if (event.translationX - lastMoveX.value >= MOVE_THRESHOLD) {
          game.moveRight();
          lastMoveX.value = event.translationX;
        }

        if (event.translationY - lastMoveY.value >= MOVE_THRESHOLD) {
          game.softDrop();
          lastMoveY.value = event.translationY;
        }
      }
    })
    .onFinalize(() => {
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translationX.value) }, { translateY: withSpring(translationY.value) }],
  }));

  return (
    <GestureDetector gesture={joystickGesture}>
      <Animated.View style={styles.container}>
        <Animated.View style={styles.joystickBase} />
        <Animated.View style={[styles.knob, knobStyle]} />
      </Animated.View>
    </GestureDetector>
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
