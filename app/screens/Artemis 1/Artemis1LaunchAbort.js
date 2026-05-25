import {React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBarStyle, Dimensions, PixelRatio, Image, Animated, TouchableOpacity, setItem, Touchable, Pressable} from 'react-native';
import { StatusBar, setStatusBarTranslucent, setStatusBarHidden } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';
import { useFonts, Exo_400Regular } from '@expo-google-fonts/exo';
import {createStaticNavigation, useNavigation,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';


const Stack = createNativeStackNavigator();
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

NavigationBar.setVisibilityAsync("hidden");


const { width, height } = Dimensions.get('window');

function FairingPage(props) {
    
    const navigation = useNavigation();

    
    
    return (

        
        <SafeAreaView style={styles.container}>
            <StatusBar/>

            {/* NavBar */}
                <View style={styles.navBarWrapper}>

                <Pressable
                style={({ pressed }) => [
                    styles.closeButton,
                    { backgroundColor: pressed ? 'lightgrey' : 'transparent' },
                ]}
                    onPress={() => navigation.navigate('Artemis1Cockpit')}
                        >
                    <Ionicons name="close" size={30} color="black" />
                </Pressable>

                <Pressable
                style={({ pressed }) => [
                    styles.homeButton,
                    { backgroundColor: pressed ? 'lightgrey' : 'transparent' },
                ]}
                    onPress={() => navigation.navigate('FlatlistPage')}
                        >
                    <Octicons name="home" size={24} color="black" />
                </Pressable>
                    
                </View>

            
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Launch Abort</Text>
                    <Text style={styles.subHeader}>•  Artemis Cockpit</Text>

                </View>

                {/* Main */}
                <View style={styles.mainContainer}>
                    <Image style={styles.fairingImage} source={require('../../assets/Artemis1LaunchAbort.png')}/>
                </View>

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionHeader}>Description </Text>
                    <Text style={styles.description}>The Launch Abort System (LAS) is designed to carry the crew to saftey during launch or ascent. The system contains three solid rocket motors to propel the Orion away from the rocket for a safe landing in the ocean.</Text>
                    <Text style={styles.statsHeader}>Statistics </Text>
                    <View style={styles.statsContainer}>
                        <Text style={styles.stats}>Height:</Text>
                        <Text style={styles.statsContent}>13.4 M</Text>
                        <Text style={styles.stats}>Rockets:</Text>
                        <Text style={styles.statsContent}>3</Text>
                    </View>
                    
                </View>

                




        </SafeAreaView>
        
    );
}

export default FairingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    closeButton: {
        borderRadius: 50,
        justifyContent: 'center',
        padding: 12
        
    },

    homeButton: {
        borderRadius: 50,
        justifyContent: 'center',
        padding: 15

    },

    navBarWrapper: {
        flex: 0.96,
        //backgroundColor: 'tomato',
        flexDirection: 'row',
        //alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 40,
        //paddingBottom: 40
        
    },

    headerContainer: {
        flex: 1.5,
        //backgroundColor: 'tomato',
        flexDirection: 'row',
        alignItems: 'center',

        paddingLeft: 30,     
    },

    header: {
        fontFamily: 'Exo_600SemiBold',
        color: 'black',
        fontSize: getFontSize(30),


    },

    subHeader: {
        fontFamily: 'Exo_400Regular',
        color: 'black',
        fontSize: getFontSize(17),

        paddingLeft: 10
    },

    mainContainer: {
        //backgroundColor: 'lightblue',
        flex: 6.5,

        alignItems: 'center'

    },

    fairingImage: {
        width: width * 0.5,
        height: height * 0.4,
        transform: [{ rotate: '45deg' }],

        

    },

    descriptionContainer: {
        flex: 6.5,
        backgroundColor: '#25282E',

        paddingTop: 20,
        paddingLeft: 40,


        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 30 },
        //shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 100,
    },

    descriptionHeader: {
        fontFamily: 'Exo_700Bold',
        color: 'white',
        fontSize: getFontSize(20),

        paddingTop: 20


    },

   

    description: {
        fontFamily: 'Exo_400Regular',
        color: 'white',
        fontSize: getFontSize(17),

        textAlign: 'justify',

        paddingTop: 10,
        paddingRight: 50
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,

        paddingRight: 50


    },

    statsHeader: {
        fontFamily: 'Exo_700Bold',
        color: 'white',
        fontSize: getFontSize(20),

        paddingTop: 20


    },

    stats: {
        fontFamily: 'Exo_600SemiBold',
        color: 'white',
        fontSize: getFontSize(17),

        

    },

    statsContent: {
        fontFamily: 'Exo_400Regular',
        color: 'white',
        fontSize: getFontSize(17),

 
    },


    
})