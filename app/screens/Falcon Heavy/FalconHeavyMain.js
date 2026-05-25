import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, StatusBarStyle, Dimensions, PixelRatio, Image, TouchableOpacity, Pressable, Animated} from 'react-native';
import { StatusBar, setStatusBarTranslucent, setStatusBarHidden } from 'expo-status-bar';
import { Octicons, Feather } from '@expo/vector-icons';
import {createStaticNavigation, useNavigation,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');

function Falcon9Main(props, route, progress) {

        {/* Payload Progress */}

    const navigation = useNavigation();
    const [fairingChecked, setFairingChecked] = useState(false);
    const [dragonTrunkChecked, setDragonTrunkChecked] = useState(false);
    const [widthAnim1] = useState(new Animated.Value(0));

     // Payload Progress
     const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key_FalconHeavyPayload');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchProgress = async () => {
                const storedProgress = await getData();
                if (storedProgress !== null) {
                    setFairingChecked(storedProgress.fairingChecked);
                    setDragonTrunkChecked(storedProgress.dragonTrunkChecked);
                    
                    // Calculate the progress after it's fetched
                    const progress = (storedProgress.fairingChecked + storedProgress.dragonTrunkChecked) / 2 * 100;
    
                    // Start the animation after the progress is calculated
                    Animated.timing(widthAnim1, {
                        toValue: progress,
                        duration: 500,
                        useNativeDriver: false,
                    }).start();
                }
            };
    
            fetchProgress();
        }, [])
    );


//--------------------------------------------------------------------------------------------------------//
   

     {/* Interstage Progress */}
         const [gridFinChecked, setGridFinChecked] = useState(false);
         const [widthAnim2] = useState(new Animated.Value(0));


     const getData2 = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key_FalconHeavyInterstage')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
        }
    }

    
    useFocusEffect(
        React.useCallback(() => {
            const fetchProgress = async () => {
                const storedProgress = await getData2();
                if (storedProgress !== null) {
                    setGridFinChecked(storedProgress.gridFinChecked);
                    
                    // Calculate the progress after it's fetched
                    const progress = (storedProgress.gridFinChecked) / 1 * 100;
    
                    // Start the animation after the progress is calculated
                    Animated.timing(widthAnim2, {
                        toValue: progress,
                        duration: 500,
                        useNativeDriver: false,
                    }).start();
                }
            };
    
            fetchProgress();
        }, [])
    );


    

//-------------------------------------------------------------------------------------------------------


     {/* SecondStage Progress */}

    
     const getData3 = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key_FalconHeavySecondStage')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
        }
    }

    const [engineChecked, setEngineChecked] = useState(false);
    const [widthAnim3] = useState(new Animated.Value(0));

    

    useFocusEffect(
        React.useCallback(() => {
            const fetchProgress = async () => {
                const storedProgress = await getData3();
                if (storedProgress !== null) {
                    setEngineChecked(storedProgress.engineChecked);
                    
                    // Calculate the progress after it's fetched
                    const progress = (storedProgress.engineChecked) / 1 * 100;
    
                    // Start the animation after the progress is calculated
                    Animated.timing(widthAnim3, {
                        toValue: progress,
                        duration: 500,
                        useNativeDriver: false,
                    }).start();
                }
            };
    
            fetchProgress();
        }, [])
    );


//-----------------------------------------------------------------------------------------------

    {/* FirstStage Progress */}



    const getData4 = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key_FalconHeavyFirstStage')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
        }
    }

    const [engine2Checked, setEngine2Checked] = useState(false);
    const [landingLegsChecked, setLandingLegsChecked] = useState(false);
    const [widthAnim4] = useState(new Animated.Value(0));
    const [opacityValue] = useState(new Animated.Value(0));


    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            const fetchProgress = async () => {
                const storedProgress = await getData4();
                if (storedProgress !== null) {
                    setEngine2Checked(storedProgress.engine2Checked);
                    setLandingLegsChecked(storedProgress.landingLegsChecked);
                    
                    // Calculate the progress after it's fetched
                    const progress = (storedProgress.engine2Checked + storedProgress.landingLegsChecked) / 2 * 100;
    
                    // Start the animation after the progress is calculated
                    Animated.timing(widthAnim4, {
                        toValue: progress,
                        duration: 500,
                        useNativeDriver: false,
                    }).start();
                }
            };
    
            fetchProgress();
        }, [])
    );



