import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';

import { Icon } from 'native-base'

export default class CameraExample extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        value: true
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO_RECORDING);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo)
        }
    };
    stopRecording = async () => {
        if (this.camera) {
            this.setState({ value: true })
            let stopRec = await this.camera.stopRecording();
            console.log(stopRec);
        }
    };
    recordAsync = async () => {
        if (this.camera) {
            this.setState({ value: false })
            let Rec = await this.camera.recordAsync();
            console.log(Rec)
        }
    };
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera

                        onBarCodeScanned={(code) => {
                            console.log("Barcode==>", code)
                        }}
                        ref={(ref) => {
                            this.camera = ref
                        }}
                        style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>


                            {this.state.value ?
                                <View style={{ flex: 1, alignSelf: 'flex-end', flexWrap: 'wrap', flexDirection: 'row', marginLeft: '25%' }}>
                                    <TouchableOpacity onPress={() => this.snap()}>
                                        {/* <Image source={require('../Images/camera.png')} /> */}
                                        <Text style={{ fontSize: 32, color: 'white' }}>Take Picture</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.recordAsync()}>
                                        {/* <Image source={require('../Images/rec.png')} /> */}
                                        <Text style={{ fontSize: 32, color: 'white' }}>Start Recording</Text>
                                    </TouchableOpacity>
                                </View> :
                                <View style={{ flex: 1, alignSelf: 'flex-end', flexWrap: 'wrap', flexDirection: 'row', marginLeft: '25%' }}>
                                    <TouchableOpacity onPress={() => this.snap()}>
                                        {/* <Image source={require('../Images/camera.png')} /> */}
                                        <Text style={{ fontSize: 32, color: 'white' }}>Take Picture</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.stopRecording()}>
                                    {/* <Image source={require('../Images/stopRec.png')} /> */}
                                    <Text style={{ fontSize: 32, color: 'white' }}>Stop Recording</Text>
                                </TouchableOpacity>
                                </View>
                            }
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    marginRight:'10%'
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    });
                                }}>
                                {/* <Image source={require('../Images/flip1.png')} /> */}
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}