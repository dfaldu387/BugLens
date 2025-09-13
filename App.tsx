import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  ImageBackground,
  Animated,
  SafeAreaView
} from "react-native";
import { Images } from "./src/assets/images";
import { CustomAnimationFishPhotoView } from "./src/components/CustomAnimationCenter";
import { CustomAnimationLast } from "./src/components/CustomAnimationLast";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from "react-native-size-matters";
import { Colors } from "./src/themes/Colors";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [isPresented, setIsPresented] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.underDevelopmentText}>Under Development...</Text>
      <Modal visible={isPresented} animationType="slide" transparent={false}>
        <OnboardingCinematicView isPresented={setIsPresented} />
      </Modal>
    </SafeAreaView>
  );
}

const AnimatedImages = [
  Images.OnboardingHandAnimation,
  Images.OnboardingHandAnimation1,
  Images.OnboardingHandAnimation2,
  Images.OnboardingHandAnimation3,
];

// ================= Onboarding Flow =================
const OnboardingCinematicView = ({ isPresented }: { isPresented: any }) => {
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;

  // Animate image change
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blurAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIndex((prev) => (prev + 1) % AnimatedImages.length);

        fadeAnim.setValue(0);
        blurAnim.setValue(1);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blurAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextStep = () => {
    if (step === 2) {
      setOpenModal(true)
      setTimeout(() => {
        isPresented(false);
      }, 800);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <SafeAreaView style={styles.onboarding}> {/* SafeAreaView added */}
      <OnboardingHeader />

      <OnboardingProgress step={step} />

      {/* Screens */}
      {step === 0 && (
        <View style={[styles.stepContainer, { marginBottom: moderateScale(180) }]}>
          <Text style={styles.bigTitle}>
            {`Welcome to\nInsect Identifier`}
          </Text>
          <Text style={styles.subtitle}>
            {`The most accurate and efficient way to\nidentify insects & spiders`}
          </Text>

          {/* Testimonial */}
          <View style={styles.testimonialCard1}>
            <Image
              source={Images.ProfileIcon}
              style={styles.profileImage}
            />
            <View style={styles.row}>
              <Image source={Images.AawardLeaves} style={styles.leaf} />
              <View style={styles.viewGood}>
                <Text style={styles.testimonialText}>Such a good app</Text>
                <View style={styles.starView}>
                  {[...Array(5)].map((_, index) => (
                    <FontAwesome
                      key={index}
                      name="star"
                      color={Colors.yellow_FFD700}
                      size={16}
                      style={{ marginRight: index !== 4 ? 3 : 0 }}
                    />
                  ))}
                </View>
              </View>
              <Image
                source={Images.AawardLeaves}
                style={[styles.leaf, { transform: [{ scaleX: -1 }] }]}
              />
            </View>
          </View>
        </View>
      )}

      {step === 1 && (
        <View style={[styles.stepContainer, { marginBottom: moderateScale(200) }]}>
          <Text style={styles.bigTitle}>
            {` Snap a Photo to Identify Insects & Spiders`}
          </Text>
          <Text style={styles.subtitle}>
            {`Quickly and accurately discover insect and\nspider species with a single photo. Simply\nsnap and identify!`}
          </Text>
          <View style={[styles.lastViewAnimation, { marginVertical: moderateScale(30) }]}>
            <CustomAnimationFishPhotoView />
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.bigTitle}>
            {`Powered by AI`}
          </Text>
          <Text style={styles.subtitle}>
            {`Experience the power of AI for instant and\naccurate insect identification, tailored to\nyour current location`}
          </Text>
          <View style={[styles.lastViewAnimationContainer]}>
            <CustomAnimationLast />
          </View>
        </View>
      )}

      <ImageBackground
        source={Images.Herofooter}
        style={styles.footerBackground}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}>
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.trustedWrapper}>
          <View style={styles.subFooterView}>
            {step === 0 ? (
              <Ionicons name="search" color={Colors.themeRed} size={20} />
            ) : step === 1 ? (
              <Feather name="image" color={Colors.themeRed} size={20} />
            ) : (
              <Ionicons name="bug" color={Colors.themeRed} size={20} />
            )}
            <Text style={[styles.trustedText, { marginLeft: 8 }]}>
              {step === 0
                ? 'Trusted by 4536+ Entomology Enthusiasts'
                : step === 1
                  ? 'Over 7634+ Insects Identified'
                  : 'Trained on 1,427,523+ Insect Species'}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// ================= Header =================