//--------------------------------------------------------------------------------------------------------
    
    return (     
    <Animated.View style={{...styles.container, opacity: opacityValue}}>
            <StatusBar/> 
        
            {/* H E A D E R / N A V B A R */}
                
            
            <View style={styles.header}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? 'lightgrey' : 'transparent' },
                    ]}
                    onPress={() => navigation.navigate('FlatlistPage')}
                    >
                    <Octicons name="home" size={24} color="black" style={styles.homeIcon}/>
                </Pressable>
                <View style={styles.negativeSpace}/>
            </View>
            

            {/* M A I N */}

            <View style={styles.main}>
                <View style={styles.section1}>
                    <Text style={styles.rocketTitle}>The Falcon Heavy</Text>
                    <Text style={styles.rocketDescription}>
                        The Falcon Heavy by SpaceX is the most powerful operational rocket in the world, capable of carrying large payloads to orbit and beyond. Its pretty much the Falcon 9 with 2 boosters slapped on.
                    </Text>
                </View>
                <View style={styles.section2}>
                    <View style={styles.leftColumn}>
                        <Image style={styles.falcon9Image} source={require('../../assets/FalconHeavy.png')} />
                    </View>
                    <View style={styles.rightColumn}>

                        <TouchableOpacity style={styles.subSection1} onPress={() => navigation.navigate('FalconHeavyPayload')}>
                            
                            <View style={styles.subSectionContainer}>
                                <View style={styles.subSection1Wrapper}>
                                    <Animated.Text style={styles.subSectionTitle} >Payload</Animated.Text>
                                    <Feather name="chevron-right" size={30} color="white" style={styles.subSection1Arrow} />
                                </View>

                                <View style={styles.subSection1ProgressContainer}>
                                    <View style={styles.subSection1ProgressBarWrapper}>
                                        <Animated.View style={[styles.filler, { width: widthAnim1.interpolate({
                                                    inputRange: [0, 100],
                                                    outputRange: ['0%', '100%'],
                                                })}]} />
                                    </View>
                                    
                                </View>
                            </View>
                           
                            

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.subSection1} onPress={() => navigation.navigate('FalconHeavyInterstage')}>
                            
                            <View style={styles.subSectionContainer}>
                                <View style={styles.subSection1Wrapper}>
                                    <Text style={styles.subSectionTitle}>Interstage</Text>
                                    <Feather name="chevron-right" size={30} color="white" style={styles.subSection1Arrow} />
                                </View>

                                <View style={styles.subSection1ProgressContainer}>
                                    <View style={styles.subSection1ProgressBarWrapper}>
                                        <Animated.View style={[styles.filler, { width: widthAnim2.interpolate({
                                                    inputRange: [0, 100],
                                                    outputRange: ['0%', '100%'],
                                                })}]} />
                                    </View>
                                    
                                </View>
                            </View>
                           
                            

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.subSection1} onPress={() => navigation.navigate('FalconHeavySecondStage')}>
                            
                            <View style={styles.subSectionContainer}>
                                <View style={styles.subSection1Wrapper}>
                                    <Text style={styles.subSectionTitle}>Second Stage</Text>
                                    <Feather name="chevron-right" size={30} color="white" style={styles.subSection1Arrow} />
                                </View>

                                <View style={styles.subSection1ProgressContainer}>
                                    <View style={styles.subSection1ProgressBarWrapper}>
                                        <Animated.View style={[styles.filler, { width: widthAnim3.interpolate({
                                                    inputRange: [0, 100],
                                                    outputRange: ['0%', '100%'],
                                                })}]} />
                                    </View>
                                    
                                </View>
                            </View>
                           
                            

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.subSection1} onPress={() => navigation.navigate('FalconHeavyFirstStage')}>
                            
                            <View style={styles.subSectionContainer}>
                                <View style={styles.subSection1Wrapper}>
                                    <Text style={styles.subSectionTitle}>First Stage</Text>
                                    <Feather name="chevron-right" size={30} color="white" style={styles.subSection1Arrow} />
                                </View>

                                <View style={styles.subSection1ProgressContainer}>
                                    <View style={styles.subSection1ProgressBarWrapper}>
                                        <Animated.View style={[styles.filler, { width: widthAnim4.interpolate({
                                                    inputRange: [0, 100],
                                                    outputRange: ['0%', '100%'],
                                                })}]} />
                                    </View>
                                    
                                </View>
                            </View>
                           
                            

                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Animated.View>

        
        
        
       
       
    );

       
}

export default Falcon9Main;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      //alignItems: 'center',
      //justifyContent: 'center',
    },

    button: {
        //paddingLeft: 30,
        padding: 10,
        borderRadius: 100,
    },

  
   
    header: {
        flex: 2,
        //backgroundColor: 'tomato',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop:10
        
    },

    homeIcon: {
         padding: 4,
         paddingLeft: 5,
         paddingRight: 5,
         borderRadius: 100
         
    },

    negativeSpace:{
        flex: 1,
        backgroundColor:'white'
    },
    main: {
        flex: 20,
        display: 'flex',
    },
    section1: {
        flex: 2,
        //backgroundColor: 'orange',

    },
    rocketTitle: {
        color: 'black',
        //backgroundColor: 'green',
        fontSize: getFontSize(25),
        fontFamily: 'Exo_400Regular',
        paddingLeft: 30,
        paddingTop: 10,

    },
    rocketDescription: {
        color: 'black',
        fontSize: getFontSize(13),
        fontFamily: 'Exo_400Regular',
        paddingLeft: 30,
        paddingTop: 10,
        paddingRight: 50,

    },
    section2: {
        flex: 9,
        flexDirection: 'row',

    },
    leftColumn: {
        flex: 1,
        //backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
    },

    falcon9Image: {
        height: '100%',
        width: '60%',
    },

    rightColumn: {
        flex: 1,
        //backgroundColor: 'lightyellow',
        flexDirection: 'column',
        paddingBottom: 50,
        gap: 23,
        paddingRight: 32,
        
    },


    subSection1: {
        backgroundColor: "#73A9AD",
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },

    subSectionContainer:{
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 23,
        //backgroundColor: 'white',
        paddingRight: 15,
        width: '100%',
        paddingTop: 50,
        paddingBottom: 30,
        //gap: 2

    },

    subSection1Wrapper: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: 'lightblue',
        //width: '100%'
        paddingBottom: 10
    },

    subSection1ProgressContainer:{
        flex: 1,
        //backgroundColor:'tomato',
        paddingRight: 10,
        justifyContent: 'flex-end'
    },  


    subSectionTitle: {
        fontSize: getFontSize(17),
        fontFamily: 'Exo_600SemiBold',
        color: 'white',
        
        
    },


    subSection1ProgressBarWrapper: {
        flex: 0.2,
        backgroundColor: '#bfbdbd',
        //paddingTop: 20
        borderRadius: 30,
    },

    filler: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 30, // Make sure the filler also has border radius
        
    },

  });