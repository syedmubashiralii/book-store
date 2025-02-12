import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { View, ViewProps } from "react-native";
const AnimatedBlurView = Animated.createAnimatedComponent(View);

const CustomBackdrop = ({ animatedIndex, style }:any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP
    )})`,
  }));

  // styles
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style]
  );

  const blurViewProps = useAnimatedProps<ViewProps>(() => {
    return {
      style: {
        opacity: interpolate(
          animatedIndex.value,
          [-1, 0],
          [0, 1],
          Extrapolate.CLAMP
        ),
      },
    };
  });

  return (<AnimatedBlurView animatedProps={blurViewProps} style={containerStyle} />
  );
};

export default CustomBackdrop;
