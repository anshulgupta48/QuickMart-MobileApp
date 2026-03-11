import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '@/utils/images';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { productsData } from '@/utils/constants';
import { Icons } from '@/utils/icons';
import CartProductCard from '@/components/CartProductCard';

const MyCart = () => {
  const [cartProductsData, setCartProductsData] = useState(productsData);
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      {(cartProductsData.length > 0) ? <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px]'>
          <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>My Cart</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='px-[16px] pb-[130px] flex flex-col justify-between gap-[60px]'>
              <View className='min-h-[330px] flex flex-col gap-[16px]'>
                <CartProductCard />
                <CartProductCard />
              </View>

              <View className='flex flex-col gap-[12px]'>
                <Text className='text-midnight-carbon text-[16px] font-inter-semibold'>Order Info</Text>

                <View className='flex flex-col'>
                  <View className='flex flex-row justify-between items-center gap-[20px]'>
                    <Text className='text-slate-fog text-[12px] font-inter-regular'>Subtotal</Text>
                    <Text className='text-slate-fog text-[12px] font-inter-regular'>$27.25</Text>
                  </View>

                  <View className='flex flex-row justify-between items-center gap-[20px]'>
                    <Text className='text-slate-fog text-[12px] font-inter-regular'>Shipping Cost</Text>
                    <Text className='text-slate-fog text-[12px] font-inter-regular'>$0.00</Text>
                  </View>

                  <View className='flex flex-row justify-between items-center gap-[20px]'>
                    <Text className='text-midnight-carbon text-[16px] font-inter-medium'>Total</Text>
                    <Text className='text-midnight-carbon text-[16px] font-inter-medium'>$27.25</Text>
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full mt-[8px] bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={() => router.push('/(routes)/Checkout')}>
                  <Text className='text-pure-canvas text-[14px] font-inter-medium'>Checkout (2)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View> : <View className='h-screen w-full px-[16px] flex flex-col justify-center items-center gap-[24px]'>
        <View className='flex flex-col items-center'>
          <SvgImage source={Images.CartBanner} height={240} width={240} />
          <Text className='text-midnight-carbon text-[24px] font-inter-bold'>Your cart is empty</Text>
          <Text className='text-slate-fog text-[14px] font-inter-regular text-center'>Looks like you have not added anything in your cart. Go ahead and explore top categories.</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={() => router.push('/(tabs)/Categories')}>
          <Text className='text-pure-canvas text-[14px] font-inter-regular'>Explore Categories</Text>
        </TouchableOpacity>
      </View>}
    </SafeAreaView>
  );
};

export default MyCart;