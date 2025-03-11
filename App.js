import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Icon } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage/HomePage';
import RegisterPage from './src/pages/RegisterPage/RegisterPage';
import SearchPage from './src/pages/SearchPage/SearchPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
import UserPage from './src/pages/UserPage/UserPage';
import CalArchive from './src/pages/CalArchive/CalArchive';
import CalStats from './src/pages/CalStats/CalStats';
import colors from './src/pages/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kullanıcının login durumunu kontrol et
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token); // Eğer token varsa, kullanıcı giriş yapmış demektir
      } catch (error) {
        console.error('Token kontrol edilirken hata oluştu:', error);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    checkLoginStatus();
  }, []);

  // Yükleme devam ediyorsa activity indicator gösteriyoruz
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={({ navigation }) => ({
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={({ navigation }) => ({
            headerShown: false,
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                source={require('./assets/images/logo.png')} // Resmin yolu
                style={{ width: 100, height: 44, resizeMode: 'contain' }} // Boyutlandırma
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('UserPage')}
              >
                <Image
                source={require('./assets/icons/user.png')} // Resmin yolu
                style={{ width: 20, height: 20, tintColor: colors.green}} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>  navigation.setParams({ openModal: true })}
              >
                 <Image
                source={require('./assets/icons/info.png')} // Resmin yolu
                style={{ width: 18, height: 18, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.Regulargreen,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen name="SearchPage"
          component={SearchPage}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                source={require('./assets/images/logo.png')} // Resmin yolu
                style={{ width: 100, height: 44, resizeMode: 'contain' }} // Boyutlandırma
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('HomePage')}
              >
                <Image
                source={require('./assets/icons/arrow.png')} // Resmin yolu
                style={{ width: 18, height: 18, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),

            headerStyle: {
              backgroundColor: colors.Regulargreen,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: colors.green,
              fontSize: 16
            },
            headerShadowVisible: false,
          })} />
        <Stack.Screen name="UserPage"
          component={UserPage}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                source={require('./assets/images/logo.png')} // Resmin yolu
                style={{ width: 100, height: 44, resizeMode: 'contain' }} // Boyutlandırma
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                 <Image
                source={require('./assets/icons/arrow.png')} // Resmin yolu
                style={{ width: 18, height: 18, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.Regulargreen,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: colors.green,
              fontSize: 16
            },
            headerShadowVisible: false,
          })} />
        <Stack.Screen name="CalArchive"
          component={CalArchive}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                source={require('./assets/images/logo.png')} // Resmin yolu
                style={{ width: 100, height: 44, resizeMode: 'contain' }} // Boyutlandırma
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                 <Image
                source={require('./assets/icons/arrow.png')} // Resmin yolu
                style={{ width: 18,height: 18, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('HomePage')}
              >
                 <Image
                source={require('./assets/icons/home.png')} // Resmin yolu
                style={{ width: 16, height: 16, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.Regulargreen,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: colors.green,
              fontSize: 16
            },
            headerShadowVisible: false,
          })} />
        <Stack.Screen name="CalStats"
          component={CalStats}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                source={require('./assets/images/logo.png')} // Resmin yolu
                style={{ width: 100, height: 44, resizeMode: 'contain' }} // Boyutlandırma
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                 <Image
                source={require('./assets/icons/arrow.png')} // Resmin yolu
                style={{ width: 18,height: 18, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('HomePage')}
              >
                 <Image
                source={require('./assets/icons/home.png')} // Resmin yolu
                style={{ width: 16, height: 16, tintColor: colors.green, resizeMode: 'contain' }} // Boyutlandırma
              />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.Regulargreen,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: colors.green,
              fontSize: 16
            },
            headerShadowVisible: false,
          })} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
