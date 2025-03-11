import { Text, TextInput, View, TouchableOpacity, Image, Modal, ToastAndroid, Dimensions } from 'react-native';
import React from 'react';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import styles from './LoginPage.style';
import { useState, useEffect } from 'react';
import colors from "../colors"
import HomePage from '../HomePage/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureText, setSecureText] = useState(true);

  const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
  const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisibleNetwork, setModalVisibleNetwork] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (email, password) => {
    if (!validateEmail(email)) {
      setModalVisibleEmail(true);
      return;
    }
    if (password.length < 6) {
      setModalVisiblePassword(true);
      return;
    }
    try {
      var email = email.toLowerCase();
      const response = await axios.post('https://caldaily-backend.onrender.com/login', {
        email,
        password,
      });

      console.log(response.data); // Gelen yanıtı kontrol etmek için ekledik.

      if (response.data.status === "ok") {
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('token', response.data.data);
        ToastAndroid.show('Giriş başarılı!', ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        );
      } else if (response.data.status === "userNotFound") {
        setModalVisibleError(true)
      }
    } catch (error) {
      setModalVisibleNetwork(true)
    }
  };

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleEmail}
        onRequestClose={() => setModalVisibleEmail(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Geçersiz E-posta!</Text>
            <Text style={styles.modalText}>Lütfen geçerli bir e-posta adresi giriniz.</Text>
            <TouchableOpacity onPress={() => setModalVisibleEmail(false)}>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePassword}
        onRequestClose={() => setModalVisiblePassword(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Geçersiz Şifre!</Text>
            <Text style={styles.modalText}>Şifreniz en az 6 karakter olmalıdır.</Text>
            <TouchableOpacity onPress={() => setModalVisiblePassword(false)}>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleError}
        onRequestClose={() => setModalVisibleError(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Giriş Yapılamadı!</Text>
            <Text style={styles.modalText}>Girmiş olduğunuz e-posta adresine sahip bir kullanıcı bulunamadı</Text>
            <TouchableOpacity onPress={() => setModalVisibleError(false)}>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleNetwork}
        onRequestClose={() => setModalVisibleNetwork(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Giriş Yapılamadı!</Text>
            <Text style={styles.modalText}>E-posta adresi ve/veya şifre yanlış.</Text>
            <TouchableOpacity onPress={() => setModalVisibleNetwork(false)}>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image style={{ height: 80, width: 150, marginTop: 20 }}
        source={require('../../../assets/images/CalDaily.png')} />
      <Text style={styles.title}>Giriş Yap!</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta Adresi"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <View style={{ flexDirection: "row", alignItems: "center", height: 48, marginTop: 16, width: Dimensions.get('window').width - 32, borderRadius: 6 }}>
        <TextInput
          style={[styles.input, { marginTop: 0, borderRightWidth: 0, marginLeft: 0, marginRight: 0, width: Dimensions.get('window').width - 80, borderTopRightRadius: 0, borderBottomRightRadius: 0, }]}
          placeholder="Şifre"
          placeholderTextColor={colors.gray}
          cursorColor={colors.gray}
          secureTextEntry={secureText}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TouchableOpacity
          style={{ width: 48, height: 48, justifyContent: 'center', backgroundColor: colors.lightgreen,borderWidth: 0.4,
            borderColor: colors.gray, borderLeftWidth: 0, alignItems: 'center', borderBottomRightRadius: 6, borderTopRightRadius: 6 }} onPress={() => setSecureText(!secureText)}>
          <Image style={{ height: 22, width: 22, tintColor: colors.green }}
            source={secureText ? require('../../../assets/icons/hidden.png') : require('../../../assets/icons/eye.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={() => handleLogin(email, password)}>
        <View>
          <Text style={styles.registerButtonText}>
            Giriş Yap
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.text}>
          Henüz bir hesabınız yok mu?
        </Text>
        <TouchableOpacity onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'RegisterPage' }],
            })
          );
        }}>
          <Text style={styles.registerText}>
            Kayıt Olun!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
