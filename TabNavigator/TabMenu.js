import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Diary, MainScreen, Practices, Profile} from '../screen/tab';
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#00FF7F',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../assets/images/icons/home.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Practices"
        component={Practices}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../assets/images/icons/calendar.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../assets/images/icons/diary.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../assets/images/icons/profile.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabMenu;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#231D37',
    borderTopWidth: 0,
    height: 90,
    paddingBottom: 5,
    paddingTop: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  icon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 10,
  },
});
