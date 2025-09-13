import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions, View, Image, Text } from "react-native";
import { Images } from "../assets/images";
import { moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export const CustomAnimationFishPhotoView = () => {
    // Animated Values to control the animations
    const allOpacity = useRef(new Animated.Value(0)).current;
    const handOpacity = useRef(new Animated.Value(0)).current;
    const flashOpacity = useRef(new Animated.Value(0)).current;
    const identifiedOpacity = useRef(new Animated.Value(0)).current;
    const backgroundBlur = useRef(new Animated.Value(0)).current;
    const handScale = useRef(new Animated.Value(1.5)).current;

    const doAnimation = () => {
        // Reset to initial state
        allOpacity.setValue(0);
        handOpacity.setValue(0);
        flashOpacity.setValue(0);
        identifiedOpacity.setValue(0);
        backgroundBlur.setValue(0);
        handScale.setValue(1.5);

        // Step 1: Fade everything in
        Animated.timing(allOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            // Step 2: Hand moves in with scaling and fading
            Animated.parallel([
                Animated.timing(handOpacity, {
                    toValue: 1,
                    duration: 1700,
                    useNativeDriver: true,
                }),
                Animated.timing(handScale, {
                    toValue: 1,
                    duration: 1700,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Step 3: Flash goes off and background blurs
                Animated.parallel([
                    Animated.timing(flashOpacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(backgroundBlur, {
                        toValue: 4,
                        duration: 200,
                        useNativeDriver: false,
                    })
                ]).start(() => {
                    // Step 4: Show the identified image
                    Animated.timing(identifiedOpacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        // Step 5: Delay and then fade everything out
                        setTimeout(() => {
                            Animated.timing(allOpacity, {
                                toValue: 0,
                                duration: 400,
                                useNativeDriver: true,
                            }).start(() => doAnimation()); // Loop the animation
                        }, 2300);
                    });
                });
            });
        });
    };

    useEffect(() => {
        doAnimation();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: allOpacity }]}>
            {/* Background image that blurs */}
            <Animated.Image
                source={Images.OnboardingHandAnimation}
                style={[styles.image, { blurRadius: backgroundBlur }]}
            />

            {/* Hand with phone animation, scaled and faded in */}
            <Animated.View
                style={[
                    styles.imageOverlay,
                    {
                        opacity: handOpacity,
                        transform: [{ scale: handScale }]
                    }
                ]}>
                <Image
                    source={Images.OnboardingHandAnimation1}
                    style={styles.imageOverlay}
                />
                <Animated.Image
                    source={Images.OnboardingHandAnimation2}
                    style={[styles.imageOverlay, { opacity: flashOpacity }]}
                />
                <Animated.Image
                    source={Images.OnboardingHandAnimation3}
                    style={[styles.imageOverlay, { opacity: identifiedOpacity }]}
                />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        bottom: moderateScale(30)
    },
    image: {
        width: width * 0.7,
        height: width * 0.7,
        resizeMode: "contain",

    },
    imageOverlay: {
        position: "absolute",
        width: width * 0.7,
        height: width * 0.7,
        resizeMode: "contain",
    },
});