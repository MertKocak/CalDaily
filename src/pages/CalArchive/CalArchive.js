import { Text, TextInput, View, TouchableOpacity, ToastAndroid, CommonActions, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import axios from 'axios';
import styles from './CalArchive.style';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import FoodCard from '../../components/FoodCard/FoodCard';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { LocaleConfig } from 'react-native-calendars';

export default function CalArchive({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState('');
  const [data, setData] = useState([]);
  const [totalKcal, setTotalKcal] = useState(0);
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, "d MMM yyyy", { locale: tr })); // Örn: "10 Mar 2025"
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.post('http://10.0.2.2:5000/userdata', { token: token }).then(res => setUserdata(res.data.data)).catch(error => {
        if (error.response) {
          alert('Sunucu hatası: ' + error.response.data ? error.response.data : "Sunucuya bağlanılamıyor.");
        } else {
          alert('Ağ bağlantı hatası: ' + error.message ? error.message : "Lütfen ağ bağlantınızı kontrol ediniz.");
        }
      });
    };
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5000/allfoods/${userdata._id}`, {
          params: { userId: userdata._id },
        });

        const foods = response.data; // Artık API tüm günleri döndürüyor
        setData(foods); // Gün bazında toplam kalorileri sakla
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error('Response Error:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      }
    };
    const checkFirstLaunch = async () => {
      const firstLaunch = await AsyncStorage.getItem('firstLaunch');
      if (firstLaunch === null) {
        //setModalVisible(true);
        await AsyncStorage.setItem('firstLaunch', 'true');
      }
    };
    fetchData();
    setLoading(false);
    fetchFood();
    checkFirstLaunch();
  }, [userdata._id]);

  LocaleConfig.locales['tr'] = {
    monthNames: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ],
    monthNamesShort: ['Ocak', 'Şub', 'Mart', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    dayNamesShort: ['Paz', 'Pzt', 'Salı', 'Çrş', 'Prş', 'Cuma', 'Cts'],
    today: "Bugün"
  };
  LocaleConfig.defaultLocale = 'tr';

  const renderCalendar = () => {
    const markedDates = {};

    data.forEach(item => {
      markedDates[item.date] = {
        customStyles: {
          container: {
            backgroundColor: colors.green,
            borderRadius: 4,
            padding: 4,
          },
          text: {
            fontSize: 14,
            color: colors.black,
          }
        }
      };
    });

    return (
      <View style={{ marginTop: 4, width: Dimensions.get("window").width - 32, borderRadius: 6 }}>
        <Text style={{ fontFamily: "Manrope-Bold", color: colors.green, fontSize: 14, marginBottom: 12, marginTop: -10, textAlign: 'center' }}>Kalori Kayıtlarım</Text>
        <Calendar
          headerStyle={{
            backgroundColor: colors.lightgreen,
            width: Dimensions.get("window").width - 44,
            marginBottom: 0,
            fontFamily: "Manrope-Bold"
          }}
          monthFormat={'dd MMMM yyyy'}
          style={{
            borderWidth: 0.6,
            borderColor: colors.gray,
            borderRadius: 6,
            padding: 2,
            fontFamily: "Manrope-Bold"
          }}
          firstDay={1}
          current={currentDate.toString()}
          markedDates={markedDates}
          markingType={'custom'}
          dayComponent={({ date, state }) => {
            const formattedDate = format(new Date(date.year, date.month - 1, date.day), "yyyy-MM-dd");
            const dayData = data.find(item => item.date === formattedDate);

            return (
              <View style={{
                alignItems: 'center',
                backgroundColor: colors.lightgreen,
                justifyContent: 'space-between',
                marginTop: -8,
                borderWidth: 0.4,
                borderColor: colors.gray,
                borderRadius: 4,
                width: 48,
                height: 78,
                fontFamily: "Manrope-Bold",
              }}>
                <Text style={{marginTop: 6, color: state === 'disabled' ? colors.gray : colors.black, fontFamily: "Manrope-Bold", fontSize: 14 }}>
                  {date.day}
                </Text>
                {dayData && (
                  <View style={{borderRadius: 4, borderTopLeftRadius: 0, borderTopRightRadius: 0 ,backgroundColor: colors.green}}>
                    <Text style={{
                      fontFamily: "Manrope-Bold", fontSize: 14, color: colors.white,
                      marginTop: 2, marginBottom: 2, textAlign: 'center'
                    }}>
                      {dayData.totalCalories} Kcal
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {renderCalendar()}
    </View>
  );
}
