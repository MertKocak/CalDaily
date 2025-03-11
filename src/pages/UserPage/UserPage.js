import { Text, TextInput, View, Modal, TouchableOpacity, ToastAndroid, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import styles from './UserPage.style';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import FoodCard from '../../components/FoodCard/FoodCard';
import DatePicker from 'react-native-date-picker';
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Türkçe dil desteği
import PushNotification from "react-native-push-notification";
import { Platform,PermissionsAndroid } from 'react-native';

export default function UserPage({ navigation }) {
  const [userdata, setUserdata] = useState('');
  const [allData, setallData] = useState([]);
  const [doneData, setdoneData] = useState([]);
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);

  useEffect(() => {
    const fetchDataAll = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        await axios.post('https://caldaily-backend.onrender.com/userdata', { token: token }).then(res => setUserdata(res.data.data));
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    requestNotificationPermission();
    fetchDataAll();
    createChannels();
    loadData();
  }, []);

  const requestNotificationPermission = async () => {
    if(Platform.OS ==="android"){
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if(!response){
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                  title: 'Notification',
                  message:
                    'App needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>",err);
          }
        )
      } catch (err){
        console.log(err);
      }
    }
  };


  const handleLogout = async () => {
    setModalVisible(true)
  };

  const functionLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', '');
    await AsyncStorage.setItem('token', '');
    PushNotification.cancelAllLocalNotifications();
    await navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  }

  const [date, setDate] = useState(new Date());
  const [notDate, setNotDate] = useState("Bildirim saati ayarlanmadı.");

  // Veriyi AsyncStorage'a kaydetme
  const saveData = async (newDate) => {
    try {
      // Yeni veriyi AsyncStorage'a kaydet
      await AsyncStorage.setItem('notificationDate', newDate);
      setNotDate(newDate); // State'i de güncelle
    } catch (e) {
      console.error('Veri kaydedilirken hata oluştu', e);
    }
  };

  // Veriyi AsyncStorage'dan okuma
  const loadData = async () => {
    try {
      const savedDate = await AsyncStorage.getItem('notificationDate');
      if (savedDate !== null) {
        setNotDate(savedDate); // State'i güncelle
      }
    } catch (e) {
      console.error('Veri yüklenirken hata oluştu', e);
    }
  };


  const handleRemoveNot = () => {
    PushNotification.cancelAllLocalNotifications()
    setModalVisibleDate(false);
    saveData("Bildirim saati ayarlanmadı.")
    ToastAndroid.show('Hatırlatıcı İptal Edildi', ToastAndroid.SHORT)

  }

  const handleNotification = () => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotificationSchedule({
      channelId: "channel",
      title: "Kalori takibini unutma! 🍏",
      message: "Bugün neler yedin? Kaydetmeyi unutma! Birkaç saniyeni alır.",
      date: date,
      allowWhileIdle: true,
      color: "#FEFFFD",
      repeatType: "day",
    });
    setModalVisibleDate(false);
    const formattedDate = format(date, 'HH:mm');
    ToastAndroid.show('Hatırlatıcı Kaydedildi!', ToastAndroid.SHORT);
    saveData("Bildirim Saati: " + formattedDate);
  };

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "channel",
        channelName: "Channel"
      }
    )
  }

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Çıkış yapılsın mı?</Text>
            <Text style={styles.modalText}>Çıkış yaptıktan sonra uygulamayı kullanabilmeniz için tekrar giriş yapmanız gerekmeketedir.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.gray, borderWidth: 0.6, borderColor: colors.gray }]}>
                  <Text style={styles.addButtonText}>
                    Vazgeç
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => functionLogout()}>
                <View style={styles.addButtonHalf}>
                  <Text style={styles.addButtonText}>
                    Çıkış Yap
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDate}
        onRequestClose={() => {
          setModalVisibleDate(!modalVisibleDate);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewDate}>
            <View style={{ alignItems: 'flex-end', height: 28 }}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisibleDate(false)}>
               <Image style={styles.closeButton} source={require("../../../assets/icons/close.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.dateContainer}>
              <DatePicker androidVariant='iosClone' style={styles.datePicker} is24hourSource='device' fadeToColor='#D9D9D9' mode='time' date={date} onDateChange={setDate} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 18 }}>
              <TouchableOpacity
                style={[styles.buttonOpen, { backgroundColor: colors.gray, borderWidth: 0.6, borderColor: colors.gray, }]}
                onPress={() => handleRemoveNot()}>
                <Text style={styles.textStyle}>İptal Et</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOpen}
                onPress={() => handleNotification()}>
                <Text style={styles.textStyle}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: "row", marginLeft: 16, marginTop: 16, marginBottom: 2, alignSelf: 'flex-start', backgroundColor: colors.green, borderRadius: 4, width: Dimensions.get("window").width - 32, padding: 16 }}>
        <View style={{ backgroundColor: colors.white, height: 28, width: 28, alignSelf: 'center', justifyContent: 'center', borderRadius: 4, alignItems: 'center', marginRight: 12, }}>
          <Image style={{ height: 20, width: 20, tintColor: colors.green }}
            source={require('../../../assets/icons/user.png')} />
        </View>
        <View style = {{flexDirection: 'column'}}>
          <Text style={[styles.title, { color: colors.white, marginTop: -2}]}>{userdata.username}</Text>
          <Text style={[styles.title, { color: colors.white, marginTop: -2 }]}>{userdata.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setModalVisibleDate(true)}>
        <View style={[styles.NavCont, { flexDirection: 'column' }]}>
          <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 64, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={[styles.title]} >Bildirim Ayarları</Text>
              <Text style={[styles.desc]} >Günlük bildirim saatini ayarlayabilir veya iptal edebilirsin</Text>
            </View>
            <Image style={{ height: 18, width: 18, marginTop: -24, tintColor: colors.green, }}
              source={require('../../../assets/icons/bell.png')} />
          </View>
          <View style={{
            backgroundColor: colors.white,
            borderWidth: 0.2,
            borderColor: colors.gray,
            padding: 8,
            marginTop: 8,
            marginLeft: -2,
            borderRadius: 4,
            width: Dimensions.get('window').width - 62
          }}>
            <Text style={[styles.desc, { marginTop: -2, fontFamily: "Manrope-Medium" }]}>{notDate}</Text>
          </View>
        </View>

      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CalArchive')}>
        <View style={styles.NavCont}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.title]} >Kalori Kayıtlarım</Text>
            <Text style={styles.desc} >Kaydettiğin günlük kalori kayıtlarına buradan erişebilirisin</Text>
          </View>
          <Image style={{ height: 18, width: 18, tintColor: colors.green, }}
            source={require('../../../assets/icons/box.png')} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CalStats')}>
        <View style={styles.NavCont}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.title]} >Kalori Grafiğim</Text>
            <Text style={styles.desc} >Kaydettiğin günlük kalori kayıtlarına ait grafiği buradan inceleyebilirsin</Text>
          </View>
          <Image style={{ height: 18, width: 18, tintColor: colors.green, }}
            source={require('../../../assets/icons/stats.png')} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogout()}>
        <View style={styles.NavCont}>
          <Text style={[styles.title, { fontFamily: "Manrope-Bold", marginBottom: 2 }]} >Çıkış Yap</Text>
          <Image style={{ height: 18, width: 18, tintColor: colors.green, marginRight: -2 }}
            source={require('../../../assets/icons/exit.png')} />
        </View>
      </TouchableOpacity>
    </View>
  );
}