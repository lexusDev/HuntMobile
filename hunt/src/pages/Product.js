import React from 'react';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const Product = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const item = route.params.item;

    function navigateBack() {
        navigation.goBack();
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{item.title}</Text>
            </View>
            <WebView source={{ uri: item.url }} />
        </View>
    );
};

export default Product;