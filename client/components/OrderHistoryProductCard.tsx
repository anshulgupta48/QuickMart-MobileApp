import React from 'react';
import { View, Text } from 'react-native';
import { Images } from '@/utils/images';
import { Icons } from '@/utils/icons';
import SvgImage from './SVGImage';

const OrderHistoryProductCard = () => {
  return (
    <View className='h-[120px] w-full flex flex-row justify-between items-center gap-[8px]'>
      <View className='rounded-[12px] overflow-hidden'>
        <SvgImage source={Images.ProductBanner1} height={110} width={125} />
      </View>

      <View className='w-[60%] flex flex-col gap-[8px]'>
        <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Loop Silicone Strong Magnetic Watch</Text>

        <View className='flex flex-col'>
          <Text className='text-midnight-carbon text-[12px] font-inter-semibold leading-none'>$15.25</Text>
          <Text className='text-slate-fog text-[10px] font-inter-medium line-through'>$20.00</Text>
        </View>

        <View className='h-[32px] w-[96px] p-[4px] border-[1.5px] border-solid border-lavender-haze rounded-[8px] flex flex-row justify-between items-center gap-[4px]'>
          <View>
            <SvgImage source={Icons.MinusIcon} height={24} width={24} color='#C0C0C0' />
          </View>

          <Text className='text-slate-fog text-[16px] font-inter-medium'>1</Text>

          <View>
            <SvgImage source={Icons.PlusIcon} height={24} width={24} color='#C0C0C0' />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderHistoryProductCard;