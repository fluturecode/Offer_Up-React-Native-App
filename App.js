import * as ImagePicker from "expo-image-picker"
import React, { useEffect, useState } from "react"
import { Button, Image } from "react-native"
import ImageInput from "./app/components/ImageInput"
import Screen from "./app/components/Screen"

export default function App() {
	const [imageUri, setImageUri] = useState()
	const requestPermission = async () => {
		const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
		if (!granted) alert("You need to enable permissions to access.")
	}

	useEffect(() => {
		requestPermission()
	}, [])

	const selectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync()
			if (!result.cancelled) setImageUri(result.uri)
		} catch (error) {
			console.log("Error reading image", error)
		}
	}

	return (
		<Screen>
			<Button title='Select Image' onPress={selectImage} />
			<Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
			<ImageInput imageUri={imageUri} />
		</Screen>
	)
}
