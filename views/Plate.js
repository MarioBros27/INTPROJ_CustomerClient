import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function Plate({ route }){

    const { order } = route.params;
    const [ plates, setPlates ] = useState([]);
    const [ flag, setFlag ] = useState(false);
    const [ orderItems, setOrderItems ] = useState([]);

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

      <Text style={styles.title}>
        {order.Restaurant.name}
      </Text>
      
        <FlatList 
          style={styles.menuList}
          data={plates}
          renderItem={({ item }) => (

            <>
              <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.subtitle}>{item.description}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${item.price}</Text>
                        <Pressable
                          onPress={() => {addToOrder(item.id)}}
                          style={styles.button}
                        >
                          <MaterialIcons name="add" color={"#fff"} size={20} />
                        </Pressable>
                    </View>
                </View>
              </View>

              <View style={styles.breakLine}>

              </View>
            </>

        )}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  title: {
    fontSize: 24,
    marginBottom: 2,
    fontWeight: "bold"
  },

  item: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    marginVertical: 6,
    borderRadius: 15
  },

  breakLine: {
    marginVertical: 3,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginHorizontal: 8
  },

  itemTitle: {
    fontSize: 18,
    marginBottom: 2,
    fontWeight: "bold"
  },

  subtitle: {
    fontSize: 16
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00CDAC'
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleContainer: {
    width: '80%',
    alignItems: 'flex-start'
  },

  priceContainer: {
    alignItems: 'flex-end',
    marginRight: 15
  },
  
  button: {
    borderRadius: 100,
    backgroundColor: "#00CDAC",
    padding: 5
  }
});