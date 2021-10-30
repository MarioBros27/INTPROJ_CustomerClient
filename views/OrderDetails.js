import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function OrderDetails({ navigation, route, user }) {
    const { order } = route.params;

    const [ subtotal, setSubtotal] = useState(0)

    useEffect(() => {
      total = 0;

      order.Items.forEach(item => {
        total = total + (item.price * item.ItemBill.quantity)
      })

      setSubtotal(total)
    }, [])

    const createPaymentIntent = () => {
      axios.put(`${appSettings['backend-host']}/bills/${order.id}/calculateTotal`)
        .then(_ => {
          axios.post(`${appSettings['backend-host']}/processPayment?billId=${order.id}&restaurantId=${order.restaurantId}`)
            .then(response => {
              navigation.navigate("PagoOrden", {
                clientSecret: response.data.client_secret,
                order: order,
                total: subtotal + order.tip
              })
            })
            .catch(_ => alert('No fue posible generar el intento de pago'))
        })
        .catch(_ => alert(`No fue posible procesar el total de la orden.`))

      
    }

    const renderItem = ({ item }) => {
      return (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>Precio: {item.price}</Text>
          <Text style={styles.subtitle}>Cantidad: {item.ItemBill.quantity}</Text>
        </View>
      )
    }; 

    return (
        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>Fecha y hora de apertura: {`${order.checkIn.slice(8,10)}/${order.checkIn.slice(5,7)}/${order.checkIn.slice(0,4)} ${order.checkIn.slice(11,16)}`}</Text>
          <Text style={styles.subtitle}>Propina: {order.tip}</Text> 
          <Text style={styles.subtitle}>Mesa: {order.tableNumber}</Text>
          <Text style={styles.subtitle}>Subtotal: {subtotal}</Text>
          <Text style={styles.subtitle}>Total: { subtotal + order.tip}</Text>
          <FlatList
            data={order.Items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.buttonContainer}>
            { (order.Restaurant.accountId != "" && order.Restaurant.accountId != null) &&
              <Button
                  onPress={() => {
                    createPaymentIntent()
                  }}
                  title="Proceder al pago"
                  color="blue"
                  accessibilityLabel="DetallesOrdenes"
              />
            }
            { (order.Restaurant.accountId == "" || order.Restaurant.accountId == null) &&
              <Text>El restaurante no tiene opción de pago a través de la app</Text>
            } 
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold",
        marginLeft: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        // marginTop: 20,
        fontWeight: "bold",
        // textAlign: "center"
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 2,
        // textAlign: "center"
    }
});