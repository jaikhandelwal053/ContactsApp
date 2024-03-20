import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddContactScreen from './src/addContact';
import EditContactScreen from './src/updateContact';
import AnimationScreen from './animAdd';
import Routes from './src/Navigation/Routes';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={Routes}
          options={{
            title: 'Contact List',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },

          }} />
        <Stack.Screen name="Add" component={AddContactScreen} options={{
          title: 'Add new contact',
          headerStyle: {
            backgroundColor: 'lightgreen',
          },
        }} />
        <Stack.Screen name="Update" component={EditContactScreen} options={{
          title: 'update conatct',
          headerStyle: {
            backgroundColor: 'lightgreen',
          },
        }} />
        <Stack.Screen name="ani" component={AnimationScreen} options={{
          title: 'Animation',
          headerShown: false
        }} />
      </Stack.Navigator>

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
