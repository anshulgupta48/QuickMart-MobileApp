import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgImage from '@/components/SVGImage';
import { Link, useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setLoginFormData({ ...loginFormData, [fieldName]: e.nativeEvent.text });
  };

  const handleLogin = () => {
    router.push('/(tabs)/Home');
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
        <View className='h-screen w-full px-[16px] pt-[20px] pb-[10px] flex flex-col justify-between'>
          <View className='w-full flex flex-col gap-[24px]'>
            <SvgImage source={Images.Logo} height={32} width={104} />

            <View className='flex flex-col gap-[32px]'>
              <View className='flex flex-col gap-[2px]'>
                <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Login</Text>

                <View className='flex flex-row items-center gap-[5px]'>
                  <Text className='text-slate-fog text-[14px] font-inter-regular'>Don&apos;t have an account?</Text>
                  <Link href='/(auth)/SignUp' className='text-aqua-mint text-[14px] font-inter-medium'>Signup</Link>
                </View>
              </View>

              <View className='flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Email <Text className='text-crimson-alert'>*</Text></Text>

                  <TextInput placeholder='Enter your Email' placeholderTextColor='#C0C0C0' value={loginFormData.email} onChange={(e) => handleChange('email', e)} className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[14px] font-inter-regular'>Password <Text className='text-crimson-alert'>*</Text></Text>

                  <View className='h-[60px] w-full px-[16px] border-[1.5px] border-solid border-lavender-haze focus:border-aqua-mint rounded-[12px] flex flex-row items-center gap-[10px] transition-all duration-300'>
                    <TextInput placeholder='Enter your Password' placeholderTextColor='#C0C0C0' value={loginFormData.password} onChange={(e) => handleChange('password', e)} secureTextEntry={!showPassword} className='h-full w-[90%] text-midnight-carbon text-[12px] font-inter-regular' />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
                      <SvgImage source={showPassword ? Icons.EyeSlashIcon : Icons.EyeIcon} height={24} width={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View className='flex flex-row justify-end items-center'>
              <Link href='/(auth)/ForgotPassword' className='text-aqua-mint text-[14px] font-inter-medium'>Forgot Password</Link>
            </View>

            <View className='flex flex-col gap-[16px]'>
              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleLogin}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-row justify-center items-center gap-[8px]'>
                <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Login with Google</Text>
                <SvgImage source={Icons.GoogleIcon} height={24} width={24} />
              </TouchableOpacity>
            </View>
          </View>

          <Text className='text-midnight-carbon text-[12px] font-inter-medium text-center'>By login , you agree to our <Text className='text-ocean-blue'>Privacy Policy</Text> and <Text className='text-ocean-blue'>Terms & Conditions</Text>.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;