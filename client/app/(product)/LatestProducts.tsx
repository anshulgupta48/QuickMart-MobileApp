import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import SvgImage from '@/components/SVGImage';
import { productFiltersData, productsData } from '@/utils/constants';
import LatestProductCard from '@/components/LatestProductCard';

const LatestProducts = () => {
  const [latestProductsData, setLatestProductsData] = useState(productsData);
  const [searchBarInputData, setSearchBarInputData] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px] relative'>
          <View className={`absolute left-0 top-[-20px] h-screen w-full flex justify-end ${showFilter ? 'bg-midnight-carbon/60 z-10' : 'bg-transparent'}`}>
            <View className={`h-[388px] w-full py-[8px] bg-pure-canvas rounded-tl-[24px] rounded-tr-[24px] flex flex-col items-center gap-[24px] transition-all duration-300 ${showFilter ? 'translate-y-0' : 'translate-y-[500px]'}`}>
              <View className='h-[1.5px] w-[60px] bg-slate-fog'></View>

              <View className='w-full flex flex-col gap-[16px]'>
                <Text className='px-[16px] text-midnight-carbon text-[16px] font-inter-semibold'>Filter</Text>

                <View className='w-full flex flex-col'>
                  {productFiltersData.map((item, index) => (
                    <View className='h-[56px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row items-center gap-[12px]' key={index}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedFilter(index)}>
                        <SvgImage source={(selectedFilter === index) ? Icons.CheckBoxFilledIcon : Icons.CheckBoxIcon} height={32} width={32} />
                      </TouchableOpacity>

                      <Text className='text-midnight-carbon text-[14px] font-inter-semibold'>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={() => setShowFilter(!showFilter)}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Latest Products</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='h-full w-full px-[16px] flex flex-col gap-[16px]'>
              <View className='h-[56px] w-full px-[12px] border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-row justify-between items-center gap-[10px]'>
                <View className='w-[70%] flex flex-row items-center gap-[4px]'>
                  <SvgImage source={Icons.SearchIcon} height={24} width={24} />
                  <TextInput placeholder='Search Products' placeholderTextColor='#6F7384' className='text-midnight-carbon text-[12px] font-inter-regular' value={searchBarInputData} onChange={(e) => setSearchBarInputData(e.nativeEvent.text)} />
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => setShowFilter(true)}>
                  <SvgImage source={Icons.FilterIcon} height={24} width={24} />
                </TouchableOpacity>
              </View>

              <View className='pb-[80px] flex flex-row justify-between items-center gap-x-[8px] gap-y-[12px] flex-wrap'>
                {latestProductsData?.map((item, index) => (
                  <LatestProductCard banner={item?.banner} title={item?.title} discountedPrice={item?.discountedPrice} originalPrice={item?.originalPrice} colors={item?.colors} isWishlisted={false} key={index} />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LatestProducts;