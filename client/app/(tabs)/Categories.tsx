import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import SvgImage from '@/components/SVGImage';
import { categoriesData } from '@/utils/constants';

const Categories = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px]'>
          <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Categories</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='flex flex-row justify-center items-center gap-[8px] flex-wrap'>
              {categoriesData.map((item, index) => (
                <View key={index} className='h-[100px] w-[44%] border-[1.5px] border-solid border-lavender-haze rounded-[16px] flex flex-col justify-center items-center'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>{item.icon}</Text>
                  <Text className='text-midnight-carbon text-[13px] font-inter-semibold text-center'>{item.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Categories;