
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateReportScreen from './screens/CreateReportScreen';
import MapViewScreen from './screens/MapViewScreen';
import MyReportsScreen from './screens/MyReportsScreen';
import { ReportsProvider } from './screens/ReportsContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MapView"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'MapView') iconName = 'map-marker-radius';
          else if (route.name === 'CreateReport') iconName = 'plus-circle';
          else if (route.name === 'MyReports') iconName = 'clipboard-list';
          else if (route.name === 'Profile') iconName = 'account-circle';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="MapView" component={MapViewScreen} options={{ title: 'Map' }} />
      <Tab.Screen name="CreateReport" component={CreateReportScreen} options={{ title: 'Report Issue' }} />
      <Tab.Screen name="MyReports" component={MyReportsScreen} options={{ title: 'My Reports' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportsProvider>
  );
}

