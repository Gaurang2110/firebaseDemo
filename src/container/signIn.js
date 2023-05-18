import { globalStyleheet, Text, View,Alert, SafeAreaView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import auth, { firebase } from "@react-native-firebase/auth"
import { globalStyle } from '../helper/styles';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);

    const __doLogin = () => {
        if (!email) {
          setError("Email required *");
          setValid(false);
          return;
        } else if (!password && password.trim() && password.length > 6) {
          setError("Weak password, minimum 5 chars");
          setValid(false);
          return;
        } else if (!__isValidEmail(email)) {
          setError("Invalid Email");
          setValid(false);
          return;
        }
        let signInRequestData = {
          email,
          password
        };
    
        __doSingIn(email, password);
      };

    const __doSingIn = async (email, password) => {
        try {
          let response = await auth().signInWithEmailAndPassword(email, password)
          if (response && response.user) {
            Alert.alert("Success ✅", "Authenticated successfully",[  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () => navigation.navigate('home')},  
            ] )
          }
        } catch (e) {
          console.error(e.message)
        }
      }

      const __isValidEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };
  return (
    <SafeAreaView style={globalStyle.containerStyle}>
      <View style={{ flex: 0.2 }}>{!!fetching && <ActivityIndicator color={'#FFFFFF'} />}</View>
      <View style={globalStyle.headerContainerStyle}>
        <Text style={globalStyle.headerTitleStyle}> Log In </Text>
      </View>
      <View style={globalStyle.formContainerStyle}>
        <TextInput
          label={"Email"}
          autoCapitalize={false}
          keyboardType="email-address"
          style={globalStyle.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            // let isValid = this.state.isValid;
            // isValid["email"] = !this.__isValidEmail(text);
            setValid(__isValidEmail(text));
            setEmail(text);
          }}
          error={isValid}
        />
        <TextInput label={"Password"} secureTextEntry autoCapitalize={false} style={globalStyle.textInputStyle} selectionColor={'red'} placeholder="Password" error={isValid} onChangeText={text => setPassword(text)} />
      </View>
      {error ? (
        <View style={globalStyle.errorLabelContainerStyle}>
          <Text style={globalStyle.errorTextStyle}>{error}</Text>
        </View>
      ) : null}

      <View style={globalStyle.signInButtonContainerStyle}>
        <TouchableHighlight style={globalStyle.signInButtonStyle} onPress={__doLogin} underlayColor={'blue'}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Text style={globalStyle.signInButtonTextStyle}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>

      <TouchableOpacity style={globalStyle.loginButtonStyle} onPress={() => navigation.navigate('signUp')}>
                <Text style={globalStyle.loginButtonTextStyle}> { "New? Create account."}</Text>
              </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignIn

