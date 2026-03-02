import React from 'react';
import { View, Text } from 'react-native';
import { TabsBarIconProps } from '@/utils/interfaces';
import SvgImage from './SVGImage';

const TabsBarIcon = ({ focused, title, icon }: TabsBarIconProps) => {
  return (
    <View className='min-w-[65px] flex flex-col items-center'>
      <SvgImage source={icon} height={24} width={24} color={focused ? '#21D4B4' : '#6F7384'} />
      <Text numberOfLines={1} className={`text-[12px] font-inter-medium ${focused ? 'text-aqua-mint' : 'text-slate-fog'}`}>{title}</Text>
    </View>
  );
};

export default TabsBarIcon;