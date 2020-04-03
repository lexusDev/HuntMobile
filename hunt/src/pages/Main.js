import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Main() {

    const navigation = useNavigation();
    const [ProductInfo, setproductInfo] = useState({});
    const [Docs, setDocs] = useState([]);
    const [page, setPage] = useState(1);

    const navigateToItem = (item) => {
        navigation.navigate('Product', { item });
    }

    const loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;

        setDocs([... Docs, ...docs]);
        setproductInfo(productInfo);
        setPage(page);
    }

    const loadMore = () => {
        if (page === ProductInfo.pages) return;

        loadProducts(page + 1);
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity
                style={styles.productButton}
                onPress={() => navigateToItem(item)}
            >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>JSHunt</Text>
            </View>
            <FlatList
                contentContainerStyle={styles.list}
                data={Docs}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}