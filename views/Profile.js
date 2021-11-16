import React from 'react';
import { StyleSheet, View, Text, Button,Alert } from 'react-native';
import { AuthContext } from '../context'
import { QRCode } from 'react-native-custom-qr-codes-expo';


export default function Profile({ navigation,user }) {
    const [postgresId, setPostgresId] = React.useState(user.postgresId)
    const { logOut } = React.useContext(AuthContext);
    const logOutAlert = ()=>{
        Alert.alert('', '¿De verdad quieres salir?', [
            { text: 'Aceptar', onPress: () => logOut()},
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            
          ]);
    }
    
    return (

        <View style={styles.container}>

            <Text style={styles.title}>{user.username}</Text>
            
            <QRCode codeStyle='square' content={user.postgresId} />
            <View style={styles.buttonContainer}>
            </View>
            <View style={styles.buttonContainer}>
            <Button
                onPress={() => {  logOutAlert()}}
                title="Cerrar sesión"
                color="red"
                accessibilityLabel="Cerrar sesión"
            />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        padding: 20
    },
    buttonContainer:{
        marginTop:40 
    },
    title: {
        fontSize: 34,
        marginBottom: 8,
        fontWeight: "bold"
    }
});
