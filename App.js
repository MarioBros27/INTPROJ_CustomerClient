import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,Image, ImageBackground } from 'react-native';
import logo from './assets/logo.png'
import background from './assets/backgroundFood.jpeg'
export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <ImageBackground source={background} resizeMode="cover" style={styles.image}>

    <View style={styles.container}>
      <Image style={styles.stretch} source={logo}/>
      
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttonLogIn}>
        <Button
          onPress={() => { }}
          title="Log In"
          color="#fc6c27"
          accessibilityLabel="Log In"
        />
      </View>
      <View style={styles.buttonCreate}>
        <Button
          onPress={() => { }}
          title="Crear cuenta"
          color="#000"
          accessibilityLabel="Crear cuenta"
        />
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    marginBottom: "20%",
    fontFamily: "Menlo",
    fontSize: 200
  },
  stretch: {
    marginTop: '20%',
    marginBottom: '20%',
    width: 200,
    height: 200,
    resizeMode: 'contain'
},
  buttonLogIn: {
    width: "60%",
    marginTop: 40
  },
  buttonCreate: {
    width: "60%",
    marginTop: 20
  },
  input: {
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