const OnboardingHeader = () => (
  <View style={{ width: '100%' }}>
    <Image
      source={Images.HeroHeader}
      style={styles.heroHeader}
    />
  </View>
);

// ================= Progress =================
const OnboardingProgress = ({ step }: { step: number }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.circle, step >= 0 && styles.activeCircle]}>
      <Ionicons name="bug" color={Colors.white} size={20} />
    </View>
    <View style={[styles.line, step > 0 && styles.activeLine]} />
    <View style={[styles.circle, step >= 1 && styles.activeCircle]}>
      <Ionicons name="camera" color={Colors.white} size={20} />
    </View>
    <View style={[styles.line, step > 1 && styles.activeLine]} />
    <View style={[styles.circle, step >= 2 && styles.activeCircle]}>
      <Ionicons name="sparkles-sharp" color={Colors.white} size={16} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  onboarding: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
  },
  bigTitle: {
    fontSize: moderateScale(45),
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginTop: moderateScale(-60),
    lineHeight: 54,
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: Colors.white_ccc,
    textAlign: "center",
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
    lineHeight: 25,
    flexWrap: "wrap",
    alignSelf: "center",
  },
  footerBackground: {
    width: "100%",
    paddingTop: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  button: {
    backgroundColor: Colors.themeRed,
    paddingVertical: moderateScale(13),
    paddingHorizontal: moderateScale(40),
    borderRadius: 12,
    width: '85%',
    marginBottom: moderateScale(70)
  },
  buttonText: {
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.7
  },

  title: {
    fontSize: moderateScale(25),
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },

  circle: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: 15,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    backgroundColor: Colors.themeRed
  },
  icon: {
    color: Colors.white,
    fontSize: moderateScale(16)
  },
  testimonialCard: {
    backgroundColor: Colors.bgGray,
    padding: moderateScale(15),
    borderRadius: 10,
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  testimonialTitle: {
    fontSize: moderateScale(18),
    fontStyle: "italic",
    color: Colors.white
  },
  testimonialDesc: {
    fontSize: moderateScale(14),
    color: Colors.white_ccc,
    marginTop: moderateScale(10)
  },
  flexContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(20)
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginTop: moderateScale(20),
  },

  leaf: {
    width: moderateScale(78),
    height: moderateScale(78),
    resizeMode: "contain",
    marginHorizontal: moderateScale(10),
  },
  testimonialText: {
    color: Colors.white,
    fontSize: moderateScale(20),
    fontWeight: '600',
    letterSpacing: 0.5,
    fontStyle: 'italic'
  },
  stars: {
    color: Colors.yellow_FFD700,
    fontSize: moderateScale(18),
    marginTop: moderateScale(5)
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: moderateScale(20),
  },
  buttonBackground: {
    width: "90%",
    paddingVertical: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(60),
    top: moderateScale(-130),
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.gray,
    marginHorizontal: moderateScale(8),
  },
  activeLine: {
    backgroundColor: Colors.themeRed,
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: 100,
  },

  trustedWrapper: {
    position: "absolute",
    marginTop: moderateScale(50),
    width: "100%",
    alignItems: "center",
  },
  trustedText: {
    fontSize: moderateScale(14),
    color: Colors.white,
    textAlign: "center",
  },

  imageAnimated: {
    width: width * 0.7,
    height: moderateScale(100),
    borderRadius: 16,
    resizeMode: "cover"
  },
  imageWrapper: {
    marginTop: moderateScale(30),
    justifyContent: "center",
    alignItems: "center"
  },
  heroHeader: {
    width: width,
    height: moderateScale(200),
    resizeMode: "cover"
  },
  testimonialCard1: {
    alignItems: "center",
    marginTop: moderateScale(30)
  },
  subFooterView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starView: {
    flexDirection: "row",
    marginTop: moderateScale(10)
  },
  lastViewAnimation: {
    height: '50%'
  },
  viewGood: {
    alignItems: "center",
    justifyContent: "center"
  },
  lastViewAnimationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    bottom: 30
  },
  underDevelopmentText: {
    fontSize: moderateScale(22),
    color: Colors.black
  }
});
