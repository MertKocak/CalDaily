import { Text, TextInput, View, TouchableOpacity, ToastAndroid, CommonActions, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import React from 'react';
import axios from 'axios';
import styles from './CalCalPage.style';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import FoodCard from '../../components/FoodCard/FoodCard';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { LocaleConfig } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

export default function CalCalPage({ navigation }) {
  const [boy, setBoy] = useState(0);
  const [kilo, setKilo] = useState(0);
  const [cinsiyet, setCinsiyet] = useState('Erkek');
  const [yas, setYas] = useState(0);
  const [activity, setActivity] = useState(1);
  const [totalCalorie, setTotalCalorie] = useState(0);

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };


  useEffect(() => {
  }, []);

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        placeholder="Boy (cm)"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={boy}
        onChangeText={boy => setBoy(boy)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kilo (kg)"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={kilo}
        onChangeText={kilo => setKilo(kilo)}
      />
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={yas}
        onChangeText={yas => setYas(yas)}
      />
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    </View>
  );
}
