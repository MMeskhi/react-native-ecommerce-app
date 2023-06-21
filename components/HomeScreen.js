import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import styled from "styled-components/native";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://veli.store/api/user/user_auth/login/",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      navigation.navigate("Products", { token });
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <Container>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Btn title="Login" onPress={handleLogin}>
        <BtnText>Log In</BtnText>
      </Btn>
    </Container>
  );
};

//Styles
const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 16px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border-width: 1px;
  border-color: #7c9956;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Btn = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  border: 1px solid #7c9956;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  color: #7c9956;
  font-weight: bold;
`;

export default HomeScreen;
