import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, ScrollView } from 'react-native'
import { launchCamera } from 'react-native-image-picker';
import RNTextDetector from "rn-text-detector";
import fs from "react-native-fs"
import { Button } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Ionicons';

const Test2 = () => {

    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false)

    const fileFromUri = (uri) => {
        const uriComponent = uri.split("/")
        const fileName = uriComponent.slice(4).join("/")
        const dest = `${fs.TemporaryDirectoryPath}/${fileName}`
        return "file://" + dest
    }

    const openCamera = async () => {
        const options = { mediaType: 'photo', quality: 1 }
        launchCamera(options, async (res) => {
            try {
                const newUri = fileFromUri(res.uri)
                setLoading(true)
                const extract = await RNTextDetector.detectFromUri(newUri)
                setContent(extract)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        })
    }

    return (
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Appuyez sur le bouton pour ouvrir la camera et prendre une photo</Text>
            <View style={{ display: "flex", alignItems: 'center' }}>
                <View style={{ marginTop: 20, width: 200 }}>
                    <Button raised primary text="Open camera" icon={'camera'} onPress={openCamera} />
                </View>
            </View>
            {loading && <ActivityIndicator size="large" color="#14214A" />}
            <ScrollView>
                
                <View>
                    {content &&
                        content.map((e, i) => <Text key={i}>{e.text}</Text>)
                    }
                </View>
            </ScrollView>
        </View>
    )
}
//<ion-icon name="camera-outline"></ion-icon>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
})

export default Test2