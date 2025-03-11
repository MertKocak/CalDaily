import { Text, TextInput, View, TouchableOpacity, ToastAndroid, CommonActions, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import axios from 'axios';
import styles from './CalStats.style';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import FoodCard from '../../components/FoodCard/FoodCard';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { LocaleConfig } from 'react-native-calendars';
import { LineChart } from "react-native-chart-kit";
import { subDays, subWeeks, subMonths, subYears } from "date-fns"

export default function CalStats({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState('');
  const [data, setData] = useState([]);
  const [totalKcal, setTotalKcal] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("monthly"); // Varsayılan olarak aylık
  const [averageCalories, setAverageCalories] = useState(0);


  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, "d MMM yyyy", { locale: tr })); // Örn: "10 Mar 2025"
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
        const response = await axios.get(`https://caldaily-backend.onrender.com/allfoods/${userdata._id}`, {
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
    const applyFilter = () => {
      const now = new Date();
      let startDate;

      switch (selectedFilter) {
        case "weekly":
          startDate = subWeeks(now, 1);
          break;
        case "monthly":
          startDate = subMonths(now, 1);
          break;
        case "yearly":
          startDate = subYears(now, 1);
          break;
        default:
          startDate = new Date(0); // Tüm zamanlar
      }

      const filtered = data.filter(item => new Date(item.date) >= startDate);
      setFilteredData(filtered);

      // Ortalama kaloriyi hesapla
      const totalCalories = filtered.reduce((sum, item) => sum + item.totalCalories, 0);
      setAverageCalories(filtered.length ? (totalCalories / filtered.length).toFixed(1) : 0);
    };
    fetchData();
    setLoading(false);
    fetchFood();
    applyFilter();
    console.log("kullanıcı adı: " + userdata._id)
  }, [userdata._id, selectedFilter, data]);

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: colors.white }}>
      <Text style={{
        fontSize: 14, marginBottom: 16, marginTop: -4, color: colors.green, textAlign: 'center', fontFamily: "Manrope-B"
      }}>
        Kalori Grafiğim
      </Text>

      {/* Filtreler */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        {["weekly", "monthly", "yearly", "all"].map(filter => (
          <TouchableOpacity
            key={filter}
            style={{
              backgroundColor: selectedFilter === filter ? colors.green : colors.lightgreen,
              padding: 8,
              borderRadius: 6,
              fontFamily: "Manrope-Bold",
              borderWidth: 0.4,
              borderColor: colors.gray,
              paddingHorizontal: 18,
              justifyContent: 'space-between'
            }}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={{ textAlign: 'center', fontFamily: "Manrope-Medium", color: selectedFilter === filter ? colors.white : colors.black, fontSize: 14 }}>
              {filter === "weekly" ? "Haftalık" : filter === "monthly" ? "Aylık" : filter === "yearly" ? "Yıllık" : "Tüm Zamanlar"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Çizgi Grafiği */}
      {filteredData.length > 0 ? (
        <LineChart
          data={{
            labels: filteredData.map(item => format(new Date(item.date), "dd/MM")),
            datasets: [{ data: filteredData.map(item => item.totalCalories) }]
          }}
          width={Dimensions.get("window").width - 33}
          height={288}
          chartConfig={{
            backgroundGradientFrom: colors.lightgreen,
            backgroundGradientTo: colors.lightgreen,
            color: (opacity = 1) => `rgba(21, 112, 68, ${opacity})`,
            strokeWidth: 2,
            decimalPlaces: 0,
            fontFamily: "Manrope-Medium"
          }}
          withShadow={false}
          verticalLabelRotation={45}
          bezier
          style={{
            borderWidth: 0.4, 
              borderColor: colors.gray,
            marginVertical: 4,
            borderRadius: 6,
            fontFamily: "Manrope-Medium"
          }}
        />
      ) : (
        <Text style={{ textAlign: "center", marginVertical: 20, color: colors.gray, fontFamily: "Manrope-Medium" }}>Veri bulunamadı</Text>
      )}

      {/* Ortalama Kalori Bilgisi */}
      <View style={{
        marginTop: 8, borderWidth: 0.4,
        borderColor: colors.gray, justifyContent: 'space-between', flexDirection: 'row', padding: 16, backgroundColor: colors.lightgreen, borderRadius: 6
      }}>
        <Text style={{ fontSize: 14, color: colors.black, fontFamily: "Manrope-Medium" }}>Tüketilen ortalama kalori miktarı:</Text>
        <Text style={{ fontSize: 14, color: colors.green, fontFamily: "Manrope-Medium" }}>
          {averageCalories} Kcal
        </Text>
      </View>
    </ScrollView>
  );
}
