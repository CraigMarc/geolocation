import { useState, useEffect, useRef } from 'react'
import CompassHeading from "react-native-compass-heading";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import compassPic from './images/compassNew.png';

const Compass = (props) => {
    const [heading, setHeading] = useState(0);
    const rotateValue = new Animated.Value(0);

    const {
           direction

        } = props;


    const rotateStyle = {
        transform: [{ rotate: `${-direction}deg` }],
    };

    const getCardinalDirection = () => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(direction / 45) % 8;
        return directions[index];
    };

    return (
        <View style={styles.container}>

            <View style={styles.compassContainer}>
                <Animated.Image
                    source={compassPic}
                    style={[styles.compassImage, rotateStyle]}
                />
            </View>
            <Text style={styles.headingValue}>{`Heading: ${direction
            }°`}</Text>
            <Text
                style={styles.cardinalDirection}
            >{`Direction: ${getCardinalDirection()}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    compassContainer: {
        width: 250,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 125,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    compassImage: {
        width: 200,
        height: 200,
    },
    headingValue: {
        fontSize: 18,
        marginTop: 10,
        color: "#555",
    },
    cardinalDirection: {
        fontSize: 18,
        marginTop: 10,
        color: "#555",
    },
});

export default Compass;