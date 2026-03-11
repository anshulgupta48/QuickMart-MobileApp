import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import SvgImage from '@/components/SVGImage';
import LatestProductCard from '@/components/LatestProductCard';
import { categoriesData, productsData } from '@/utils/constants';

const Home = () => {
  const [latestProductsData, setLatestProductsData] = useState(productsData);

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
        <View className='w-full px-[16px] pt-[20px] pb-[25px] flex flex-col gap-[24px]'>
          <View className='flex flex-row justify-between items-center gap-[20px]'>
            <SvgImage source={Images.Logo} height={32} width={104} />

            <View className='flex flex-row items-center gap-[12px]'>
              <SvgImage source={Icons.SearchIcon} height={32} width={32} />
              <SvgImage source={Images.ProfileBanner} height={32} width={32} style={{ borderRadius: '8px', overflow: 'hidden' }} />
            </View>
          </View>

          <SvgImage source={Images.HomeBanner} height={148} width={328} />

          <View className='flex flex-col gap-[12px]'>
            <View className='flex flex-row justify-between items-center gap-[20px]'>
              <Text className='text-midnight-carbon text-[18px] font-inter-bold'>Categories</Text>
              <Link href='/(tabs)/Categories' className='text-aqua-mint text-[10px] font-inter-semibold uppercase'>See All</Link>
            </View>

            <View className='flex flex-row justify-between items-center gap-[8px]'>
              {categoriesData.slice(0, 4).map((item, index) => (
                <View key={index} className='h-[60px] w-[22%] border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-col justify-center items-center'>
                  <Text className='text-midnight-carbon text-[20px] font-inter-bold'>{item.icon}</Text>
                  <Text className='text-midnight-carbon text-[12px] font-inter-semibold'>{item.title}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className='flex flex-col gap-[12px]'>
            <View className='flex flex-row justify-between items-center gap-[20px]'>
              <Text className='text-midnight-carbon text-[18px] font-inter-bold'>Latest Products</Text>
              <Link href='/(routes)/LatestProducts' className='text-aqua-mint text-[10px] font-inter-semibold uppercase'>See All</Link>
            </View>

            <View className='flex flex-row justify-between items-center gap-x-[8px] gap-y-[12px] flex-wrap'>
              {latestProductsData?.map((item, index) => (
                <LatestProductCard banner={item?.banner} title={item?.title} discountedPrice={item?.discountedPrice} originalPrice={item?.originalPrice} colors={item?.colors} isWishlisted={false} key={index} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;