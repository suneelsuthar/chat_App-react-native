import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';

export default class About extends React.Component {
    documentPicker = async () => {
        let result = await DocumentPicker.getDocumentAsync();
        console.log("Docunemtm", result)
    }


    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Open Document Picker"
                    onPress={this.documentPicker}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(66, 103, 178)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
});