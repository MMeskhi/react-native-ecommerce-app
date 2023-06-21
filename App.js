import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "./components/CartContext";
import HomeScreen from "./components/HomeScreen";
import ProductsScreen from "./components/ProductsScreen";
import CartScreen from "./components/CartScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
