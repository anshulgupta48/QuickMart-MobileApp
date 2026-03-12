import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgImage from '@/components/SVGImage';
import { Link, useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import { numericIconsData } from '@/utils/constants';
import ToastComponent from '@/components/ToastComponent';
import { SignUpFormDataType } from '@/utils/interfaces';

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormDataType>({ fullName: '', email: '', password: '' });
  const [signUpFormErrors, setSignUpFormErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeSignUpIndex, setActiveSignUpIndex] = useState<number>(0);
  const [emailVerificationCode, setEmailVerificationCode] = useState<string[]>([]);
  const [showResendCodeNotification, setShowResendCodeNotification] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setSignUpFormErrors([]);
    setSignUpFormData({ ...signUpFormData, [fieldName]: e.nativeEvent.text });
  };

  const handleCreateAccount = () => {
    let updatedSignUpFormErrors = [];
    if (signUpFormData.fullName === '') {
      updatedSignUpFormErrors.push('fullName');
    }
    if (signUpFormData.email === '') {
      updatedSignUpFormErrors.push('email');
    }
    if (signUpFormData.password === '') {
      updatedSignUpFormErrors.push('password');
    }

    setSignUpFormErrors(updatedSignUpFormErrors);
    if (updatedSignUpFormErrors.length === 0) {
      setActiveSignUpIndex(1);
    }
  };

  const handleEmailVerificationCode = (selectedCode: string) => {
    setSignUpFormErrors([]);

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

  const handleEmailVerificationProceed = () => {
    let updatedSignUpFormErrors = [];

    for (let i = 0; i < 6; i++) {
      if (!emailVerificationCode[i]) {
        updatedSignUpFormErrors.push(`emailVerificationCode${i}`);
      }
    }

    setSignUpFormErrors(updatedSignUpFormErrors);
    if (updatedSignUpFormErrors.length === 0) {
      router.push('/(auth)/Login');
    }
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <ToastComponent isActive={showResendCodeNotification} setIsActive={setShowResendCodeNotification} message='6-digit Verification code has been send to your email address.' />

      {activeSignUpIndex === 0 && <View className='w-full px-[16px] pt-[20px] pb-[10px] flex flex-col gap-[24px]'>
        <SvgImage source={Images.Logo} height={32} width={104} />

        <View className='flex flex-col gap-[32px]'>
          <View className='flex flex-col gap-[2px]'>
            <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Signup</Text>

            <View className='flex flex-row items-center gap-[5px]'>
              <Text className='text-slate-fog text-[14px] font-inter-regular'>Already have an account?</Text>
              <Link href='/(auth)/Login' className='text-aqua-mint text-[14px] font-inter-medium'>Login</Link>
            </View>
          </View>

          <View className='flex flex-col gap-[16px]'>
            <View className='flex flex-col gap-[8px]'>
              <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Full Name <Text className='text-crimson-alert'>*</Text></Text>

              <TextInput placeholder='Enter your Full-Name' placeholderTextColor='#C0C0C0' value={signUpFormData.fullName} onChange={(e) => handleChange('fullName', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${signUpFormErrors.includes('fullName') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
            </View>

            <View className='flex flex-col gap-[8px]'>
              <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Email <Text className='text-crimson-alert'>*</Text></Text>

              <TextInput placeholder='Enter your Email' placeholderTextColor='#C0C0C0' value={signUpFormData.email} onChange={(e) => handleChange('email', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${signUpFormErrors.includes('email') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
            </View>

            <View className='flex flex-col gap-[8px]'>
              <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Password <Text className='text-crimson-alert'>*</Text></Text>

              <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300 ${signUpFormErrors.includes('password') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                <TextInput placeholder='Enter your Password' placeholderTextColor='#C0C0C0' value={signUpFormData.password} onChange={(e) => handleChange('password', e)} secureTextEntry={!showPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
                  <SvgImage source={showPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className='flex flex-col gap-[16px]'>
          <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleCreateAccount}>
            <Text className='text-pure-canvas text-[14px] font-inter-medium'>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-row justify-center items-center gap-[8px]'>
            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Signup with Google</Text>
            <SvgImage source={Icons.GoogleIcon} height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>}

      {activeSignUpIndex === 1 && <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
        <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
          <View className='w-full flex flex-col gap-[12px]'>
            <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setActiveSignUpIndex(0)}>
                <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
              </TouchableOpacity>

              <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Verification Code</Text>
            </View>

            <View className='w-full px-[16px] flex flex-col gap-[24px]'>
              <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Email Verification</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Enter the 6-digit verification code send to your email address.</Text>
                </View>

                <View className='flex flex-row items-center gap-[8px]'>
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <View className={`h-[48px] w-[48px] border-[1.5px] border-solid rounded-[12px] flex justify-center items-center ${signUpFormErrors.includes(`emailVerificationCode${item}`) ? 'border-crimson-alert' : (emailVerificationCode[item] ? 'border-aqua-mint' : 'border-lavender-haze')}`} key={item}>
                      <Text className='text-midnight-carbon text-[16px] font-inter-medium'>{emailVerificationCode[item] || ''}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity activeOpacity={0.8} className='flex justify-center items-center' onPress={() => setShowResendCodeNotification(true)}>
                  <Text className='text-aqua-mint text-[14px] font-inter-regular'>Resend Code</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleEmailVerificationProceed}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='w-full px-[16px] flex flex-row justify-between items-center flex-wrap gap-[8px]'>
            {numericIconsData.map((item, index) => (
              <TouchableOpacity activeOpacity={0.8} className='h-[70px] w-[31%] bg-mint-whisper rounded-[12px] flex justify-center items-center' onPress={() => handleEmailVerificationCode(item)} key={index}>
                <Text className='text-midnight-carbon text-[18px] font-inter-bold'>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>}
    </SafeAreaView>
  );
};

export default SignUp;