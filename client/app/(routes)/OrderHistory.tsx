import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import { productsData } from '@/utils/constants';
import OrderHistoryProductCard from '@/components/OrderHistoryProductCard';

const OrderHistory = () => {
  const [ongoingProductsData, setOngoingProductsData] = useState(productsData);
  const [completedProductsData, setCompletedProductsData] = useState(productsData);
  const [activeOrderHistoryIndex, setActiveOrderHistoryIndex] = useState<number>(0);
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] flex flex-col gap-[12px]'>
        <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
            <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
          </TouchableOpacity>

          <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Order History</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
          <View className='px-[16px] pb-[20px] flex flex-col gap-[24px]'>
            <View className='h-[52px] w-full p-[4px] bg-lavender-haze rounded-[12px] flex flex-row items-center gap-[8px]'>
              {['Ongoing', 'Completed']?.map((item, index) => (
                <TouchableOpacity activeOpacity={0.8} key={index} className={`h-full w-[50%] rounded-[12px] flex justify-center items-center ${activeOrderHistoryIndex === index ? 'bg-midnight-carbon' : 'bg-transparent'}`} onPress={() => setActiveOrderHistoryIndex(index)}>
                  <Text className={`text-[14px] font-inter-semibold ${activeOrderHistoryIndex === index ? 'text-pure-canvas' : 'text-midnight-carbon'}`}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {activeOrderHistoryIndex === 0 && (ongoingProductsData?.length > 0 ? (<View className='flex flex-col gap-[16px]'>
              <View className='flex flex-col gap-[4px]'>
                <View className='h-[24px] w-[180px] bg-crimson-alert rounded-[5px] flex justify-center items-center'>
                  <Text className='text-pure-canvas text-[10px] font-inter-semibold'>Estimated time: 7 working days</Text>
                </View>
                <OrderHistoryProductCard />
              </View>

              <View className='flex flex-col gap-[4px]'>
                <View className='h-[24px] w-[180px] bg-crimson-alert rounded-[5px] flex justify-center items-center'>
                  <Text className='text-pure-canvas text-[10px] font-inter-semibold'>Estimated time: 7 working days</Text>
                </View>
                <OrderHistoryProductCard />
              </View>
            </View>) : (<View className='flex flex-col gap-[20px]'>
              <View className='flex flex-col items-center gap-[8px]'>
                <SvgImage source={Images.OrderHistoryBanner} height={240} width={240} />
                <Text className='text-midnight-carbon text-[24px] font-inter-bold'>No ongoing order</Text>
                <Text className='text-slate-fog text-[14px] font-inter-medium text-center'>We currently don&apos;t have any active orders in progress. Feel free to explore our products and place a new order.</Text>
              </View>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={() => router.push('/(tabs)/Categories')}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Explore Categories</Text>
              </TouchableOpacity>
            </View>))}

            {activeOrderHistoryIndex === 1 && (completedProductsData?.length > 0 ? (<View className='flex flex-col gap-[16px]'>
              <View className='flex flex-col gap-[4px]'>
                <View className='flex flex-row justify-between items-center gap-[10px]'>
                  <View className='h-[24px] w-[70px] bg-ocean-blue rounded-[5px] flex justify-center items-center'>
                    <Text className='text-pure-canvas text-[10px] font-inter-semibold'>Delivered</Text>
                  </View>

                  <Text className='text-silver-mist text-[10px] font-inter-semibold'>7 July, 2026</Text>
                </View>

                <OrderHistoryProductCard />
              </View>

              <View className='flex flex-col gap-[4px]'>
                <View className='flex flex-row justify-between items-center gap-[10px]'>
                  <View className='h-[24px] w-[70px] bg-ocean-blue rounded-[5px] flex justify-center items-center'>
                    <Text className='text-pure-canvas text-[10px] font-inter-semibold'>Delivered</Text>
                  </View>

                  <Text className='text-silver-mist text-[10px] font-inter-semibold'>7 July, 2026</Text>
                </View>

                <OrderHistoryProductCard />
              </View>
            </View>) : (<View className='flex flex-col gap-[20px]'>
              <View className='flex flex-col items-center gap-[8px]'>
                <SvgImage source={Images.OrderHistoryBanner} height={240} width={240} />
                <Text className='text-midnight-carbon text-[24px] font-inter-bold'>No completed order</Text>
                <Text className='text-slate-fog text-[14px] font-inter-medium text-center'>We don&apos;t have any past orders that have been completed. Start shopping now and create your first order with us.</Text>
              </View>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={() => router.push('/(tabs)/Categories')}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Explore Categories</Text>
              </TouchableOpacity>
            </View>))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistory;