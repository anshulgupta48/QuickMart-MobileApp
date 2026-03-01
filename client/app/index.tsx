import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import SvgImage from '@/components/SVGImage';
import { onboardingData } from '@/utils/constants';

const Onboarding = () => {
  const [activeOnboardingIndex, setActiveOnboardingIndex] = useState<number>(0);
  const router = useRouter();

  const handlePrevious = () => {
    if (activeOnboardingIndex > 0) {
      setActiveOnboardingIndex(activeOnboardingIndex - 1);
    }
  };

  const handleNext = () => {
    setActiveOnboardingIndex(activeOnboardingIndex + 1);
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <ScrollView className='h-full w-full'>
        <View className='h-full w-full px-[16px] pt-[20px] pb-[10px] flex flex-col gap-[36px]'>
          <View className='h-[408px] w-full px-[18px] py-[20px] bg-mint-whisper rounded-[32px] flex flex-col items-center gap-[46px]'>
            <View className='w-full flex flex-row justify-between items-center gap-[20px]'>
              <TouchableOpacity activeOpacity={activeOnboardingIndex === 0 ? 1 : 0.8} onPress={handlePrevious}>
                <SvgImage source={activeOnboardingIndex === 0 ? Images.Logo : Icons.ArrowLeftIcon} height={32} width={activeOnboardingIndex === 0 ? 104 : 32} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/(auth)/Login')}>
                <Text className='text-aqua-mint text-[14px] font-inter-regular'>Skip for now</Text>
              </TouchableOpacity>
            </View>

            <SvgImage source={onboardingData[activeOnboardingIndex].banner} height={240} width={240} />
          </View>

          <View className='w-full flex flex-col items-center gap-[24px]'>
            <View className='w-[90%] flex flex-col items-center gap-[16px]'>
              <Text className='text-midnight-carbon text-[24px] font-inter-bold text-center'>{onboardingData[activeOnboardingIndex].title}</Text>
              <Text className='text-midnight-carbon text-[14px] font-inter-regular text-center'>{onboardingData[activeOnboardingIndex].description}</Text>
            </View>

            <View className='w-full flex flex-row justify-between items-center gap-[8px]'>
              {activeOnboardingIndex !== 2 && <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex flex-row justify-center items-center' onPress={handleNext}>
                <Text className='text-pure-canvas text-[14px] font-inter-regular'>Next</Text>
              </TouchableOpacity>}

              {activeOnboardingIndex === 2 && <>
                <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-[50%] border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-row justify-center items-center' onPress={() => router.push('/(auth)/Login')}>
                  <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-[50%] bg-midnight-carbon rounded-[12px] flex flex-row justify-center items-center gap-[8px]' onPress={() => router.push('/(auth)/Login')}>
                  <Text className='text-pure-canvas text-[14px] font-inter-regular' numberOfLines={1}>Get Started</Text>
                  <SvgImage source={Icons.ArrowRightIcon} height={24} width={24} color='#FFFFFF' />
                </TouchableOpacity>
              </>}
            </View>

            <View className='h-[16px] w-[36px] bg-mint-whisper rounded-[12px] flex flex-row justify-center items-center gap-[4px]'>
              {[0, 1, 2].map((item) => (
                <View className={`h-[6px] w-[6px] rounded-full ${item === activeOnboardingIndex ? 'bg-aqua-mint' : 'bg-silver-mist'}`} key={item}></View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;