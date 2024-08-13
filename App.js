//import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Geolocation from '@react-native-community/geolocation';
//import {PermissionsAndroid} from 'react-native';
import CompassHeading from 'react-native-compass-heading';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from 'react-native';

import Compass from './Compass'

// request permission to use geolocation

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Access Required",
        message: "This app needs to access your location.",
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}



const App = () => {

 const [location, setLocation] = useState(false);
 const latitude = useRef()
 const longitude = useRef()
 const [direction, setDirection] = useState();

 // get user location

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
      //console.log(position);
      setLocation(position)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );


  }, []);


if (location)
{
latitude.current = location.coords.latitude
}
if (location) {
longitude.current = location.coords.longitude
}

//message if no gps data available
const renderError = () => {
        if (location == false) {
            return (
                <Text>GPS data is not available</Text>
            )
        }

    }

//console.log(latitude.current)
//console.log(longitude.current)

useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      //console.log('CompassHeading: ', heading, accuracy);
      setDirection(heading)
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);


  return (
    <View style={styles.container}>
    {renderError()}

      <Text style={styles.text}>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text style={styles.text}>Longitude: {location ? location.coords.longitude : null}</Text>
      <Text style={styles.text}>Altitude: {location ? location.coords.altitude : null}</Text>
      <Text style={styles.text}>Accuracy: {location ? location.coords.accuracy : null}</Text>
     <Compass
               direction={direction}

             />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 15,

  },
  text: {
      fontSize: 25,
      fontWeight: 'bold',
    },
});



export default App;