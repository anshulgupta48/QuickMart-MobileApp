import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import { privacyPolicyData } from '@/utils/constants';

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] flex flex-col gap-[12px]'>
        <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
            <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
          </TouchableOpacity>

          <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Privacy Policy</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
          <View className='px-[16px] pb-[20px] flex flex-col gap-[20px]'>
            <View className='flex flex-col'>
              <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Our Policy</Text>
              <Text className='text-slate-fog text-[14px] font-inter-medium'>At QuickMart, we are committed to protecting the privacy and security of our user&apos;s personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard the information obtained through our e-commerce app. By using QuickMart, you consent to the practices described in this policy.</Text>
            </View>

            {privacyPolicyData?.map((item, index) => (
              <View className='flex flex-col' key={index}>
                <Text className='text-midnight-carbon text-[14px] font-inter-medium'>{`${index + 1}. ${item?.title}:`}</Text>

                <View className='pl-[10px] flex flex-col'>
                  {item?.description?.map((subItem, subIndex) => (
                    <Text className='text-slate-fog text-[14px] font-inter-medium' key={subIndex}>- {subItem}</Text>
                  ))}
                </View>
              </View>
            ))}

            <Text className='text-slate-fog text-[14px] font-inter-medium'>If you have any questions or concerns about our Privacy Policy, please contact our customer support. By using QuickMart, you acknowledge that you have read and understood this Privacy Policy and agree to its terms and conditions.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;