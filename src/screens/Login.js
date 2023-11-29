import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';

import auth from '@react-native-firebase/auth';
// import Style from './Style.js';

export default function Login({navigation}) {
  const [Username, OnChangeEmail] = useState('Email');
  const [Password, OnchangePassword] = useState('Password');

  const SubmitLogin = () => {
    auth()
      .signInWithEmailAndPassword(Username, Password.trim())
      .then(() => {
        console.log('User logged in!');
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') {
          Alert.alert('Login Error', 'Email invalid');
        } else if (err.code === 'auth/user-disabled') {
          Alert.alert('Login Error', 'User disabled');
        } else if (err.code === 'auth/user-not-found') {
          Alert.alert(
            'Login Error',
            'User tidak ditemukan. Silahkan register terlebih dahulu.',
          );
        } else if (err.code === 'auth/wrong-password') {
          Alert.alert('Login Error', 'Password salah');
        }
      });
  };

  return (
    <View style={styles.Container}>
      <Image source={require('../pig.png')} />
      <Text style={styles.Text1}>Smart</Text>
      <Text style={styles.Text2}>Banknotes</Text>
      <Text style={styles.Text3}>Please save your money!</Text>
      <TextInput
        style={styles.Username}
        placeholder="Email"
        placeholderTextColor="black"
        onChangeText={text => OnChangeEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.password}
        placeholder="Password"
        placeholderTextColor="black"
        onChangeText={text => OnchangePassword(text)}
        secureTextEntry={true}
      />
      <TouchableHighlight style={styles.login} onPress={SubmitLogin}>
        <Text style={styles.Text4}>SIGN IN</Text>
      </TouchableHighlight>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={styles.Register}>Don't have an account?</Text>
        <TouchableHighlight
          style={styles.Tombol1}
          onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.Register, {color: 'red'}]}> SIGN UP</Text>
        </TouchableHighlight>
      </View>
      <Image
        source={require('../pig2.png')}
        style={{
          width: 200,
          height: 270,
          resizeMode: 'contain',
          marginLeft: 235,
          marginTop: 25,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#1d2b3a',
  },
  Text1: {
    marginTop: -130,
    fontFamily: 'cursive',
    fontSize: 75,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  Text2: {
    fontFamily: 'cursive',
    fontSize: 75,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  Text3: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A2FF86',
    textAlign: 'center',
  },
  Text4: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  Username: {
    color: 'black',
    backgroundColor: 'white',
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 15,
    borderRadius: 50,
    fontFamily: 'FasterOne-Regular',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  password: {
    color: 'black',
    backgroundColor: 'white',
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 50,
    borderRadius: 50,
    fontFamily: 'FasterOne-Regular',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 13,
  },
  login: {
    backgroundColor: '#A2FF86',
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 50,
    justifyContent: 'center',
  },
  Register: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  Tombol1: {
    width: 75,
    height: 20,
    backgroundColor: '#1d2b3a',
    marginTop: -1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
