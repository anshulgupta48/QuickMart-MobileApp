import { StatusBar, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Images } from '@/utils/images';
import './globals.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View className='h-full w-full flex justify-center items-center'>
        <SvgImage source={Images.SplashScreenLogo} height={160} width={160} />
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle='light-content' />

      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/SignUp' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/Login' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/ForgotPassword' options={{ headerShown: false }} />
      </Stack>
    </>
  );
};