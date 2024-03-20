import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnimationScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Display "Contact Added" for 1 second and then navigate to another screen
    const timer = setTimeout(() => {
      navigation.navigate('List'); 
    }, 2000);

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20}}>Contact Added</Text>
      <Text style={{fontSize:30}}>Successfully</Text>
      <Image source={require('./src/img/success.gif')} style={{width:"90%", height:"70%"}}/>
    </View>
  );
};

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default AnimationScreen;
