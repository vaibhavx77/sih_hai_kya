import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateReportScreen from './screens/CreateReportScreen';
import MapViewScreen from './screens/MapViewScreen';
import MyReportsScreen from './screens/MyReportsScreen';
import { ReportsProvider } from './screens/ReportsContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CreateReport" component={CreateReportScreen} />
          <Stack.Screen name="MapView" component={MapViewScreen} />
          <Stack.Screen name="MyReports" component={MyReportsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportsProvider>
  );
}

