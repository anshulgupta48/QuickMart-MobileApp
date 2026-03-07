import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icons } from '@/utils/icons';
import SvgImage from './SVGImage';
import { ProductCardProps } from '@/utils/interfaces';

const ProductCard = ({ banner, title, discountedPrice, originalPrice, colors }: ProductCardProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [showAllColors, setShowAllColors] = useState<boolean>(false);

  return (
    <View className='h-[227px] w-[160px] flex flex-col gap-[8px] relative'>
      <View className='rounded-[14px] overflow-hidden'>
        <SvgImage source={banner} height={138} width={160} />
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => setIsFavourite(!isFavourite)} className='absolute right-[6px] top-[6px] h-[24px] w-[24px] bg-midnight-carbon rounded-full flex justify-center items-center'>
        <SvgImage source={isFavourite ? Icons.HeartFilledIcon : Icons.HeartIcon} height={12} width={12} />
      </TouchableOpacity>

      <View className='flex flex-row items-center gap-[8px]'>
        <View className='flex flex-row items-center'>
          {(showAllColors ? colors : colors?.slice(0, 3))?.map((item, index) => (
            <View key={index} className={`h-[24px] w-[24px] rounded-full border-[2.5px] border-solid relative ${index === 0 ? 'border-ocean-blue' : 'border-transparent'}`} style={{ backgroundColor: item, right: 6 * index }}></View>
          ))}
        </View>

        {(colors.length > 3 && !showAllColors) && <TouchableOpacity activeOpacity={0.8} onPress={() => setShowAllColors(true)}>
          <Text className='border-b-[0.5px] border-solid border-midnight-carbon text-midnight-carbon text-[10px] font-inter-regular'>All {colors?.length} Colors</Text>
        </TouchableOpacity>}
      </View>

      <View className='flex flex-col'>
        <Text numberOfLines={1} className='text-midnight-carbon text-[14px] font-inter-medium'>{title}</Text>
        <Text className='text-midnight-carbon text-[12px] font-inter-medium'>${discountedPrice}</Text>
        <Text className='text-silver-mist text-[10px] font-inter-medium' style={{ textDecorationLine: 'line-through' }}>${originalPrice}</Text>
      </View>
    </View>
  );
};

export default ProductCard;