import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {useProductStore} from './src/store/UseProductStore';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const {width} = Dimensions.get('window');

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const CustomHeader = ({title, onBackPress}) => (
  <View style={styles.headerContainer}>
    {onBackPress && (
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const App = () => {
  const isTablet = useProductStore(state => state.isTablet);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isTablet ? (
          <AppNavigator />
        ) : (
          <Stack.Navigator
            screenOptions={{
              header: ({navigation, route, options}) => (
                <CustomHeader
                  title={route.name}
                  onBackPress={
                    navigation.canGoBack() ? navigation.goBack : null
                  }
                />
              ),
            }}>
            <Stack.Screen
              name="Products"
              component={AppNavigator}
              options={{headerShown: true}} // Custom header will be applied
            />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{headerShown: true}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 100 : 70, // Adjust height for iOS and Android
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: Platform.OS === 'ios' ? 40 : 0, // Add padding for iOS status bar
  },
  backButton: {
    marginLeft: 8,
  },
  backText: {
    fontSize: 18,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default App;
