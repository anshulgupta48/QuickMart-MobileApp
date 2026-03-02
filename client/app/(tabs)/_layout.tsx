import React from 'react';
import { Tabs } from 'expo-router';
import TabsBarIcon from '@/components/TabsBarIcon';
import { Icons } from '@/utils/icons';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: { minHeight: 60, paddingTop: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
    }}>
      <Tabs.Screen name='Home' options={{
        headerShown: false, title: 'Home', tabBarIcon: ({ focused }) => (
          <TabsBarIcon focused={focused} title='Home' icon={Icons.HomeIcon} />
        )
      }} />

      <Tabs.Screen name='Categories' options={{
        headerShown: false, title: 'Categories', tabBarIcon: ({ focused }) => (
          <TabsBarIcon focused={focused} title='Categories' icon={Icons.CategoriesIcon} />
        )
      }} />

      <Tabs.Screen name='MyCart' options={{
        headerShown: false, title: 'My Cart', tabBarIcon: ({ focused }) => (
          <TabsBarIcon focused={focused} title='My Cart' icon={Icons.CartIcon} />
        )
      }} />

      <Tabs.Screen name='Wishlist' options={{
        headerShown: false, title: 'Wishlist', tabBarIcon: ({ focused }) => (
          <TabsBarIcon focused={focused} title='Wishlist' icon={Icons.WishlistIcon} />
        )
      }} />

      <Tabs.Screen name='Profile' options={{
        headerShown: false, title: 'Profile', tabBarIcon: ({ focused }) => (
          <TabsBarIcon focused={focused} title='Profile' icon={Icons.ProfileIcon} />
        )
      }} />
    </Tabs>
  );
};

export default TabsLayout;