import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import contacts from './data';

const EditContactScreen = ({ route, navigation }) => {
  const { contact, index } = route.params;

  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [Lnumber, setLNumber] = useState(contact.number);
  const [image, setImage] = useState(contact.image);

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

    if (!result.cancelled) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
    }
  };

  const handleSaveContact = () => {
    if (!name || !number || !Lnumber) {
      alert('Please fill in all fields');
      return;
    }
    // Check if number and Lnumber contain only numbers
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(number) || !numberRegex.test(Lnumber)) {
        alert('Please enter valid Numbers and Landline Number');
        return;
    }   
    const updatedContact = {
      ...contact,
      name,
      number,
      Lnumber,
      image,
    };
    // Update the contact in the 'contacts' array
    contacts[index] = updatedContact;

    // Navigate back to the "ContactListScreen"
    // navigation.goBack();
    navigation.navigate('List');
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
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        style={styles.name}
      />
      <TextInput
        value={number}
        onChangeText={setNumber}
        keyboardType='numeric'
        maxLength={10}
        placeholder="Enter number"
        style={styles.number}
      />
      <TextInput
        value={Lnumber}
        onChangeText={setLNumber}
        keyboardType='numeric'
        maxLength={10}
        placeholder="Enter landline number"
        style={styles.number}
      />
      <TouchableOpacity onPress={handleSaveContact} style={styles.saveBtn}>
        <Text style={{ color: 'white' }}>Update</Text>
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
    height: 50,
    width: "50%",
    backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10
  },

});

export default EditContactScreen;
