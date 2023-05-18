import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from '../container/signUp';
import auth, { firebase } from "@react-native-firebase/auth"
import SignIn from '../container/signIn';
import Home from '../container/home';
const Stack = createStackNavigator();

const Routes = () => {
    const [isLogin, setisLogin] = useState(false);
    const [authenticated, setauthenticated] = useState(false);
  
    useEffect(() => {
      __isTheUserAuthenticated()
    
      
    }, [])
  
   const  __isTheUserAuthenticated = () => {
      let user = firebase.auth().currentUser;
      if (user) {
        console.log( user);
  
       setauthenticated(true)
      } else {
     setauthenticated(false)
      }
    };
  return (
   <NavigationContainer>
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={authenticated ? 'home' : 'signIn'}>
   <Stack.Screen name='signUp' component={SignUp} />
   <Stack.Screen name='signIn' component={SignIn} />
   <Stack.Screen name='home' component={Home} />
   </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})