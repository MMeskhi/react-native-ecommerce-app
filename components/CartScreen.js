import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "./CartContext";

const CartScreen = ({ route }) => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [message, setMessage] = useState(route?.params?.message || "");

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.stock.price;
    });

    return totalPrice.toFixed(2);
  };

  const handleCleanCart = () => {
    clearCart();
    setMessage("Cart successfully cleared");
  };

  return (
    <Container>
      <Message>{message}</Message>
      <Heading>Cart Items:</Heading>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <CartItem key={`${item.id}-${index}`}>
              <CartItemName>{item.headline}</CartItemName>
              <CartItemPrice>${item.stock.price}</CartItemPrice>
            </CartItem>
          ))}
          <TotalPrice>Total Price: ${calculateTotalPrice()}</TotalPrice>
          <CleanButton onPress={handleCleanCart}>
            <CleanButtonText>Clean</CleanButtonText>
          </CleanButton>
        </>
      ) : (
        <EmptyMessage>Cart is empty</EmptyMessage>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

const Message = styled.Text`
  font-size: 18px;
  margin-bottom: 16px;
`;

const Heading = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CartItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #7c9956;
`;

const CartItemName = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const CartItemPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

const TotalPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
`;

const EmptyMessage = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  margin-top: 80px;
`;

const CleanButton = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  border: 1px solid #ffffff;
  background-color: #7c9956;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const CleanButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

export default CartScreen;
