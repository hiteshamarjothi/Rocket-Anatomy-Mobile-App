import {React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBarStyle, Dimensions, PixelRatio, Image, Animated, TouchableOpacity, setItem, Touchable, Pressable} from 'react-native';
import { StatusBar, setStatusBarTranslucent, setStatusBarHidden } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useFonts, Exo_400Regular } from '@expo-google-fonts/exo';
import {createStaticNavigation, useNavigation,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';


const Stack = createNativeStackNavigator();

NavigationBar.setVisibilityAsync("hidden");





const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;


function Artemis1Cockpit(props) {

    const navigation = useNavigation();

    //State variables for the tickboxes
    const [crewChecked, setCrewChecked] = useState(false);
    const [launchAbortChecked, setLaunchAbortChecked] = useState(false);

    //Calculate the progress based on the tickboxes (2 for 2 Components)
    const progress = (crewChecked + launchAbortChecked) / 2 * 100;

    //Animated value for the progress bar
    const [widthAnim1] = useState(new Animated.Value(0));

    // Update the animated value whenever the progress changes
    useEffect(() => {
        Animated.timing(widthAnim1, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key_Artemis1_Payload', jsonValue)
        } catch (e) {
          // saving error
        }
      }
      
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key_Artemis1_Payload')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }

       // Fetch the stored progress when the component mounts
    useEffect(() => {
        const fetchProgress = async () => {
            const storedProgress = await getData();
            if (storedProgress !== null) {
                setCrewChecked(storedProgress.crewChecked);
                setLaunchAbortChecked(storedProgress.launchAbortChecked);
            }
        }

        fetchProgress();
    }, []);

    // Store the progress whenever it changes
    useEffect(() => {
        storeData({ crewChecked, launchAbortChecked });
    }, [crewChecked, launchAbortChecked]);

    
      

   


    
    return (     
        <SafeAreaView style={styles.container}>
            <StatusBar/>

            {/* M A I N  O V E R V I E W */}
            <View style={styles.descriptionContainer}>
                
                {/* NavBar */}
                <View style={styles.navBarWrapper}>

                <Pressable
                style={({ pressed }) => [
                    styles.closeButton,
                    { backgroundColor: pressed ? 'rgba(255, 255, 255, 0.5)' : 'transparent' },
                        ]}
                    onPress={() => navigation.navigate('Artemis1Main', {progress: progress})}
                        >
                    <Ionicons name="close" size={30} color="white" style={{padding: 5, paddingLeft: 6, paddingRight: 6}}/>
                </Pressable>

                <Pressable
                style={({ pressed }) => [
                    styles.homeButton,
                    { backgroundColor: pressed ? 'rgba(255, 255, 255, 0.5)' : 'transparent' },
                        ]}
                    onPress={() => navigation.navigate('FlatlistPage', {progress: progress})}
                        >
                    <Octicons name="home" size={24} color="white" style={{padding: 10, paddingLeft: 12, paddingRight: 12}} />
                </Pressable>




                    
                </View>

                 
                {/* Description Section */}
                <View style={styles.descriptionSection}>
                    <View style={styles.descriptionWrapper}>
                        <Animated.Text style={styles.payloadHeading} sharedTransitionTag="tag" >Cockpit</Animated.Text>
                        <Text style={styles.description}>The top section of the Artemis Space Launch System (SLS) houses the Orion spacecraft, designed for deep-space missions. The below 3 modules provide saftey and support for astronauts. </Text>
                    </View>
                    <View style={styles.payloadImage}>
                        <Image style={styles.payloadImageSource} source={require('../../assets/ArtemisSLSCrop.png')}/>
                    </View>
                </View>

                <View style={styles.progressBar}>
                    <View style={styles.progressBarContainer}>
                        <Animated.View style={[styles.inner, { width: widthAnim1.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            })}]} />
                    </View>
                    
                </View>
                
            </View>

            {/* C O M P O N E N T S  S E C T I O N */}
            <View style={styles.componentContainer}>
                <View style={styles.componentHeader}>
                    <Text style={styles.componentHeaderText} >2 Components</Text>
                    <Text style={styles.componentHeaderSubText}>• Artemis Cockpit</Text>
                </View>
                <View style={styles.componentWrapper} >
                    <TouchableOpacity style={styles.fairingComponentItem} onPress={() => navigation.navigate('Artemis1Crew')}>
                        <View style={styles.fairingWrapper}>
                            <View style={styles.fairingIcon}>
                                <Feather name="box" size={45} color="white" style={styles.icon}/>
                            </View>
                            <Text style={styles.header}>Orion</Text>   
                        </View>

                        <View style={styles.negativeSpace}/>
                        <TouchableOpacity onPress={() => setCrewChecked(!crewChecked)} style={styles.fairingTickBox} activeOpactity={100}>
                            <View style={crewChecked ? styles.checkedCircle : styles.fairingCircle}>
                                        {crewChecked && <Feather name="check" size={24} color="white" />}
                            </View>
                        </TouchableOpacity>
                       
                            
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dragonComponentItem} onPress={() => navigation.navigate('Artemis1LaunchAbort')}>
                        <View style={styles.dragonWrapper}>
                                <View style={styles.dragonIcon}>
                                    <Feather name="box" size={45} color="white" style={styles.icon}/>
                                </View>
                                <Text style={styles.header}>Launch Abort</Text>   
                        </View>

                            
                            
                        <TouchableOpacity onPress={() => setLaunchAbortChecked(!launchAbortChecked)} style={styles.dragonTickBox}>
                        <View style={launchAbortChecked ? styles.checkedCircle : styles.fairingCircle}>
                                        {launchAbortChecked && <Feather name="check" size={24} color="white" />}
                            </View>
                        </TouchableOpacity>


                    </TouchableOpacity>
                    <View style={styles.emptyComponent1}/>
                    <View style={styles.emptyComponent2}/>
                </View>
            </View>


        </SafeAreaView>
            
       
    );

       
}

