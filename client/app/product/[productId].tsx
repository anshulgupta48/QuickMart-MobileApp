import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import SvgImage from '@/components/SVGImage';
import ToastComponent from '@/components/ToastComponent';

const ProductDetails = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [showAddToCartNotification, setShowAddToCartNotification] = useState<boolean>(false);
  const router = useRouter();

  const handleBuyNow = () => {
    router.push('/(tabs)/MyCart');
  };

  const handleAddToCart = () => {
    setShowAddToCartNotification(true);
  };

  return (
    <SafeAreaView className='h-full w-full'>
      <ToastComponent isActive={showAddToCartNotification} setIsActive={setShowAddToCartNotification} message='The product has been added to your cart.' btnText='View Cart' handleBtnClick={() => router.push('/(tabs)/MyCart')} />

      <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
        <View className='flex flex-col'>
          <View className='h-[290px] w-full relative'>
            <View className='absolute left-0 top-[10px] w-full px-[16px] flex flex-row justify-between items-center gap-[20px] z-10'>
              <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
                <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => setIsFavourite(!isFavourite)} className='absolute right-[6px] top-[6px] h-[32px] w-[32px] bg-midnight-carbon rounded-full flex justify-center items-center'>
                <SvgImage source={isFavourite ? Icons.HeartFilledIcon : Icons.HeartIcon} height={20} width={20} />
              </TouchableOpacity>
            </View>

            <SvgImage source={Images.ProductBanner1} height={310} width='100%' />
          </View>

          <View className='h-full w-full pt-[24px] pb-[13px] px-[16px] bg-pure-canvas rounded-tl-[24px] rounded-tr-[24px] flex flex-col gap-[48px]'>
            <View className='flex flex-col gap-[6px]'>
              <View className='flex flex-row items-center gap-[6px]'>
                <View className='h-[24px] px-[6px] bg-ocean-blue rounded-[8px] flex justify-center items-center'>
                  <Text className='text-pure-canvas text-[10px] font-inter-semibold'>Top Rated</Text>
                </View>

                <View className='h-[24px] px-[6px] bg-emerald-glow rounded-[8px] flex justify-center items-center'>
                  <Text className='text-pure-canvas text-[10px] font-inter-semibold'>Free Shipping</Text>
                </View>
              </View>

              <View className='flex flex-col gap-[12px]'>
                <View className='flex flex-row justify-between items-center gap-[20px]'>
                  <Text className='w-[70%] text-midnight-carbon text-[18px] font-inter-semibold'>Loop Silicone Strong Magnetic watch</Text>

                  <View className='flex flex-col'>
                    <Text className='text-midnight-carbon text-[18px] font-inter-bold leading-none'>$ 15.25</Text>
                    <Text className='text-slate-fog text-[14px] font-inter-regular line-through'>$ 20.25</Text>
                  </View>
                </View>

                <View className='flex flex-row items-center gap-[4px]'>
                  <View className='flex flex-row items-center gap-[2px]'>
                    <SvgImage source={Icons.StarIcon} height={9} width={9} />
                    <SvgImage source={Icons.StarIcon} height={9} width={9} />
                    <SvgImage source={Icons.StarIcon} height={9} width={9} />
                    <SvgImage source={Icons.StarIcon} height={9} width={9} />
                  </View>

                  <Text className='text-midnight-carbon text-[10px] font-inter-semibold'>4 (2,495 reviews) </Text>
                </View>

                <View className='flex flex-col'>
                  {"Constructed with high-quality silicone material, the Loop Silicone Strong Magnetic Watch ensures a comfortable and secure fit on your wrist. The soft and flexible silicone is gentle on the skin, making it ideal for extended wear. Its lightweight design allows for a seamless blend of comfort and durability.\n\nOne of the standout features of this watch band is its strong magnetic closure. The powerful magnets embedded within the band provide a secure and reliable connection, ensuring that your smartwatch stays firmly in place throughout the day. Say goodbye to worries about accidental detachment or slippage - the magnetic closure offers a peace of mind for active individuals on the go.\n\nThe Loop Silicone Strong Magnetic Watch Band is highly versatile, compatible with a wide range of smartwatch models. Its adjustable strap length allows for a customizable fit, catering to various wrist sizes. Whether you're engaging in intense workouts or attending formal occasions, this watch band effortlessly adapts to your style and activity level."?.split('\n')?.map((item, index) => (
                    <Text key={index} className='text-slate-fog text-[13px] font-inter-regular'>{item}</Text>
                  ))}
                </View>

                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[12px] font-inter-semibold'>Color</Text>

                  <View className='flex flex-row items-center gap-[4px]'>
                    {['#1C1B1B', '#08E488', '#21D4B4', '#C0C0C0', '#5A1A05']?.map((item, index) => (
                      <TouchableOpacity activeOpacity={0.8} key={index} className={`h-[32px] w-[32px] rounded-full border-[2.5px] border-solid ${selectedColor === index ? 'border-ocean-blue' : 'border-transparent'}`} style={{ backgroundColor: item }} onPress={() => setSelectedColor(index)}></TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[12px] font-inter-semibold'>Size</Text>

                  <View className='flex flex-row items-center gap-[4px]'>
                    {['XS', 'S', 'M', 'L', 'XL']?.map((item, index) => (
                      <TouchableOpacity activeOpacity={0.8} key={index} className={`h-[32px] w-[32px] rounded-full border-[1.5px] border-solid flex justify-center items-center ${selectedSize === index ? 'bg-midnight-carbon border-midnight-carbon' : 'bg-transparent border-lavender-haze'}`} onPress={() => setSelectedSize(index)}>
                        <Text className={`text-[10px] font-inter-semibold ${selectedSize === index ? 'text-pure-canvas' : 'text-midnight-carbon'}`}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className='flex flex-col gap-[4px]'>
                  <Text className='text-midnight-carbon text-[12px] font-inter-semibold'>Quantity</Text>

                  <View className='h-[32px] w-[96px] p-[4px] border-[1.5px] border-solid border-lavender-haze rounded-[8px] flex flex-row justify-between items-center gap-[4px]'>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedQuantity((selectedQuantity - 1) > 1 ? (selectedQuantity - 1) : 1)}>
                      <SvgImage source={Icons.MinusIcon} height={24} width={24} color={selectedQuantity > 1 ? '#1C1B1B' : '#C0C0C0'} />
                    </TouchableOpacity>

                    <Text className='text-midnight-carbon text-[16px] font-inter-medium'>{selectedQuantity}</Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedQuantity((selectedQuantity + 1) < 10 ? (selectedQuantity + 1) : 10)}>
                      <SvgImage source={Icons.PlusIcon} height={24} width={24} color={selectedQuantity < 10 ? '#1C1B1B' : '#C0C0C0'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View className='flex flex-row items-center gap-[8px]'>
              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-[50%] border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex justify-center items-center' onPress={handleBuyNow}>
                <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Buy Now</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-[50%] bg-midnight-carbon rounded-[12px] flex flex-row justify-center items-center gap-[8px]' onPress={handleAddToCart}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Add To Cart</Text>
                <SvgImage source={Icons.CartIcon} height={24} width={24} color='#FFFFFF' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;