import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import WelcomeScreen from './FirstScreen';

const Stack = createStackNavigator();
const whiteBg = {
    cardStyle: { backgroundColor: 'white' },
  }
  

const Navigation = () => {
    return (
        <NavigationContainer>
             <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Welcome"
                component={WelcomeScreen}
              />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
