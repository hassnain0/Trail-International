import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/homeScreen';
import FormScreen from './src/screens/CreateForm';
import ReadyToSendScreenEng from './src/screens/ReadyToSencEng';
import DownloadForm from './src/screens/DownloadForm';
import DownloadFormFr from './src/screens/DownloadFormFr';
import ReadyToSendScreen from './src/screens/ReadyToSend';
import Deleteforms from './src/screens/DeleteForm';
import EditForm from './src/screens/EditForm';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Screen
          name="ReadyToSendScreenEng"
          component={ReadyToSendScreenEng}
        />
        <Stack.Screen name="DownloadForm" component={DownloadForm} />
        <Stack.Screen name="DownloadFormFr" component={DownloadFormFr} />
        <Stack.Screen name="ReadyToSendScreen" component={ReadyToSendScreen} />
        <Stack.Screen name="Deleteforms" component={Deleteforms} />
        <Stack.Screen name="EditForm" component={EditForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
