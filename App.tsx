import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Dashboard from './screens/Dashboard';
// import Schedule from './screens/Schedule';
// import Revision from './screens/Revision';
// import ChatAI from './screens/ChatAI';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import Dashboard from './screens/dasboard';
import Schedule from './screens/schedule';
import ChatScreen from './screens/chat';
import Revision from './screens/revision';

// Définir les types des noms d’écrans
type RootTabParamList = {
  Dashboard: undefined;
  Schedule: undefined;
  Revision: undefined;
  ChatAI: undefined;
};

// function HomeScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//         Welcome to the App!
//       </Text>
//     </View>
//   );
// }

// function Schedule() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//         Schedule
//       </Text>
//     </View>
//   );
// }

// function Revision() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//         Revision
//       </Text>
//     </View>
//   );
// }

// function Chat() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//         Chatting
//       </Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}): BottomTabNavigationOptions => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = '';

            if (route.name === 'Dashboard')
              iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Schedule')
              iconName = focused ? 'calendar' : 'calendar-outline';
            else if (route.name === 'Revision')
              iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'ChatAI')
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2f95dc',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="Revision" component={Revision} />
        <Tab.Screen name="ChatAI" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
