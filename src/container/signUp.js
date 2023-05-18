import {
  globalStyleheet,
  Text,
  View,
  Alert,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import {globalStyle} from '../helper/styles';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);

  const __doSignUp = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      setValid(false);
      return;
    } else if (!__isValidEmail(email)) {
      setError('Invalid Email');
      setValid(false);
      return;
    }
    __doCreateUser(email, password);
  };

  const __isValidEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response && response.user) {
        Alert.alert('Success ✅', 'Account created successfully', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('signIn')},
        ]);
      }
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      }

      if (e.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      }
    }
  };
  return (
    <SafeAreaView style={globalStyle.containerStyle}>
      <View style={{flex: 0.2}}>
        {!!fetching && <ActivityIndicator color={'blue'} />}
      </View>
      <View style={globalStyle.headerContainerStyle}>
        <Text style={globalStyle.headerTitleStyle}> Sign Up </Text>
      </View>
      <View style={globalStyle.formContainerStyle}>
        <TextInput
          label={'Email'}
          autoCapitalize={false}
          keyboardType="email-address"
          style={globalStyle.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            setError;
            setEmail(text);
          }}
          error={isValid}
        />

        <TextInput
          label={'Password'}
          secureTextEntry
          autoCapitalize={false}
          style={globalStyle.textInputStyle}
          selectionColor={'blue'}
          placeholder="Password"
          error={isValid}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {error ? (
        <View style={globalStyle.errorLabelContainerStyle}>
          <Text style={globalStyle.errorTextStyle}>{error}</Text>
        </View>
      ) : null}
      <View style={globalStyle.signInButtonContainerStyle}>
        <TouchableHighlight
          style={globalStyle.signInButtonStyle}
          onPress={__doSignUp}
          underlayColor={'blue'}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text style={globalStyle.signInButtonTextStyle}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={globalStyle.loginButtonContainerStyle}>
        <TouchableOpacity
          style={globalStyle.loginButtonStyle}
          onPress={() => navigation.navigate('signIn')}>
          <Text style={globalStyle.loginButtonTextStyle}>
            {' '}
            {'Already have account? Log In'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
