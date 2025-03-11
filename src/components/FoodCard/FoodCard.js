import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, Button, ActivityIndicator, ToastAndroid, CommonActions, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from "./FoodCard.style";
import { default as axios } from 'axios';
import colors from '../../pages/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FoodCard({ navigation, data }) {

    const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
    const [id, setId] = useState(0);

    function handleDelete(id) {
        setId(id);
        setModalVisibleDelete(true);
    }

    const deletefunction = (id) => {
        axios
            .delete(`http://10.0.2.2:5000/foods/${id}`)
            .then(res => {
                ToastAndroid.show('Alışkanlık silindi!', ToastAndroid.SHORT);
                navigation.replace('HomePage') // Ana sayfaya yönlendirme
            })
            .catch(e => console.error("Hata:", e));
    }


    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleDelete}
                onRequestClose={() => setModalVisibleDelete(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Besin silinsin mi?</Text>
                        <Text style={styles.modalText}>Bu işlem geri alınamaz.</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setModalVisibleDelete(false)}>
                                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.gray, borderWidth: 0.6, borderColor: colors.gray }]}>
                                    <Text style={styles.addButtonText}>
                                        Vazgeç
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deletefunction(id)}>
                                <View style={styles.addButtonHalf}>
                                    <Text style={styles.addButtonText}>
                                        Sil
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {data.map((item) => {
                return (
                    <View style={styles.container} key={item._id}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.innerCont}>
                                <Text style={styles.title}>{item.foodTitle}</Text>
                                <Text style={styles.desc}>Toplam Kalori Değeri: {item.foodKcal * item.foodCount}</Text>
                            </View>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => handleDelete(item._id)}>
                                <View style={{ height: 32, paddingHorizontal: 3, width: 28, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Image style={{ height: 18, width: 18, tintColor: colors.green }}
                                        source={require('../../../assets/icons/trash.png')} />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                );
            })}
        </View >

    );
}