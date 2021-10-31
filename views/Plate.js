import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function Plate({ navigation, route }){
    const { order } = route.params;
    const [plates, setPlates] = useState([])
    const [flag, setFlag] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/restaurants/${order.restaurantId}/items`)
            .then(response => {
                setPlates(response.data)
            })
            .catch(error => alert(error))
        },
        
    [])
    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/bills/${order.id}`)
        .then(response => {
            setOrderItems(response.data.Items)
        })
        .catch(error => alert(error))
    },[flag])
    
    const addToOrder = (itemId) => {
        const orderItemsIds = orderItems.map((orderItem) => {
            return orderItem.id;
        })
        if(orderItemsIds.includes(itemId)){
            const importantPlate = orderItems.find((item) => {
                return item.id == itemId
            })
            axios.put(`${appSettings['backend-host']}/bills/${order.id}/updateItem/${itemId}`,{
                quantity: importantPlate.ItemBill.quantity + 1,
                status:"pendiente"
            })
            .then(response =>{
                setFlag(!flag)
                alert("Producto actualizado")
            })
            .catch(error => alert("No se pudo actualizar el producto"))
        }else{
            axios.post(`${appSettings['backend-host']}/bills/${order.id}/addItems`,{
                "items":[{
                    id:itemId,
                    quantity:1,
                    status:"pendiente"
                }
                ]              
            })
                .then(response =>{
                    setFlag(!flag)
                    alert("Producto agregado a la orden")
                })
                .catch(error => alert("No se pudo agregar el producto"))
        }
        
    }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.nameRestaurante}>
          {order.Restaurant.name}
        </Text>
      </View>
      
        <FlatList 
          style={styles.menuList}
          data={plates}
          renderItem={({ item }) => (
            <View
              style={styles.itemRow}
            >
              <View style={styles.list}>
                <Text style={styles.plateName}>{item.name}</Text>
                <Text>MXN${item.price}</Text>
                <Text style={styles.textDesc}>{item.description}</Text>
              </View>

              <View style={{flexDirection:'row-reverse', alignSelf: 'center'}}>
                <Button 
                    onPress={() => {addToOrder(item.id)}}
                    title="Agregar a la orden"
                    color="green"
                />
              </View>
              
            </View>
        )}/>
      
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  menuList: {
    maxWidth: '100%',
    alignSelf: 'auto', 
  },
  header:{
    flexDirection: 'column',
  },
  nameRestaurante: {
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '100%',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  itemRow: {
    backgroundColor: '#FDFDF8',
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 15,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#03A9F4',
    elevation: 8,
    flexDirection: 'row',
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'column',
    flex: 0.9, 
    flexWrap: 'wrap',
  },
  plateName: {
    fontWeight: 'bold',
  },
  textDesc: {
    textAlign: 'justify',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
});