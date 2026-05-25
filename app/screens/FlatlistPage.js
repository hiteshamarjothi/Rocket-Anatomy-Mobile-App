
import React, {useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBarStyle, Dimensions, PixelRatio, Image, TextInput, TouchableOpacity, ScrollView, Animated, Keyboard, FlatList } from 'react-native';
import { StatusBar, setStatusBarTranslucent, setStatusBarHidden } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts, Exo_400Regular, Exo_600SemiBold, Exo_100Thin } from '@expo-google-fonts/exo';
import { LinearGradient } from 'expo-linear-gradient';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStaticNavigation, useNavigation,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';





const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
const { width, height } = Dimensions.get('window');





  const RocketItem = ({ item, isSaved, handleSaveItem, navigation, color  }) => {
    return (
        <TouchableOpacity style={[styles.itemContainer, { backgroundColor: color }]} onPress={() => navigation.navigate(item.screen)}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>4 Sections | Click to Explore</Text>
            </View>
            <Image source={item.image} style={styles.image} />
            <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleSaveItem(item)}>
                <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={30} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


const rocketItems = [
        
    { title: 'Falcon 9', name: 'Falcon 9', key: '1', image: require('../assets/flacon9Crop.png'), screen: 'Falcon9Main', color: '#6096B4' },
    { title: 'Artemis SLS', name: 'Artemis SLS', key: '2', color: '#EF9C66',image: require('../assets/ArtemisSLSCrop.png'), screen: 'Artemis1Main', },
    { title: 'Falcon Heavy', name: 'Falcon Heavy', key: '3', color: '#73A9AD',image: require('../assets/FalconHeavyCrop.png'), screen: 'FalconHeavyMain' },
    { title: 'Starship', name: 'Coming Soon...', key: '4', color: '#537188' },
    { title: 'Saturn V', name: 'Coming Soon...', key: '5', color: '#D37676' },
    { title: 'New Shepard', name: 'Coming Soon...', key: '6', color: '#7C96AB' },
    { title: 'Space Shuttle', name: 'Coming Soon...', key: '7', color: '#EF9C66' },

];
  




//>>THE MAIN FUNCTION FOR RENDERING THE HOME SCREEN

function FlatListPage(props) {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState(''); 
    const [data, setData] = useState(rocketItems); 
    const [savedItems, setSavedItems] = useState([]); //Variable for the saved items. setSavedItems updates the state
    const [isSaved, setIsSaved] = useState(false);


    const handleSaveItem = async (item) => {
        let newSavedItems = [];
        const itemIndex = savedItems.findIndex(savedItem => savedItem.name === item.name);
    
        if (itemIndex !== -1) { // Item is already saved
            // Remove the item from the saved items
            newSavedItems = savedItems.filter((_, index) => index !== itemIndex);
        } else { // Item is not saved
            // Add the item to the saved items
            newSavedItems = [...savedItems, item];
        }
    
        setSavedItems(newSavedItems);
        await AsyncStorage.setItem('favoriteRockets', JSON.stringify(newSavedItems));
    };
      



      useEffect(() => {
        const loadFavoriteRockets = async () => {
          const savedItemsString = await AsyncStorage.getItem('favoriteRockets');
          if (savedItemsString) {
            setSavedItems(JSON.parse(savedItemsString));
          }
        };
      
        loadFavoriteRockets();
      }, []);
      

      const [isFilterActive, setIsFilterActive] = useState(false);

      const handleFilterPress = () => {
        setIsFilterActive(!isFilterActive); // Toggle the filter
    
        if (!isFilterActive) {
            // If the filter is being activated, show only the saved items
            setData(savedItems);
        } else {
            // If the filter is being deactivated, show all items
            setData(rocketItems);
        }
    };
      
      


    const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 0

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }).start();
      };


      const handleSearch = () => {
        if (searchQuery === '') {
          setData(isFilterActive ? savedItems : rocketItems);
        } else {
          const filteredData = rocketItems.filter(item => 
            item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
          setData(isFilterActive ? filteredData.filter(item => savedItems.includes(item)) : filteredData);
        }
        fadeIn();
      };

      const [isFocused, setIsFocused] = useState(false);
      const inputRef = useRef(null); // create a ref

      const handleClearSearch = () => {
        setSearchQuery('');
        setData(isFilterActive ? savedItems : rocketItems);
        setIsFocused(false); // exit from searching
        inputRef.current.blur(); // remove focus
    };


   





    return (
        <View  style={{...styles.container}}>

            <StatusBar/>

           

            <View style={styles.header}>
                <View style={styles.welcomeText}>
                    <Text style={styles.hello}>Rocketry Anatomy</Text>
                </View>
            </View>


            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>

                        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                            <Ionicons name="search-outline" size={25} color="black" />
                        </TouchableOpacity>

                        <View style={styles.searchBar}>

                            <TextInput 
                                style={styles.searchInput}
                                placeholder="Search Rockets..."
                                placeholderTextColor={'black'}
                                color='black'
                                ref={inputRef} // attach the ref

                                value={searchQuery}
                                onChangeText={query => {
                                    setSearchQuery(query);
                                    handleSearch();
                                }}

                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                
                            />

                            {isFocused && (
                                <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
                                    <MaterialIcons name="clear" size={24} color='black' />
                                </TouchableOpacity>
                            )}


                        </View>

                        

                </View>


                <View style={styles.searchFilters}>
                    <TouchableOpacity style={[styles.saveFilter, isFilterActive ? {backgroundColor: '#25282E'} : {}]} onPress={handleFilterPress} activeOpacity={100} >
                        <Ionicons name={isFilterActive ? "bookmark" : "bookmark-outline"} size={20} color={isFilterActive ? 'white' : 'black'} />
                        <Text style={[styles.savedText, isFilterActive ? {color: 'white'} : {}]}>Saved</Text>
                        
                        
                    </TouchableOpacity>
                    <View style={styles.whiteSpace}/>
                </View>


                </View>



            <View style={styles.main}>
                <View style={styles.mainContent}>
                <FlatList
                    data={data} // Use the data state here
                    renderItem={({ item }) => (
                        <RocketItem
                            item={item}
                            isSaved={savedItems.some(savedItem => savedItem.name === item.name)}
                            handleSaveItem={handleSaveItem}
                            navigation={navigation}
                            color={item.color} // Pass the color property
                        />
                )}
                keyExtractor={item => item.key}
            />
                </View>

                


            </View>
            
        
        </View>

        
    );

       
}