export default Artemis1Cockpit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    closeButton: {
        borderRadius: 24,
        justifyContent: 'center',
    },

    homeButton: {
        borderRadius: 24
    },


    descriptionContainer: {
        flex: 3.7,
        backgroundColor: '#25282E',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingLeft: 30,
        paddingRight: 30,


        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        //shadowOpacity: 0.5,
        //shadowRadius: 2,
        elevation: 50


    },
    

    navBarWrapper: {
        flex: 2.5,
        //backgroundColor: 'tomato',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        //paddingRight: 20,
        paddingTop: 5
    },

    descriptionSection: {
        flex: 8,
        //backgroundColor: 'lightyellow',
        flexDirection: 'row',
    
    },

    descriptionWrapper: {
        flex: 1.4,
        //backgroundColor: 'orange',
        justifyContent: 'center',
        paddingRight: 5,
        gap: 10
    },

    

    payloadHeading: {
        fontFamily: 'Exo_600SemiBold',
        color: 'white',
        fontSize: getFontSize(30),

    },

    description: {
        fontFamily: 'Exo_400Regular',
        color: 'white',
        fontSize: getFontSize(14),
    },

    payloadImage: {
        flex: 1,
       // backgroundColor: 'purple',
       justifyContent: 'center',
       alignItems: 'center'
    }, 

    payloadImageSource: {
        height: '90%',
        width: '70%',
    },

    progressBar: {
        flex: 1.5,
        //backgroundColor: 'lightblue',
        justifyContent: 'center',
        paddingBottom: 10
    },

    progressBarContainer: {
        backgroundColor: '#5b5c5b',
        flex: 0.1,
        borderRadius: 15,
    },



    inner: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 15,
    },


    componentContainer: {
        flex: 4.3,
        paddingLeft: 30,
        paddingRight: 30,

    },

    componentHeader: {
        flex: 1.3,
        //backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },



    componentHeaderText: {
        fontFamily: 'Exo_600SemiBold',
        color: 'black',
        fontSize: getFontSize(25),
    },

    componentHeaderSubText: {
        fontFamily: 'Exo_400Regular',
        color: 'black',
        fontSize: getFontSize(17),
        //alignSelf:'center',
    },

    componentWrapper: {
        flex: 8,
        //backgroundColor: 'black',
        gap: 20
    },

    fairingComponentItem: {
        flex: 1,
        backgroundColor: '#25282E',
        borderRadius: 15,
        flexDirection: 'row',

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        //shadowOpacity: 0.5,
        //shadowRadius: 2,
        elevation: 10,

        //gap: 10

        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 25,
        paddingRight: 25,
        


    },

    dragonComponentItem: {
        flex: 1,
        backgroundColor: '#25282E',
        borderRadius: 15,
        flexDirection: 'row',

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        //shadowOpacity: 0.5,
        //shadowRadius: 2,
        elevation: 10,

        gap: 20,

        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 25,
        paddingRight: 25,
        


    },

    fairingWrapper: {
        flex: 8.5,
        //backgroundColor: 'orange',
        flexDirection: 'row',
        //alignItems: 'center'
        //paddingTop: 17,
        //paddingBottom: 17,
        //paddingLeft: 25,
        //paddingRight: 25,

        gap: 20

    },

    fairingIcon: {
        flex: 0.85,
        backgroundColor: '#EF9C66',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    
    dragonIcon: {
        flex: 1,
        backgroundColor: '#EF9C66',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        fontFamily: 'Exo_600SemiBold',
        color: 'white',
        fontSize: getFontSize(23),
        alignSelf: 'center',
        
    },

    negativeSpace: {
        flex: 5,
        //backgroundColor: 'lightyellow'
    },

    fairingTickBox: {
        flex: 2.4,
        //borderColor: '#9CABC8',
        //borderWidth: 10,
        //backgroundColor: 'white',
        //borderRadius: 1000000,
        //paddingTop: 17,
        paddingTop: 10,
        paddingBottom: 10,        
    },

    fairingCircle: {
        flex: 1,
        borderColor: '#EF9C66',
        borderWidth: 2,
        borderRadius: 24
        
    },

    checkedCircle: {
        flex: 1,
        backgroundColor: '#EF9C66',
        borderColor: '#EF9C66',
        borderWidth: 2,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',

    },


    dragonComponent: {
        flex: 1,
        backgroundColor: '#25282E',
        borderRadius: 15,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        //shadowOpacity: 0.5,
        //shadowRadius: 2,
        elevation: 10,
    },  

    dragonWrapper: {
        flex: 13,
        //backgroundColor: 'orange',
        flexDirection: 'row',
        //alignItems: 'center'
        //paddingTop: 17,
        //paddingBottom: 17,
        //paddingLeft: 25,
        //paddingRight: 25,

        gap: 20

    },

    dragonTickBox: {
        flex: 2.5,
        //borderColor: '#9CABC8',
        //borderWidth: 10,
        //backgroundColor: 'white',
        //borderRadius: 1000000,
        //paddingTop: 17,
        paddingTop: 10,
        paddingBottom: 10,  
    },

    dragonNegativeSpace: {
        flex: 1,
    },

    emptyComponent1: {
        flex: 1
    },

    emptyComponent2: {
        flex: 1.5
    }
})