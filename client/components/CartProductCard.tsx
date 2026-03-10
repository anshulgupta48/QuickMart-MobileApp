import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Images } from '@/utils/images';
import { Icons } from '@/utils/icons';
import SvgImage from './SVGImage';

const CartProductCard = () => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

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

        <View className='flex flex-row justify-between items-center gap-[10px]'>
          <View className='h-[32px] w-[96px] p-[4px] border-[1.5px] border-solid border-lavender-haze rounded-[8px] flex flex-row justify-between items-center gap-[4px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedQuantity((selectedQuantity - 1) > 1 ? (selectedQuantity - 1) : 1)}>
              <SvgImage source={Icons.MinusIcon} height={24} width={24} color={selectedQuantity > 1 ? '#1C1B1B' : '#C0C0C0'} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[16px] font-inter-medium'>{selectedQuantity}</Text>

            <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedQuantity((selectedQuantity + 1) < 10 ? (selectedQuantity + 1) : 10)}>
              <SvgImage source={Icons.PlusIcon} height={24} width={24} color={selectedQuantity < 10 ? '#1C1B1B' : '#C0C0C0'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <SvgImage source={Icons.DeleteIcon} height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartProductCard;