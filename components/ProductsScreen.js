import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import { CartContext } from "./CartContext";

const ProductsScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://veli.store/_next/data/DmVNfKqlUXXUxpWPzjbhe/ka/category/teqnika/audioteqnika/firfitebi/1482.json?type=teqnika&type=audioteqnika&type=firfitebi&type=1482"
      );

      const data = response.data.pageProps.data.products;

      setProducts(data);
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    navigation.navigate("Cart", { message: "Item successfully added!" });
  };

  const handleCartNavigation = () => {
    navigation.navigate("Cart");
  };

  return (
    <Container>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductContainer>
            <ProductCont>
              <Image source={{ uri: item.image }} />
              <Text>{item.headline}</Text>
              <Text>Price: ${item.stock.price}</Text>
            </ProductCont>
            <CartBtn title="Add to Cart" onPress={() => handleAddToCart(item)}>
              <CartBtnText>Add to Cart</CartBtnText>
            </CartBtn>
          </ProductContainer>
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <BottomMenu style={styles.shadow}>
        <GoToCartBtn onPress={handleCartNavigation}>
          <GoToCartBtnText>Go to Cart</GoToCartBtnText>
        </GoToCartBtn>
      </BottomMenu>
    </Container>
  );
};

// Styles
const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },

  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

const Image = styled.Image`
  width: 50%;
  height: 168px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;

  position: relative;
`;

const BottomMenu = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 56px;
  width: 100%;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 8px;
`;

const ProductContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #7c9956;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const ProductCont = styled.View`
  display: flex;
  gap: 8px;
`;

const CartBtn = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  border: 1px solid #ffffff;
  background-color: #7c9956;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartBtnText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

const GoToCartBtn = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  border: 1px solid #7c9956;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoToCartBtnText = styled.Text`
  color: #7c9956;
  font-weight: bold;
`;

export default ProductsScreen;
