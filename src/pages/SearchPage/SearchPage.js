import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import axios from 'axios';
import React from 'react'
import styles from './SearchPage.style';
import { CommonActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.collectapi.com/food/calories';

export default function SearchPage({ navigation }) {

  const [foodTitle, setFoodTitle] = React.useState("");
  const [foodKcal, setFoodKcal] = React.useState(0);
  const [createdAt, setCreatedAt] = React.useState(new Date());
  const [userdata, setUserdata] = useState('');

  const [foodName, setFoodName] = useState('');
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://caldaily-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data)).catch(error => {
        if (error.response) {
          alert('Sunucu hatası: ' + error.response.data ? error.response.data : "Sunucuya bağlanılamıyor.");
        } else {
          alert('Ağ bağlantı hatası: ' + error.message ? error.message : "Lütfen ağ bağlantınızı kontrol ediniz.");
        }
      });
    };
    fetchData();
    console.log("KULLANICI ADI: " + userdata._id);
  }, [userdata._id]);

  const fetchNutrition = async () => {
    if (!foodName) return;
    setLoading(true);
    setError('');
    setNutrition([]);
    setCounters({})

    try {
      const response = await axios.get(API_URL, {
        params: { query: foodName },
        headers: {
          'Authorization': 'apikey 5ljl05Kz7WOQ2ZWE5WvSr6:32IlOIW3H1iYa7L8D30s2x',
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data);
      const results = response.data.result.slice(0, 20);
      if (results.length === 0) {
        setError('Ürün bulunamadı.');
      } else {
        setNutrition(results);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError('Bilgiler alınamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    return text.replace(/(\D)(\d+)/g, "$1 $2");
  };

  const handleAddButton = (foodTitle, kcal, counter) => {
    const foodKcal = parseInt(kcal.match(/\d+/)[0], 10);
    if (counter === undefined) {
      counter = 1;
    }
    const foodCount = counter;
    const userId = userdata._id;
    const foodData = {
      foodTitle,
      foodKcal,
      foodCount,
      createdAt,
      userId,
    };
    axios.post("https://caldaily-backend.onrender.com/foods", foodData).then(ToastAndroid.show('Besin eklendi!', ToastAndroid.SHORT)).catch(e => console.log(e));
  };

  const [counters, setCounters] = useState({});

  const increaseCounter = (index) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [index]: (prevCounters[index] || 1) + 1,
    }));
  };

  const decreaseCounter = (index) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [index]: Math.max(1, (prevCounters[index] || 1) - 1),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          placeholder="Besin adı girin..."
          value={foodName}
          onChangeText={setFoodName}
        />
        <TouchableOpacity onPress={fetchNutrition}>
          <View style={styles.button}>
            <Image
              source={require('../../../assets/icons/searchicon.png')} // Resmin yolu
              style={{ width: 20, height: 20, tintColor: colors.white }} // Boyutlandırma
            />
          </View>
        </TouchableOpacity>
      </View>
      {loading && <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 16, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00AB58" />
      </View>}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.resultContainer}>
        {nutrition.map((item, index) => (
          <View key={index} style={styles.result}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.desc}>{formatText(item.weight)} = {item.kcal}</Text>
              </View>
              <View style={{
                flexDirection: "row", height: 32, marginTop: 4, justifyContent: 'center', alignItems: 'center',
                borderWidth: 0.6, borderColor: colors.gray, borderRadius: 4
              }}>
                <TouchableOpacity onPress={() => decreaseCounter(index)}>
                  <View style={{ borderWidth: 0.6, borderColor: colors.gray, backgroundColor: colors.lightgreen, padding: 8, width: 32, borderRadius: 4, borderTopRightRadius: 0, borderBottomRightRadius: 0, height: 32, justifyContent: 'center' }}>
                    <Image style={{ height: 12, width: 12, justifyContent: 'center', alignSelf: 'center', tintColor: colors.green }}
                      source={require('../../../assets/icons/minus.png')} />
                  </View>
                </TouchableOpacity>
                <Text style={{ width: 32, textAlign: 'center', color: colors.gray, fontSize: 14, }}>{counters[index] || 1}</Text>
                <TouchableOpacity onPress={() => increaseCounter(index)}>
                  <View style={{ borderWidth: 0.6, borderColor: colors.gray, backgroundColor: colors.lightgreen, padding: 8, width: 32, borderRadius: 4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: 32, justifyContent: 'center' }}>
                    <Image style={{ height: 12, width: 12, justifyContent: 'center', alignSelf: 'center', tintColor: colors.green }}
                      source={require('../../../assets/icons/plus.png')} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleAddButton(item.name, item.kcal, counters[index])}>
              <View style={styles.addButton}>
                <Text style={{ fontSize: 14, color: colors.white, fontWeight: 'bold' }}>
                  Ekle
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}