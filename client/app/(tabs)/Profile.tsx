import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='h-full w-full bg-aqua-mint'>
      <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
        <View className='pt-[20px] pb-[10px] flex flex-col gap-[21px]'>
          <View className='px-[16px] flex flex-row justify-between items-center gap-[20px]'>
            <View className='flex flex-row items-center gap-[8px]'>
              <View className='rounded-[8px] overflow-hidden'>
                <SvgImage source={Images.ProfileBanner} height={40} width={40} />
              </View>

              <View className='flex flex-col'>
                <Text className='text-pure-canvas text-[16px] font-inter-medium leading-none'>Anshul Gupta</Text>
                <Text className='text-pure-canvas text-[14px] font-inter-regular'>anshulgupta4905@gmail.com</Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/(auth)/Login')}>
              <SvgImage source={Icons.LogoutIcon} height={32} width={32} />
            </TouchableOpacity>
          </View>

          <View className='h-full w-full pt-[24px] bg-pure-canvas rounded-tl-[24px] rounded-tr-[24px] flex flex-col gap-[24px]'>
            <View className='flex flex-col gap-[12px]'>
              <Text className='pl-[16px] text-midnight-carbon text-[12px] font-inter-medium'>Personal Information</Text>

              <View className='flex flex-col'>
                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.ShippingIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Shipping Address</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>

                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.PaymentIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Payment Method</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>

                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.OrderHistoryIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Order History</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>
              </View>
            </View>

            <View className='flex flex-col gap-[12px]'>
              <Text className='pl-[16px] text-midnight-carbon text-[12px] font-inter-medium'>Personal Information</Text>

              <View className='flex flex-col'>
                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.PrivacyPolicyIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Privacy Policy</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>

                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.TermsConditionsIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Terms & Conditions</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>

                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.FAQsIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>FAQs</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>
              </View>
            </View>

            <View className='flex flex-col gap-[12px]'>
              <Text className='pl-[16px] text-midnight-carbon text-[12px] font-inter-medium'>Account Management</Text>

              <View className='flex flex-col'>
                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.ChangePasswordIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Change Password</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>

                <View className='h-[48px] w-full px-[16px] border-b-[0.5px] border-solid border-slate-fog flex flex-row justify-between items-center gap-[10px]'>
                  <View className='flex flex-row items-center gap-[12px]'>
                    <SvgImage source={Icons.ThemeIcon} height={24} width={24} />
                    <Text className='text-slate-fog text-[14px] font-inter-medium'>Dark Theme</Text>
                  </View>

                  <SvgImage source={Icons.ChevronRightIcon} height={32} width={32} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;