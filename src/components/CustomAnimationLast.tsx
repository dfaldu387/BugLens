import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Dimensions, Image, Easing, Text, TouchableOpacity } from 'react-native';
import { Images } from '../assets/images';
import { moderateScale } from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Colors } from '../themes/Colors';

const { width, height } = Dimensions.get('window');

export const CustomAnimationLast = () => {
    const allOpacity = useRef(new Animated.Value(0)).current;
    const firstRowPosition = useRef(new Animated.Value(0)).current;
    const secondRowPosition = useRef(new Animated.Value(0)).current;
    const thirdRowPosition = useRef(new Animated.Value(0)).current;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const modalOpacity = useRef(new Animated.Value(0)).current;

    const doAnimation = () => {
        Animated.timing(allOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.timing(firstRowPosition, {
                toValue: -width * 1.5,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(secondRowPosition, {
                toValue: -width * 1.8,
                duration: 12000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(thirdRowPosition, {
                toValue: -width * 1.2,
                duration: 8000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const showModal = () => {
        setIsModalVisible(true);
        Animated.timing(modalOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            doAnimation();
        }, 200);

        const modalTimeout = setTimeout(() => {
            showModal();
        }, 2000);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(modalTimeout);
        };
    }, []);

    const stars = [1, 2, 3, 4, 5];

    const handleNotNow = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ top: 50 }}>
                <Image
                    source={Images.OnboardingShark}
                    style={styles.bugImage}
                />

                <Animated.View style={[styles.textContainer, { opacity: allOpacity }]}>
                    <Animated.Text
                        style={[styles.binaryText, { transform: [{ translateX: firstRowPosition }] }]}>
                        100000110011101010100100111000
                    </Animated.Text>
                </Animated.View>
            </View>

            {isModalVisible && (
                <Animated.View
                    style={[styles.modalOverlay, { opacity: modalOpacity }]}>
                    <View style={styles.modalContent}>
                        <Image
                            source={Images.PremiumHero}
                            style={styles.modalIcon}
                        />
                        <Text style={styles.modalTitle}>Enjoying Insect Identifier?</Text>
                        <Text style={styles.modalText}>
                            {`Tap a star to rate it on the\nApp Store.`}
                        </Text>

                        <View style={styles.starsContainer}>
                            {stars.map((star, index) => (
                                <EvilIcons
                                    key={index}
                                    name={'star'}
                                    size={35}
                                    color={Colors.blue_55aaff}
                                    style={styles.starIcon}
                                />
                            ))}
                        </View>

                        <TouchableOpacity onPress={handleNotNow}>
                            <Text style={styles.notNowText}>Not Now</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    bugImage: {
        position: 'absolute',
        left: moderateScale(20),
        width: width * 0.8,
        height: width * 0.8,
        resizeMode: 'contain',
        alignSelf: 'center',
        zIndex: 2
    },
    textContainer: {
        position: 'absolute',
        right: 0,
        top: 120,
        width: width * 0.6,
        overflow: 'hidden',
        zIndex: 1,
    },
    binaryText: {
        fontSize: moderateScale(40),
        fontWeight: 'bold',
        color: Colors.themeRed,
        lineHeight: 45,
    },
    modalIcon: {
        width: moderateScale(80),
        height: moderateScale(80),
        resizeMode: 'contain',
    },
    modalTitle: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: moderateScale(10),
    },
    modalText: {
        fontSize: moderateScale(18),
        color: Colors.white_ccc,
        textAlign: 'center',
        marginBottom: moderateScale(20),
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(20),
        borderTopWidth: 1,
        borderTopColor: Colors.white_ccc,
        paddingTop: moderateScale(10),
        width: '100%',
    },
    notNowText: {
        fontSize: moderateScale(16),
        color: Colors.blue_55aaff,
        fontWeight: 'bold',
        marginTop: moderateScale(10),
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.overlayBg,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    modalContent: {
        width: '85%',
        backgroundColor: Colors.modalBg,
        borderRadius: 20,
        padding: moderateScale(20),
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        height: height * 0.4,
        justifyContent: 'center',
        bottom: 180
    },
    starIcon: {
        marginHorizontal: moderateScale(5),
    },

});
