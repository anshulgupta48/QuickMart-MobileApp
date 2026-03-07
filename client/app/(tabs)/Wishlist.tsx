import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import SvgImage from '@/components/SVGImage';
import { productsData } from '@/utils/constants';
import LatestProductCard from '@/components/LatestProductCard';
import { Images } from '@/utils/images';

const Wishlist = () => {
  const router = useRouter();
  const [wishlistProductsData, setWishlistProductsData] = useState(productsData);

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      {(wishlistProductsData.length > 0) ? (<View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px]'>
          <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Wishlist</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='px-[16px] pb-[132px] flex flex-row justify-between items-center gap-x-[8px] gap-y-[12px] flex-wrap'>
              {wishlistProductsData?.map((item, index) => (
                <LatestProductCard banner={item?.banner} title={item?.title} discountedPrice={item?.discountedPrice} originalPrice={item?.originalPrice} colors={item?.colors} isWishlisted={true} key={index} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>) : (<View className='h-screen w-full px-[16px] flex flex-col justify-center items-center gap-[24px]'>
        <View className='flex flex-col items-center'>
          <SvgImage source={Images.WishlistBanner} height={240} width={240} />
          <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Your wishlist is empty</Text>
          <Text className='text-slate-fog text-[14px] font-inter-regular text-center'>Tap heart button to start saving your favorite items.</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={() => router.push('/(tabs)/Categories')}>
          <Text className='text-pure-canvas text-[14px] font-inter-regular'>Explore Categories</Text>
        </TouchableOpacity>
      </View>)}
    </SafeAreaView>
  );
};

export default Wishlist;