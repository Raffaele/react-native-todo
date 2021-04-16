import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import { Link } from '@react-navigation/native';

export function StopDetails({stopInfo}) {
    function showPressInfo() {
        console.log(stopInfo);
        console.log(stopInfo.id);
    }
    return <TouchableNativeFeedback onPress={showPressInfo}>
        {/* <Link to={`/asdf/${stopInfo.id}`}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.stopName}>{stopInfo.commonName}</Text>
                    <Text>{stopInfo.stopLetter}</Text>
                </View>
                <View>
                    <Text>{stopInfo.lines.map(line => line.name).join(' ')}</Text>
                </View>
            </View>
        </Link> */}
        <View style={styles.container}>
            <View>
                <Text style={styles.stopName}>{stopInfo.commonName}</Text>
                <Text>{stopInfo.stopLetter}</Text>
            </View>
            <View>
                <Text>{stopInfo.lines.map(line => line.name).join(' ')}</Text>
            </View>
        </View>
    </TouchableNativeFeedback>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightcyan',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
        width: '90%',
        marginBottom: 2,
    },
    stopName: {
        padding: 5,
        marginBottom: 10,
        borderBottomColor: 'yellow'
    },
    stopLabel: {},
});