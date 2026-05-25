import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Falcon9Main from './app/screens/Falcon 9/Falcon9Main.js';
import Falcon9Payload from './app/screens/Falcon 9/Falcon9Payload.js';
import Falcon9Interstage from './app/screens/Falcon 9/Falcon9Interstage.js';
import Falcon9SecondStage from './app/screens/Falcon 9/Falcon9SecondStage.js';
import Falcon9FirstStage from './app/screens/Falcon 9/Falcon9FirstStage.js';
import FairingPage from './app/screens/Falcon 9/FairingPage.js';
import DragonPage from './app/screens/Falcon 9/DragonPage.js';
import GridFins from './app/screens/Falcon 9/GridFinsPage.js';
import SecondStageEngine from './app/screens/Falcon 9/SecondStageEnginePage.js';
import FirstStageEngine from './app/screens/Falcon 9/FirstStageEnginePage.js';
import LandingLegs from './app/screens/Falcon 9/LandingLegsPage.js';
import FlatlistPage from './app/screens/FlatlistPage.js';

import Artemis1Main from './app/screens/Artemis 1/Artemis1Main.js';
import Artemis1Cockpit from './app/screens/Artemis 1/Artemis1Cockpit.js';
import Artemis1Crew from './app/screens/Artemis 1/Artemis1Crew.js';
import Artemis1LaunchAbort from './app/screens/Artemis 1/Artemis1LaunchAbort.js';
import Artemis1UpperMid from './app/screens/Artemis 1/Artemis1UpperMid.js';
import Artemis1ICPS from './app/screens/Artemis 1/Artemis1ICPS.js';
import Artemis1StageAdapter from './app/screens/Artemis 1/Artemis1StageAdapter.js';
import Artemis1Booster from './app/screens/Artemis 1/Artemis1Booster.js';
import Artemis1CoreStage from './app/screens/Artemis 1/Artemis1CoreStage.js';
import Artemis1SolidBoosters from './app/screens/Artemis 1/Artemis1SolidBoosters.js';
import Artemis1Engines from './app/screens/Artemis 1/Artemis1Engines.js';
import Artemis1Engine from './app/screens/Artemis 1/Artemis1Engine.js';


import FalconHeavyMain from './app/screens/Falcon Heavy/FalconHeavyMain.js';
import FalconHeavyPayload from './app/screens/Falcon Heavy/FalconHeavyPayload.js';
import FalconHeavyFairing from './app/screens/Falcon Heavy/FalconHeavyFairing.js';
import FalconHeavyDragon from './app/screens/Falcon Heavy/FalconHeavyDragon.js';
import FalconHeavyInterstage from './app/screens/Falcon Heavy/FalconHeavyInterstage.js';
import FalconHeavyGrid from './app/screens/Falcon Heavy/FalconHeavyGrid.js';
import FalconHeavySecondStage from './app/screens/Falcon Heavy/FalconHeavySecondStage.js';
import FalconHeavySSEngine from './app/screens/Falcon Heavy/FalconHeavySSEngine.js';
import FalconHeavyFirstStage from './app/screens/Falcon Heavy/FlaconHeavyFirstStage.js';
import FalconHeavyFSEngine from './app/screens/Falcon Heavy/FalconHeavyFSEngine.js';
import FalconHeavyLandingLegs from './app/screens/Falcon Heavy/FalconHeavyLandingLegs.js';





















import { useFonts, Exo_400Regular, Exo_600SemiBold, Exo_100Thin, Exo_700Bold } from '@expo-google-fonts/exo';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';





NavigationBar.setVisibilityAsync("hidden");

const Stack = createNativeStackNavigator();



export default function App() {
  
  
  let [fontsLoaded, fontError] = useFonts({
    Exo_400Regular,
    Exo_600SemiBold,
    Exo_100Thin,
    Exo_700Bold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, }}>
        
        <Stack.Screen name="FlatlistPage" component={FlatlistPage}/>
        <Stack.Screen name="Falcon9Main" component={Falcon9Main} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Falcon9Payload" component={Falcon9Payload} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FairingPage" component={FairingPage} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="DragonPage" component={DragonPage} options={{ animation: 'slide_from_bottom' }}/>
        <Stack.Screen name="Falcon9Interstage" component={Falcon9Interstage}  options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Falcon9SecondStage" component={Falcon9SecondStage}  options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Falcon9FirstStage" component={Falcon9FirstStage}  options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="GridFins" component={GridFins} options={{ animation: 'slide_from_bottom' }}/>
        <Stack.Screen name="SecondStageEngine" component={SecondStageEngine} options={{ animation: 'slide_from_bottom' }}/>
        <Stack.Screen name="FirstStageEngine" component={FirstStageEngine} options={{ animation: 'slide_from_bottom' }}/>
        <Stack.Screen name="LandingLegs" component={LandingLegs} options={{ animation: 'slide_from_bottom' }}/>


        <Stack.Screen name="Artemis1Main" component={Artemis1Main} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1Cockpit" component={Artemis1Cockpit} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1Crew" component={Artemis1Crew} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1LaunchAbort" component={Artemis1LaunchAbort} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1UpperMid" component={Artemis1UpperMid} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1ICPS" component={Artemis1ICPS} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1StageAdapter" component={Artemis1StageAdapter} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1Booster" component={Artemis1Booster} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1CoreStage" component={Artemis1CoreStage} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1SolidBoosters" component={Artemis1SolidBoosters} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1Engines" component={Artemis1Engines} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="Artemis1Engine" component={Artemis1Engine} options={{ animation: 'slide_from_right' }}/>


        <Stack.Screen name="FalconHeavyMain" component={FalconHeavyMain} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyPayload" component={FalconHeavyPayload} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyFairing" component={FalconHeavyFairing} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyDragon" component={FalconHeavyDragon} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyInterstage" component={FalconHeavyInterstage} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyGrid" component={FalconHeavyGrid} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavySecondStage" component={FalconHeavySecondStage} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavySSEngine" component={FalconHeavySSEngine} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyFirstStage" component={FalconHeavyFirstStage} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyFSEngine" component={FalconHeavyFSEngine} options={{ animation: 'slide_from_right' }}/>
        <Stack.Screen name="FalconHeavyLandingLegs" component={FalconHeavyLandingLegs} options={{ animation: 'slide_from_right' }}/>





















      </Stack.Navigator>
    </NavigationContainer>
  );
}


/*
export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Exo_400Regular,
    Exo_600SemiBold,
    Exo_100Thin,
    Exo_700Bold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View>
      <Text>App is working!</Text>
    </View>
  );
}

*/