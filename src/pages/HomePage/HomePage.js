import { Text, TextInput, View, TouchableOpacity, ToastAndroid, Modal, CommonActions, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import axios from 'axios';
import styles from './HomePage.style';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import FoodCard from '../../components/FoodCard/FoodCard';

export default function HomePage({ navigation, route }) {
  const [username, onChangeUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState('');
  const [data, setData] = useState([]);
  const [totalKcal, setTotalKcal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.post('https://caldaily-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data)).catch(error => {
        if (error.response) {
          alert('Sunucu hatası: ' + error.response.data ? error.response.data : "Sunucuya bağlanılamıyor.");
        } else {
          alert('Ağ bağlantı hatası: ' + error.message ? error.message : "Lütfen ağ bağlantınızı kontrol ediniz.");
        }
      });
    };
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://caldaily-backend.onrender.com/foods/${userdata._id}`, {
          params: { userId: userdata._id, date: new Date().toISOString() },
        });
        const reversedData = await response.data.reverse();
        await setData(reversedData);
        const kcalSum = reversedData.reduce((sum, food) => sum + food.foodKcal * food.foodCount, 0);
        setTotalKcal(kcalSum);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    const checkFirstLaunch = async () => {
      const firstLaunch = await AsyncStorage.getItem('firstLaunch');
      if (firstLaunch === null) {
        setModalVisible(true);
        await AsyncStorage.setItem('firstLaunch', 'true');
      }
    };
    fetchData();
    setLoading(false);
    fetchFood();
    checkFirstLaunch();
    console.log("kullanıcı adı: " + userdata._id)
  }, [userdata._id]);

  const resetOpenModal = useCallback(() => {
    navigation.setParams({ openModal: false });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.openModal) {
      setModalVisible(true);
      resetOpenModal(); // Açıldıktan sonra sıfırla
    }
  }, [route.params?.openModal, resetOpenModal]);

  const closeModal = async () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🍏 Uygulamayı kullanmaya başlarken...</Text>
            <Text style={styles.modalText}>CalDaily sayesinde günlük besin tüketimini kolayca takip edebilir, sağlıklı beslenme alışkanlıkları oluşturabilirsin. </Text>
            <Text style={styles.modalText}>Her gün tükettiğin yiyecekleri kaydedip, toplam kalori miktarını görebilirsin ve önceki günlere ait kalori alımlarını inceleyerek ilerlemeni takip edebilirsin.</Text>
            <Text style={[styles.modalText, { color: colors.green }]}>Eğer besin tüketimini kaydetmeyi unutmak istemiyorsan "Profilim" sayfasından bildirim ayarlayabilirsin. Böylece hatırlaman daha kolay olur.</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.modalText, { marginBottom: 0 }]}>Anasayfada yer alan</Text>
              <Image style={{ height: 16, width: 16, tintColor: colors.green, marginTop: 10, marginRight: 6, marginLeft: 6 }}
                source={require('../../../assets/icons/info.png')} />
              <Text style={[styles.modalText, { marginBottom: 0 }]}>ikonuyla</Text>
            </View>
            <Text style={[styles.modalText, { marginTop: 0 }]}>bu bilgilendirme mesajına dilediğin zaman ulaşabilirsin.</Text>

            <TouchableOpacity onPress={() => closeModal()}>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>
                  Anladım
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.containerTitle}>
          Bugün Eklenen Besinler
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.white }}>
          <SafeAreaView style={{}}>
            <View>
              {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 8, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#00AB58" />
                </View>
              ) : data.length === 0 ? (
                <View style={{ justifyContent: 'center', height: Dimensions.get("window").height / 1.8 }}>
                  <Text style={{ textAlign: 'center', marginBottom: 32, fontSize: 14, fontFamily: "Manrope-Medium", color: colors.gray }}>
                    Eklenen besin yok
                  </Text>
                </View>
              ) : <FoodCard navigation={navigation} data={data} />
              }
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
      <View style={styles.sumBox}>
        <Text style={styles.sumText}>
          Bugün tüketilen toplam kalori:
        </Text>
        <Text style={styles.sumText}>
          {totalKcal} Kcal
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SearchPage', { data: userdata })}>
        <View style={[styles.addButton, {backgroundColor: colors.lightgreen, 
          width: Dimensions.get("window").width - 32}]}>
          <Image style={{ height: 16, width: 16, tintColor: colors.green, marginRight: 12 }}
            source={require('../../../assets/icons/plus.png')} />
          <Text style={[styles.addButtonText, {color: colors.green}]}>
            Yeni Besin Ekle
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
