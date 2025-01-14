//Reset the AsyncStorage value using the following snippet:

import AsyncStorage from "@react-native-async-storage/async-storage";

const resetOnboarding = async () => {
  await AsyncStorage.removeItem("onboardingComplete");
  console.log("Onboarding reset!");
};

export default resetOnboarding;
