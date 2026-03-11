import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import { faqsData } from '@/utils/constants';

const FAQs = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] flex flex-col gap-[12px]'>
        <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
            <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
          </TouchableOpacity>

          <Text className='text-midnight-carbon text-[14px] font-inter-medium'>FAQs</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
          <View className='px-[16px] pb-[20px] flex flex-col gap-[16px]'>
            {faqsData?.map((item, index) => (
              <View className='flex flex-col' key={index}>
                <Text className='text-midnight-carbon text-[14px] font-inter-medium'>{item?.title}</Text>
                <Text className='text-slate-fog text-[14px] font-inter-medium'>{item?.description}</Text>
              </View>
            ))}

            <Text className='text-midnight-carbon text-[12px] font-inter-medium text-center'>For any query, you can visit our website for <Text className='text-ocean-blue'>Help Center</Text> at Quickmart.com</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FAQs;