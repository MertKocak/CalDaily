import { Text, TextInput, View, TouchableOpacity, Image, Modal, ToastAndroid, Dimensions } from 'react-native';
import React from 'react';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import styles from './RegisterPage.style';
import { useState, useEffect } from 'react';
import colors from "../colors"
import HomePage from '../HomePage/HomePage';


export default function RegisterPage({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureText, setSecureText] = useState(true);

  const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
  const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
  const [modalVisibleEksik, setModalVisibleEksik] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalVisibleNetwork, setModalVisibleNetwork] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (username, email, password) => {
    if (!validateEmail(email)) {
      setModalVisibleEmail(true);
      return;
    }
    if (password.length < 6) {
      setModalVisiblePassword(true);
      return;
    }
    if (!username || !email || !password) {
      setModalVisibleEksik(true);
      return;
    }

    email = email.toLowerCase();

    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post("https://caldaily-backend.onrender.com/register", userData);
      if (response.status === 201) {
        ToastAndroid.show("Kayıt başarılı!", ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "LoginPage" }],
          })
        );
      }
    } catch (error) {
      console.log("Backend Hata Mesajı:", error.response.data);
      setModalVisibleError(true);
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
        visible={modalVisibleEksik}
        onRequestClose={() => setModalVisibleEksik(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eksik Bilgi!</Text>
            <Text style={styles.modalText}>Lütfen tüm alanları doldurduğunuzdan emin olun.</Text>
            <TouchableOpacity onPress={() => setModalVisibleEksik(false)}>
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
            <Text style={styles.modalTitle}>Kayıt Başarısız!</Text>
            <Text style={styles.modalText}>Kayıt sırasında bir hata oluştu.</Text>
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
            <Text style={styles.modalTitle}>Kayıt Başarısız!</Text>
            <Text style={styles.modalText}>Sunucuya bağlanılamadı.</Text>
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
      <Image style={{ height: 80, width: 150, marginTop: 20}}
        source={require('../../../assets/images/CalDaily.png')} />
      <Text style={styles.title}>Kayıt ol!</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        placeholderTextColor={colors.gray}
        cursorColor={colors.gray}
        value={username}
        onChangeText={username => setUsername(username)}
      />
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
          style={{ width: 48, height: 48, justifyContent: 'center', borderWidth: 0.4,
            borderColor: colors.gray, borderLeftWidth: 0 ,backgroundColor: colors.lightgreen, alignItems: 'center', borderBottomRightRadius: 6, borderTopRightRadius: 6 }} onPress={() => setSecureText(!secureText)}>
          <Image style={{ height: 22, width: 22, tintColor: colors.green }}
            source={secureText ? require('../../../assets/icons/hidden.png') : require('../../../assets/icons/eye.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={() => handleSubmit(username, email, password)}>
        <View>
          <Text style={styles.registerButtonText}>
            Kayıt Ol
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.text}>
          Zaten bir hesabınız var mı?
        </Text>
        <TouchableOpacity onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LoginPage' }],
            })
          );
        }}>
          <Text style={styles.registerText}>
            Giriş Yapın!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