/*
return (
    <View  style={styles.container}>


    <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <RocketItem
                    item={item}
                    isSaved={savedItems.some(savedItem => savedItem.name === item.name)}
                    handleSaveItem={handleSaveItem}
                    navigation={navigation}
                    color={item.color}
                />
            )}
            keyExtractor={item => item.key}
        />
    </View>

    </View>


);
}
*/


export default FlatListPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 31,
        paddingRight: 30,
    },

    header: {
        flex: 1,
        //backgroundColor: 'tomato',
        //flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    welcomeText: {
        flexDirection: 'row',
        paddingBottom: 20,
        //paddingLeft: 31,
        gap: 7,
        
    },

    hello: {
        fontFamily: 'Exo_400Regular',
        fontSize: getFontSize(35),
        color: 'black',
    },

    name: {
        fontFamily: 'Exo_600SemiBold',
        fontSize: getFontSize(35),
        color: 'white',
    },

    

    searchContainer: {
        flex: 1,
        gap: 15,
        //backgroundColor: 'white',
    },

    searchWrapper: {
        flex: 3,
        //backgroundColor:'tomato',
        flexDirection: 'row',
        //paddingRight: 30,
        //paddingLeft: 31,
        gap: 10,
    },

    searchButton: {
        backgroundColor: "#CDD4DD",
        flex: 3.9,
        borderRadius: 43, //this is just the value of the radius of the circle, the size of the circle
        justifyContent: 'center',
        alignItems: 'center',
    },

    searchBar: {
        flex: 20,
        backgroundColor: '#F1F1F1',
        //fontFamily: 'Exo_400Regular',
        borderRadius: 34,
        //borderWidth: 1,
        borderColor: '#99A3B4',
        //fontSize: getFontSize(15),
        paddingLeft: 30,

        flexDirection: 'row',
        //alignItems: 'center'
        
        
    },

    searchInput: {
        flex: 5,
        fontFamily: 'Exo_400Regular',
        //backgroundColor:'white'
    },

    clearButton: {
        flex: 1,
        //backgroundColor: 'tomato',
        alignSelf: 'center',
    },

    searchFilters:{
        flex: 2,
        //backgroundColor: 'lightgreen',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 10,
        
    },
    
    saveFilter: {
        flexDirection: 'row',
        backgroundColor: '#CDD4DD',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2.5,
        borderRadius: 37,
        gap: 6,       
        
    },

    savedText: {
        fontFamily: 'Exo_400Regular',
        paddingBottom: 2,
        fontSize: getFontSize(15),
    },


    
    //savedNumber: {
        //color: 'white',
        //fontFamily: 'Exo_400Regular',
        //padding: 3,
    //},

    whiteSpace: {
        flex: 7,
        //backgroundColor: 'white'
    },

    main: {
        flex: 6,
        //backgroundColor: 'lightyellow',
    },


    mainContent: {
        flex: 500,
        paddingTop: 15,
        gap: 50
    },


    noItemsMatchYourSearch: {
        color: 'black',
        fontFamily: 'Exo_100Thin',
        alignSelf: 'center'

    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4E72A1',
        borderRadius: 15,
        padding: 10,
        paddingBottom: 0,
        marginBottom: 15,
        position: 'relative',

    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontFamily: 'Exo_600SemiBold',
        fontSize: 20,
    },
    subtitle: {
        color: 'white',
        fontFamily: 'Exo_400Regular',
        fontSize: 12,
    },
    image: {
        width: width * 0.16,
        height: height * 0.13,
        marginRight: 70,
        
    },
    bookmarkButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },


    

    
});





