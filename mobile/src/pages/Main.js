import React, {useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main( {navigation} ) {

    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');


    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect ( () => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();
            if(granted){
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const {latitude, longitude } = location.coords;
                // console.log(location)
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        };
        loadInitialPosition();
    }, [])

    if(!currentRegion){
        return null;
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }
    async function loadDevs () {
        const { latitude, longitude } = currentRegion;
        
        let response;

        if(techs){
            response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    techs
                }
            })
            setDevs(response.data.devs);
        } else {
            response = await api.get('/devs')
            setDevs(response.data);
        }

        setTechs('')
        
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={ styles.map}>
               {devs.map(dev => (
                 <Marker key={dev._id} coordinate={ {
                     latitude: dev.location.coordinates[1], longitude:dev.location.coordinates[0]
                     }}>
                 <Image style={styles.avatar} source= { {uri: dev.avatar_url } }></Image>
                 <Callout onPress={ () => {
                     //navigation
                     navigation.navigate('Profile', {githubUsername: dev.github_username})
                 }}>
                     <View style={styles.callout}>
                         <Text style={styles.devName}>{dev.name}</Text>
                         <Text style={styles.devBio}>{dev.bio}</Text>
                         <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                     </View>
                 </Callout>
                </Marker>   
               ))}
            </MapView>

            <View style={styles.searchForm}>
                    <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar DEVS por tecnologia"
                    placeholderTextColor='#999'
                    autoCapitalize="words"
                    autoCorrect={false} 
                    value={techs}
                    onChangeText={setTechs}
                    ></TextInput>
                    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                        <MaterialIcons name="my-location" size={20} color="#fff"></MaterialIcons>
                    </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create ({
    map: {
        flex:1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260
    },
    devName:{
        fontWeight: "bold",
        fontSize: 16,        
    },
    devBio: {
        color: "#666",
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height:50,
        backgroundColor:"#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal:20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 5,

    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor:"#8e42ff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
    }
})

export default Main;