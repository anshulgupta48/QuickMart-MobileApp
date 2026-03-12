import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgImage from '@/components/SVGImage';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import { numericIconsData } from '@/utils/constants';
import ToastComponent from '@/components/ToastComponent';
import { Images } from '@/utils/images';
import { ForgotPasswordDataType } from '@/utils/interfaces';

const ForgotPassword = () => {
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordDataType>({ email: '', password: '', confirmPassword: '' });
  const [forgotPasswordFormErrors, setForgotPasswordFormErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [activeForgotPasswordIndex, setActiveForgotPasswordIndex] = useState<number>(0);
  const [emailVerificationCode, setEmailVerificationCode] = useState<string[]>([]);
  const [showResendCodeNotification, setShowResendCodeNotification] = useState<boolean>(false);
  const router = useRouter();

  const handlePrevious = () => {
    if (activeForgotPasswordIndex > 0) {
      setActiveForgotPasswordIndex(activeForgotPasswordIndex - 1);
    } else {
      router.push('/(auth)/Login');
    }
  };

  const handleNext = () => {
    let updatedForgotPasswordFormErrors = [];

    if (activeForgotPasswordIndex === 0 && forgotPasswordFormData.email === '') {
      updatedForgotPasswordFormErrors.push('email');
    }
    else if (activeForgotPasswordIndex === 1) {
      for (let i = 0; i < 6; i++) {
        if (!emailVerificationCode[i]) {
          updatedForgotPasswordFormErrors.push(`emailVerificationCode${i}`);
        }
      }
    }
    else if (activeForgotPasswordIndex === 2) {
      if (forgotPasswordFormData.password === '' || (forgotPasswordFormData.password !== forgotPasswordFormData.confirmPassword)) {
        updatedForgotPasswordFormErrors.push('password');
      }
      if (forgotPasswordFormData.confirmPassword === '' || (forgotPasswordFormData.password !== forgotPasswordFormData.confirmPassword)) {
        updatedForgotPasswordFormErrors.push('confirmPassword');
      }
    }

    setForgotPasswordFormErrors(updatedForgotPasswordFormErrors);
    if (updatedForgotPasswordFormErrors.length === 0) {
      if (activeForgotPasswordIndex === 3) {
        router.push('/(auth)/Login');
      } else {
        setActiveForgotPasswordIndex(activeForgotPasswordIndex + 1);
      }
    }
  };

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setForgotPasswordFormErrors([]);
    setForgotPasswordFormData({ ...forgotPasswordFormData, [fieldName]: e.nativeEvent.text });
  };

  const handleEmailVerificationCode = (selectedCode: string) => {
    setForgotPasswordFormErrors([]);

    if (selectedCode === 'C') {
      setEmailVerificationCode([]);
    }
    else if (selectedCode === '<-') {
      setEmailVerificationCode(emailVerificationCode.slice(0, -1));
    }
    else if (emailVerificationCode.length < 6) {
      setEmailVerificationCode([...emailVerificationCode, selectedCode]);
    }
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <ToastComponent isActive={showResendCodeNotification} setIsActive={setShowResendCodeNotification} message='6-digit Verification code has been send to your email address.' />

      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px]'>
          {activeForgotPasswordIndex !== 3 && <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row justify-between items-center gap-[10px]'>
            <View className='flex flex-row items-center gap-[12px]'>
              <TouchableOpacity activeOpacity={0.8} onPress={handlePrevious}>
                <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
              </TouchableOpacity>

              <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Forgot Password</Text>
            </View>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>0{activeForgotPasswordIndex + 1}/<Text className='text-silver-mist'>03</Text></Text>
          </View>}

          <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
            <View className='w-full px-[16px] flex flex-col gap-[24px]'>
              {activeForgotPasswordIndex === 0 && <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Confirmation Email</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Enter your email address for verification.</Text>
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Email <Text className='text-crimson-alert'>*</Text></Text>

                  <TextInput placeholder='Enter your Email' placeholderTextColor='#C0C0C0' value={forgotPasswordFormData.email} onChange={(e) => handleChange('email', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${forgotPasswordFormErrors.includes('email') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                </View>
              </View>}

              {activeForgotPasswordIndex === 1 && <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Email Verification</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Enter the 6-digit verification code send to your email address.</Text>
                </View>

                <View className='flex flex-row items-center gap-[8px]'>
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <View className={`h-[48px] w-[48px] border-[1.5px] border-solid rounded-[12px] flex justify-center items-center ${forgotPasswordFormErrors.includes(`emailVerificationCode${item}`) ? 'border-crimson-alert' : (emailVerificationCode[item] ? 'border-aqua-mint' : 'border-lavender-haze')}`} key={item}>
                      <Text className='text-midnight-carbon text-[16px] font-inter-medium'>{emailVerificationCode[item] || ''}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity activeOpacity={0.8} className='flex justify-center items-center' onPress={() => setShowResendCodeNotification(true)}>
                  <Text className='text-aqua-mint text-[14px] font-inter-regular'>Resend Code</Text>
                </TouchableOpacity>
              </View>}

              {activeForgotPasswordIndex === 2 && <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>New Password</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Enter your new password and remember it.</Text>
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Password <Text className='text-crimson-alert'>*</Text></Text>

                  <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300 ${forgotPasswordFormErrors.includes('password') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                    <TextInput placeholder='Enter your Password' placeholderTextColor='#C0C0C0' value={forgotPasswordFormData.password} onChange={(e) => handleChange('password', e)} secureTextEntry={!showPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
                      <SvgImage source={showPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Confirm Password <Text className='text-crimson-alert'>*</Text></Text>

                  <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300 ${forgotPasswordFormErrors.includes('confirmPassword') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                    <TextInput placeholder='Enter your Confirm Password' placeholderTextColor='#C0C0C0' value={forgotPasswordFormData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e)} secureTextEntry={!showConfirmPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <SvgImage source={showConfirmPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>}

              {activeForgotPasswordIndex === 3 && <View className='flex flex-col gap-[24px]'>
                <View className='h-[408px] w-full bg-mint-whisper rounded-[32px] flex justify-center items-center'>
                  <SvgImage source={Images.ForgotPasswordBanner} height={301} width={245} />
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold text-center'>New password set successfully</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular text-center'>Congratulations! Your password has been set successfully. Please proceed to the login screen to verify your account.</Text>
                </View>
              </View>}

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleNext}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>{activeForgotPasswordIndex === 0 ? 'Send' : (activeForgotPasswordIndex === 1 ? 'Proceed' : (activeForgotPasswordIndex === 2 ? 'Save' : 'Login'))}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {activeForgotPasswordIndex === 1 && <View className='w-full px-[16px] flex flex-row justify-between items-center flex-wrap gap-[8px]'>
          {numericIconsData.map((item, index) => (
            <TouchableOpacity activeOpacity={0.8} className='h-[70px] w-[31%] bg-mint-whisper rounded-[12px] flex justify-center items-center' onPress={() => handleEmailVerificationCode(item)} key={index}>
              <Text className='text-midnight-carbon text-[18px] font-inter-bold'>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;