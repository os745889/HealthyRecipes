import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Image, Text, TextInput, View, Button } from 'react-native';
import {useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

function HomeScreen({ navigation }) {
  const [ServingNumber, setServingNumber] = useState(0);
  const [pressed, setPressed] = useState(false);
  
  const onPress = () => {
    setPressed(true);
  }

  const onChangeText = newText => {
    setPressed(false);
    setServingNumber(parseInt(newText));
  }


  const img = require('./assets/bruschetta.png')

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <View>
      <Text style={styles.top}>Bruschetta Recipe</Text>
      <Image source={img}></Image>
      <TextInput style={styles.textbox} placeholder="Enter the Number of Servings" onChangeText={onChangeText}></TextInput>
      </View>

      <Pressable style={styles.button}
        title="View Recipe"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Recipe', {
            ServingNumber: ServingNumber,
          })
          }
        }>
        <Text style={styles.buttontext}>View Recipe</Text>
        </Pressable>
  
    </View>
  );
}

function RecipeScreen({ route, navigation }) {
  const {ServingNumber} = route.params;
  return (
    <View>
    <Text style={styles.top}>Bruschetta</Text>
    <Text style={styles.text}>Ingredients</Text>
    <Text style={styles.text2}>{ServingNumber * 4} plum tomatoes</Text>
    <Text style={styles.text2}>{ServingNumber * 6} basil leaves</Text>
    <Text style={styles.text2}>{ServingNumber * 3} garlic cloves, chopped</Text>
    <Text style={styles.text2}>{ServingNumber * 3} TB olive oil</Text>
    <Text style ={styles.text}>Directions</Text>
    <Text style ={styles.text2}>Combine the ingredients. add salt to taste. Top French bread slices with mixture</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
        options={{title: 'Healthy Recipes',
        headerStyle: {
          backgroundColor: '#FF6600'
        },
        headerTintColor: '#FFFFFF'}}/>
        <Stack.Screen name="Recipe" component={RecipeScreen} />
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
  top: {
    fontSize: 40,
    marginTop: 50,
    textAlign: 'center'
  },
  text2: {
    fontSize: 25,
    textAlign: 'left',
    paddingLeft: 35
  },
  text: {
    fontSize: 35,
    paddingTop: 20,
    textAlign: 'left',
    paddingLeft: 20
  },
  textbox: {
    fontSize: 25,
    padding: 8,
    marginBottom: 40,
    textAlign: 'center'
  },
  button: {
    alignContent:'center',
    marginBottom: 40,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#808080',
    fontSize: 50
  },
  buttontext: {
    fontSize: 25,
    color: '#FFFFFF'
  }
});