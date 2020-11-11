import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//bring in all screens
import Home from "./screens/Home";
import Add from "./screens/Add";
import Edit from "./screens/Edit";
import { create } from 'react-test-renderer';

const Stack = createStackNavigator();

const App = () =>  {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar  backgroundColor="#0f4c75" />
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">

              <Stack.Screen
                name="Home"
                component={Add}
                options={{
                  headerStyle:{
                    backgroundColor:"#0f4c75"
                  },
                  title: 'Netflix Wishlist',
                  // headerTitleStyle:{
                  //   textAlign:'center',
                  //   color:'#fff'
                  // },
                  headerTintColor: '#00b7c2',
                  headerTitleAlign:'center'
                }}
              >
              </Stack.Screen>

              <Stack.Screen
                name="Add"
                component={Add}
                options={{
                  headerStyle:{
                    backgroundColor:"#0f4c75"
                  },
                  title: 'Netflix Wishlist',
                  // headerTitleStyle:{
                  //   textAlign:'center',
                  //   color:'#fff'
                  // },
                  headerTintColor: '#00b7c2',
                  headerTitleAlign:'center'
                }}
              >
              </Stack.Screen>

              <Stack.Screen
                name="Edit"
                component={Edit}
                options={{
                  headerStyle:{
                    backgroundColor:"#0f4c75"
                  },
                  title: 'Netflix Wishlist',
                  // headerTitleStyle:{
                  //   textAlign:'center',
                  //   color:'#fff'
                  // },
                  headerTintColor: '#00b7c2',
                  headerTitleAlign:'center'
                }}
              >
              </Stack.Screen>

          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
