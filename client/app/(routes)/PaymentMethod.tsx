import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import ToastComponent from '@/components/ToastComponent';

const PaymentMethod = () => {
  const [paymentMethodFormData, setPaymentMethodFormData] = useState({ cardHolderName: '', cardNumber: '', expiration: '', cvv: '' });
  const [showPaymentMethodNotification, setShowPaymentMethodNotification] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setPaymentMethodFormData({ ...paymentMethodFormData, [fieldName]: e.nativeEvent.text });
  };

  const handleSave = () => {
    setShowPaymentMethodNotification(true);
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <ToastComponent isActive={showPaymentMethodNotification} setIsActive={setShowPaymentMethodNotification} message='Payment Method updated Successfully.' />

        <View className='w-full flex flex-col gap-[12px] relative'>
          <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Payment Method</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='px-[16px] pt-[12px] pb-[60px] flex flex-col gap-[24px]'>
              <View className='min-h-[550px] w-full flex flex-col gap-[24px]'>
                <View className='flex flex-row justify-between items-center gap-[8px]'>
                  <View className='h-[64px] w-[50%] bg-mint-whisper rounded-[12px] flex justify-center items-center'>
                    <SvgImage source={Icons.PaypalIcon} height={17} width={62} />
                  </View>

                  <View className='h-[64px] w-[50%] bg-mint-whisper rounded-[12px] flex justify-center items-center'>
                    <SvgImage source={Icons.GPayIcon} height={17} width={62} />
                  </View>
                </View>

                <View className='flex flex-col gap-[12px]'>
                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Card Holder Name <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter Card-Holder Name' placeholderTextColor='#C0C0C0' value={paymentMethodFormData.cardHolderName} onChange={(e) => handleChange('cardHolderName', e)} className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Card Number <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='4111 1111 1111 1111' placeholderTextColor='#C0C0C0' value={paymentMethodFormData.cardNumber} onChange={(e) => handleChange('cardNumber', e)} className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                  </View>

                  <View className='flex flex-row items-center gap-[8px]'>
                    <View className='w-[50%] flex flex-col gap-[8px]'>
                      <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Expiration <Text className='text-crimson-alert'>*</Text></Text>

                      <TextInput placeholder='MM/YY' placeholderTextColor='#C0C0C0' value={paymentMethodFormData.expiration} onChange={(e) => handleChange('expiration', e)} className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                    </View>

                    <View className='w-[50%] flex flex-col gap-[8px]'>
                      <Text className='text-midnight-carbon text-[14px] font-inter-medium'>CVV <Text className='text-crimson-alert'>*</Text></Text>

                      <TextInput placeholder='4111 1111 1111 1111' placeholderTextColor='#C0C0C0' value={paymentMethodFormData.cvv} onChange={(e) => handleChange('cvv', e)} className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleSave}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethod;