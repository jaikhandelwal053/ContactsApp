import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import contacts from './data';

const AddContactScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [Lnumber, setLNumber] = useState('');
    const [image, setImage] = useState(null);

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Use the first asset from the assets array
            const selectedAsset = result.assets[0];
            setImage(selectedAsset.uri);
        }
    };

    const handleSaveContact = () => {
        if (!name || !number || !Lnumber ) {
            alert('Please fill in all fields');
            return;
        }
        // Check if number and Lnumber contain only numbers
        const numberRegex = /^[0-9]+$/;
        if (!numberRegex.test(number) || !numberRegex.test(Lnumber)) {
            alert('Please enter valid Numbers and Landline Number');
            return;
        }

        const lowercaseName = name.toLowerCase();
        // Check if the name already exists in the contact list (case-insensitive)
        const existingContact = contacts.find(contact => contact.name.toLowerCase() === lowercaseName);
        if (existingContact) {
            alert('A contact with the same name already exists');
            return;
        }
        const newContact = {
            name,
            number,
            Lnumber,
            image,
        };

        contacts.push(newContact);
        // console.log("contact from add screen :", newContact)
        navigation.navigate('ani');
        
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleImagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 180, height: 180, borderRadius: 90 }} />
                ) : (
                    <Image
                        source={require('./img/default.jpg')}
                        style={{ width: 180, height: 180, borderRadius: 90 }}
                    />
                )}
            </TouchableOpacity>
            <TextInput
                require={true}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                style={styles.name}
            />
            <TextInput
                require={true}
                value={number}
                keyboardType='numeric'
                maxLength={10}
                onChangeText={setNumber}
                placeholder="Enter number"
                style={styles.number}
            />
            <TextInput
                require={true}
                value={Lnumber}
                keyboardType='numeric'
                maxLength={10}
                onChangeText={setLNumber}
                placeholder="Enter landline number"
                style={styles.number}
            />
            <TouchableOpacity onPress={handleSaveContact} style={styles.saveBtn}>
                <Text style={{ color: 'white' }}>Save Contact</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: 60
    },
    name: {
        height: 50,
        width: '70%',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 6,
        marginTop: 60,
        paddingHorizontal: 8,
    },
    number: {
        height: 50,
        width: '70%',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 6,
        marginTop: 6,
        paddingHorizontal: 8,
    },
    saveBtn: {
        // position:'absolute',
        height: 50,
        width: "50%",
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center',
        // top:"70%",
        marginTop: 30,
        borderRadius:10

    },

});

export default AddContactScreen;
