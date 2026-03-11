import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgImage from '@/components/SVGImage';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import ToastComponent from '@/components/ToastComponent';
import { Images } from '@/utils/images';

const ChangePassword = () => {
  const [changePasswordFormData, setChangePasswordFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [activeChangePasswordIndex, setactiveChangePasswordIndex] = useState<number>(0);
  const [showResendCodeNotification, setShowResendCodeNotification] = useState<boolean>(false);
  const router = useRouter();

  const handlePrevious = () => {
    if (activeChangePasswordIndex > 0) {
      setactiveChangePasswordIndex(activeChangePasswordIndex - 1);
    } else {
      router.push('/Profile');
    }
  };

  const handleNext = () => {
    if (activeChangePasswordIndex === 2) {
      router.push('/(tabs)/Home');
    } else {
      setactiveChangePasswordIndex(activeChangePasswordIndex + 1);
    }
  };

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setChangePasswordFormData({ ...changePasswordFormData, [fieldName]: e.nativeEvent.text });
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <ToastComponent isActive={showResendCodeNotification} setIsActive={setShowResendCodeNotification} message='6-digit Verification code has been send to your email address.' />

      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px]'>
          {activeChangePasswordIndex !== 2 && <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row justify-between items-center gap-[10px]'>
            <View className='flex flex-row items-center gap-[12px]'>
              <TouchableOpacity activeOpacity={0.8} onPress={handlePrevious}>
                <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
              </TouchableOpacity>

              <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Change Password</Text>
            </View>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>0{activeChangePasswordIndex + 1}/<Text className='text-silver-mist'>02</Text></Text>
          </View>}

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='w-full px-[16px] flex flex-col gap-[24px]'>
              {activeChangePasswordIndex === 0 && <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Old Password</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Enter old password to change the password.</Text>
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Password <Text className='text-crimson-alert'>*</Text></Text>

                  <View className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300'>
                    <TextInput placeholder='Enter your Password' placeholderTextColor='#C0C0C0' value={changePasswordFormData.password} onChange={(e) => handleChange('password', e)} secureTextEntry={!showPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
                      <SvgImage source={showPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>}

              {activeChangePasswordIndex === 1 && <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>New Password</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Enter your new password and remember it.</Text>
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Password <Text className='text-crimson-alert'>*</Text></Text>

                  <View className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300'>
                    <TextInput placeholder='Enter your Password' placeholderTextColor='#C0C0C0' value={changePasswordFormData.password} onChange={(e) => handleChange('password', e)} secureTextEntry={!showPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
                      <SvgImage source={showPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Confirm Password <Text className='text-crimson-alert'>*</Text></Text>

                  <View className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300'>
                    <TextInput placeholder='Enter your Confirm Password' placeholderTextColor='#C0C0C0' value={changePasswordFormData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e)} secureTextEntry={!showConfirmPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <SvgImage source={showConfirmPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>}

              {activeChangePasswordIndex === 2 && <View className='flex flex-col gap-[24px]'>
                <View className='h-[408px] w-full bg-mint-whisper rounded-[32px] flex justify-center items-center'>
                  <SvgImage source={Images.ForgotPasswordBanner} height={301} width={245} />
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold text-center'>Password changed successfully</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular text-center'>Congratulations! Your password has been changed successfully.</Text>
                </View>
              </View>}

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleNext}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>{activeChangePasswordIndex === 0 ? 'Continue' : (activeChangePasswordIndex === 1 ? 'Save' : 'Continue Shopping')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;