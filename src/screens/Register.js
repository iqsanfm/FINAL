import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function Register({navigation}) {
  const [Email, OnChangeEmail] = useState('Email');
  const [IDBankNotes, OnChangeIDBankNotes] = useState('ID BankNotes');
  const [Password, OnchangePassword] = useState('Password');
  const [ConfirmPassword, OnchangeConfirmPassword] =
    useState('Confirm Password');

  const SignUp = () => {
    if (Password.trim() === ConfirmPassword.trim()) {
      auth()
        .createUserWithEmailAndPassword(Email, Password.trim())
        .then(response => {
          console.log('User terdaftar!');
          const uid = response.user.uid;
          database()
            .ref(`users/${uid}`)
            .set({
              IDBankNotes,
            })
            .then(() => {
              console.log('ID BankNotes ditambahkan ke firestore!');
            })
            .catch(console.error);
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            Alert.alert('Error Sign Up', 'Email sudah terdaftar sebelumnya');
          } else if (err.code === 'auth/invalid-email') {
            Alert.alert('Error Sign Up', 'Email tidak valid');
          } else if (err.code === 'auth/weak-password') {
            Alert.alert('Error Sign Up', 'Password belum kuat.');
          }
        });
    } else {
      Alert.alert('Error Sign Up', 'Password tidak sama.');
    }
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.Text1}>Create Account</Text>
      <TextInput
        style={styles.Username}
        placeholder="Email"
        placeholderTextColor="black"
        onChangeText={text => OnChangeEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.Code}
        placeholder="ID Banknotes"
        placeholderTextColor="black"
        onChangeText={text => OnChangeIDBankNotes(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.password}
        placeholder="Password"
        placeholderTextColor="black"
        onChangeText={text => OnchangePassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.password}
        placeholder="Confirm Password"
        placeholderTextColor="black"
        onChangeText={text => OnchangeConfirmPassword(text)}
        secureTextEntry={true}
      />
      <TouchableHighlight style={styles.login} onPress={SignUp}>
        <Text style={styles.Text3}>Register</Text>
      </TouchableHighlight>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={styles.Register}>Already have an account?</Text>
        <TouchableHighlight
          style={styles.Tombol1}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.Register, {color: '#FF0000'}]}> SIGN IN</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#1d2b3a',
  },
  TextRegister: {
    marginTop: 50,
    marginLeft: 30,
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: 'white',
  },
  Text1: {
    marginTop: 100,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    fontSize: 90,
    color: 'black',
    textAlign: 'center',
    color: 'white',
  },
  Text3: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  Username: {
    color: 'black',
    backgroundColor: 'white',
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginTop: 75,
    marginBottom: 15,
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
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
    marginBottom: 15,
    borderRadius: 50,
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 13,
  },
  Code: {
    color: 'black',
    backgroundColor: 'white',
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  login: {
    backgroundColor: '#A2FF86',
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
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
