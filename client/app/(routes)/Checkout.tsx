import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { Country, State, City } from 'country-state-city';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import { Images } from '@/utils/images';
import OrderHistoryProductCard from '@/components/OrderHistoryProductCard';
import { checkoutDropdownOptionsType, CheckoutFormDataType } from '@/utils/interfaces';

const Checkout = () => {
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormDataType>({ fullName: '', phoneCode: null, phoneNumber: '', state: '', city: '', streetAddress: '', postalCode: '', cardHolderName: '', cardNumber: '', expiration: '', cvv: '' });
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<string[]>([]);
  const [checkoutDropdownOptions, setcheckoutDropdownOptions] = useState<checkoutDropdownOptionsType>({ countriesData: [...new Set(Country.getAllCountries()?.map((c) => c.phonecode?.split(",")[0])?.filter((code) => code && !isNaN(Number(code)))?.map((code) => Number(code)))]?.sort((a, b) => a - b)?.map((code) => ({ label: `+${code}`, value: `+${code}` })), statesData: [], citiesData: [] });
  const [activeCheckoutIndex, setActiveCheckoutIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (!checkoutFormData.phoneCode) {
      return;
    }

    const country = findCountryByPhoneCode(checkoutFormData.phoneCode);
    if (!country) {
      return;
    }

    const states = State.getStatesOfCountry(country.isoCode)?.sort((a, b) => a.name.localeCompare(b.name))?.map((s) => ({ label: s.name, value: s.isoCode }));
    setcheckoutDropdownOptions({ ...checkoutDropdownOptions, statesData: states });
  }, [checkoutFormData.phoneCode]);

  useEffect(() => {
    if (!checkoutFormData.phoneCode || !checkoutFormData.state) {
      return;
    }

    const country = findCountryByPhoneCode(checkoutFormData.phoneCode);
    if (!country) {
      return;
    }

    const cities = City.getCitiesOfState(country.isoCode, checkoutFormData.state)?.sort((a, b) => a.name.localeCompare(b.name))?.map((c) => ({ label: c.name, value: c.name }));
    setcheckoutDropdownOptions({ ...checkoutDropdownOptions, citiesData: cities });
  }, [checkoutFormData.state]);

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setCheckoutFormErrors([]);
    setCheckoutFormData({ ...checkoutFormData, [fieldName]: e.nativeEvent.text });
  };

  const findCountryByPhoneCode = (phoneCode: string) => {
    const code = phoneCode.replace('+', '');

    return Country.getAllCountries().find((c) =>
      c.phonecode?.split(',').includes(code)
    );
  };

  const handleNext = () => {
    let updatedCheckoutFormErrors = [];

    if (activeCheckoutIndex === 0) {
      if (checkoutFormData.fullName === '') {
        updatedCheckoutFormErrors.push('fullName');
      }
      if (checkoutFormData.phoneCode === null || checkoutFormData.phoneNumber === '') {
        updatedCheckoutFormErrors.push('phoneNumber');
      }
      if (checkoutFormData.state === '') {
        updatedCheckoutFormErrors.push('state');
      }
      if (checkoutFormData.city === '') {
        updatedCheckoutFormErrors.push('city');
      }
      if (checkoutFormData.streetAddress === '') {
        updatedCheckoutFormErrors.push('streetAddress');
      }
      if (checkoutFormData.postalCode === '') {
        updatedCheckoutFormErrors.push('postalCode');
      }
    }
    else if (activeCheckoutIndex === 1) {
      if (checkoutFormData.cardHolderName === '') {
        updatedCheckoutFormErrors.push('cardHolderName');
      }
      if (checkoutFormData.cardNumber === '') {
        updatedCheckoutFormErrors.push('cardNumber');
      }
      if (checkoutFormData.expiration === '') {
        updatedCheckoutFormErrors.push('expiration');
      }
      if (checkoutFormData.cvv === '') {
        updatedCheckoutFormErrors.push('cvv');
      }
    }

    setCheckoutFormErrors(updatedCheckoutFormErrors);
    if (updatedCheckoutFormErrors.length === 0) {
      if (activeCheckoutIndex !== 3) {
        setActiveCheckoutIndex(activeCheckoutIndex + 1);
      } else {
        router.push('/(tabs)/Home');
      }
    }
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <View className='w-full flex flex-col gap-[12px] relative'>
          {activeCheckoutIndex !== 3 && <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Checkout</Text>
          </View>}

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='px-[16px] pt-[12px] pb-[60px] flex flex-col gap-[24px]'>
              {activeCheckoutIndex !== 3 && <View className='flex flex-row justify-between items-center gap-[9px]'>
                <View className='flex flex-col items-center'>
                  <SvgImage source={Icons.ShippingIcon} height={24} width={24} color={activeCheckoutIndex === 0 ? '#1C1B1B' : '#21D4B4'} />
                  <Text className={`text-[12px] font-inter-semibold ${activeCheckoutIndex === 0 ? 'text-midnight-carbon' : 'text-aqua-mint'}`}>Shipping</Text>
                </View>

                <View className='h-[1.5px] w-[60px] bg-silver-mist'></View>

                <View className='flex flex-col items-center'>
                  <SvgImage source={Icons.PaymentIcon} height={24} width={24} color={activeCheckoutIndex < 1 ? '#6F7384' : (activeCheckoutIndex === 1 ? '#1C1B1B' : '#21D4B4')} />
                  <Text className={`text-[12px] font-inter-semibold ${activeCheckoutIndex < 1 ? 'text-slate-fog' : (activeCheckoutIndex === 1 ? 'text-midnight-carbon' : 'text-aqua-mint')}`}>Payment</Text>
                </View>

                <View className='h-[1.5px] w-[60px] bg-silver-mist'></View>

                <View className='flex flex-col items-center'>
                  <SvgImage source={Icons.ReviewIcon} height={24} width={24} color={activeCheckoutIndex < 2 ? '#6F7384' : (activeCheckoutIndex === 2 ? '#1C1B1B' : '#21D4B4')} />
                  <Text className={`text-[12px] font-inter-semibold ${activeCheckoutIndex < 2 ? 'text-slate-fog' : (activeCheckoutIndex === 2 ? 'text-midnight-carbon' : 'text-aqua-mint')}`}>Review</Text>
                </View>
              </View>}

              {activeCheckoutIndex === 0 && <View className='min-h-[470px] w-full flex flex-col gap-[24px]'>
                <View className='flex flex-col gap-[12px]'>
                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Full Name <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter your Full-Name' placeholderTextColor='#C0C0C0' value={checkoutFormData.fullName} onChange={(e) => handleChange('fullName', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('fullName') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Phone Number <Text className='text-crimson-alert'>*</Text></Text>

                    <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[8px] ${checkoutFormErrors.includes('phoneNumber') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                      <View className='w-[50px] z-10'>
                        <Dropdown
                          data={checkoutDropdownOptions.countriesData}
                          labelField='label'
                          valueField='value'
                          value={checkoutFormData.phoneCode}
                          placeholder='+91'
                          style={{
                            height: 50,
                            backgroundColor: '#FFFFFF',
                          }}
                          placeholderStyle={{
                            color: '#C0C0C0',
                            fontSize: 12,
                          }}
                          selectedTextStyle={{
                            color: '#1C1B1B',
                            fontSize: 12,
                          }}
                          itemTextStyle={{
                            color: '#1C1B1B',
                            fontSize: 13,
                          }}
                          containerStyle={{
                            borderRadius: 12,
                            borderWidth: 1.5,
                            borderColor: '#E6E6FA',
                            backgroundColor: '#FFFFFF',
                            minWidth: 90,
                            alignSelf: 'flex-start'
                          }}
                          activeColor='#F5F5F5'
                          onChange={(item) => { setCheckoutFormData({ ...checkoutFormData, phoneCode: item.value }) }}
                        />
                      </View>

                      <TextInput placeholder='Enter your Phone-Number' placeholderTextColor='#C0C0C0' value={checkoutFormData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e)} className='h-[60px] w-full text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                    </View>

                    <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[8px] ${checkoutFormErrors.includes('state') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                      <View className='w-full z-10'>
                        <Dropdown
                          disable={!checkoutFormData.phoneCode}
                          data={checkoutDropdownOptions.statesData}
                          labelField='label'
                          valueField='value'
                          value={checkoutFormData.state}
                          placeholder='Select State'
                          style={{
                            height: 50,
                            backgroundColor: '#FFFFFF',
                          }}
                          placeholderStyle={{
                            color: '#C0C0C0',
                            fontSize: 12,
                          }}
                          selectedTextStyle={{
                            color: '#1C1B1B',
                            fontSize: 12,
                          }}
                          itemTextStyle={{
                            color: '#1C1B1B',
                            fontSize: 13,
                          }}
                          containerStyle={{
                            borderRadius: 12,
                            borderWidth: 1.5,
                            borderColor: '#E6E6FA',
                            backgroundColor: '#FFFFFF',
                            minWidth: 90,
                            alignSelf: 'flex-start'
                          }}
                          activeColor='#F5F5F5'
                          onChange={(item) => { setCheckoutFormData({ ...checkoutFormData, state: item.value }) }}
                        />
                      </View>
                    </View>

                    <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[8px] ${checkoutFormErrors.includes('city') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                      <View className='w-full z-10'>
                        <Dropdown
                          disable={!checkoutFormData.state}
                          data={checkoutDropdownOptions.citiesData}
                          labelField='label'
                          valueField='value'
                          value={checkoutFormData.city}
                          placeholder='Select City'
                          style={{
                            height: 50,
                            backgroundColor: '#FFFFFF',
                          }}
                          placeholderStyle={{
                            color: '#C0C0C0',
                            fontSize: 12,
                          }}
                          selectedTextStyle={{
                            color: '#1C1B1B',
                            fontSize: 12,
                          }}
                          itemTextStyle={{
                            color: '#1C1B1B',
                            fontSize: 13,
                          }}
                          containerStyle={{
                            borderRadius: 12,
                            borderWidth: 1.5,
                            borderColor: '#E6E6FA',
                            backgroundColor: '#FFFFFF',
                            minWidth: 90,
                            alignSelf: 'flex-start'
                          }}
                          activeColor='#F5F5F5'
                          onChange={(item) => { setCheckoutFormData({ ...checkoutFormData, city: item.value }) }}
                        />
                      </View>
                    </View>
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Street Address <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter your Street-Address' placeholderTextColor='#C0C0C0' value={checkoutFormData.streetAddress} onChange={(e) => handleChange('streetAddress', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('streetAddress') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Postal Code <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter your Postal-Code' placeholderTextColor='#C0C0C0' value={checkoutFormData.postalCode} onChange={(e) => handleChange('postalCode', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('postalCode') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>
                </View>
              </View>}

              {activeCheckoutIndex === 1 && <View className='min-h-[470px] w-full flex flex-col gap-[24px]'>
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

                    <TextInput placeholder='Enter Card-Holder Name' placeholderTextColor='#C0C0C0' value={checkoutFormData.cardHolderName} onChange={(e) => handleChange('cardHolderName', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('cardHolderName') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Card Number <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='4111 1111 1111 1111' placeholderTextColor='#C0C0C0' value={checkoutFormData.cardNumber} onChange={(e) => handleChange('cardNumber', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('cardNumber') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>

                  <View className='flex flex-row items-center gap-[8px]'>
                    <View className='w-[50%] flex flex-col gap-[8px]'>
                      <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Expiration <Text className='text-crimson-alert'>*</Text></Text>

                      <TextInput placeholder='MM/YY' placeholderTextColor='#C0C0C0' value={checkoutFormData.expiration} onChange={(e) => handleChange('expiration', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('expiration') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                    </View>

                    <View className='w-[50%] flex flex-col gap-[8px]'>
                      <Text className='text-midnight-carbon text-[14px] font-inter-medium'>CVV <Text className='text-crimson-alert'>*</Text></Text>

                      <TextInput placeholder='4111 1111 1111 1111' placeholderTextColor='#C0C0C0' value={checkoutFormData.cvv} onChange={(e) => handleChange('cvv', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${checkoutFormErrors.includes('cvv') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                    </View>
                  </View>
                </View>
              </View>}

              {activeCheckoutIndex === 2 && <View className='min-h-[470px] w-full flex flex-col gap-[16px]'>
                <View className='flex flex-col gap-[16px]'>
                  <OrderHistoryProductCard />
                  <OrderHistoryProductCard />
                </View>

                <View className='flex flex-col gap-[10px]'>
                  <View className='py-[10px] border-t-[1.5px] border-b-[1.5px] border-solid border-lavender-haze flex flex-col gap-[12px]'>
                    <Text className='text-midnight-carbon text-[16px] font-inter-semibold'>Shipping Address</Text>

                    <View className='flex flex-col'>
                      <View className='flex flex-row justify-between items-center gap-[20px]'>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Full Name</Text>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Anshul Gupta</Text>
                      </View>

                      <View className='flex flex-row justify-between items-center gap-[20px]'>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Mobile Number</Text>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>+91-9926263736</Text>
                      </View>

                      <View className='flex flex-row justify-between items-center gap-[20px]'>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>State</Text>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Madhya Pradesh</Text>
                      </View>

                      <View className='flex flex-row justify-between items-center gap-[20px]'>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>City</Text>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Sheopur</Text>
                      </View>

                      <View className='flex flex-row justify-between items-center gap-[20px]'>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Street Address</Text>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>HN-106, ABC-Street</Text>
                      </View>

                      <View className='flex flex-row justify-between items-center gap-[20px]'>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>Postal Code</Text>
                        <Text className='text-slate-fog text-[12px] font-inter-regular'>476337</Text>
                      </View>
                    </View>
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
                  </View>
                </View>
              </View>}

              {activeCheckoutIndex === 3 && <View className='flex flex-col gap-[24px]'>
                <View className='h-[408px] w-full bg-mint-whisper rounded-[32px] flex justify-center items-center'>
                  <SvgImage source={Images.CheckoutBanner} height={240} width={240} />
                </View>

                <View className='flex flex-col gap-[8px]'>
                  <Text className='text-midnight-carbon text-[24px] font-inter-bold text-center'>Your order has been placed successfully</Text>
                  <Text className='text-slate-fog text-[14px] font-inter-regular text-center'>Thank you for choosing us! Feel free to continue shopping and explore our wide range of products. Happy Shopping!</Text>
                </View>
              </View>}

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleNext}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>{activeCheckoutIndex === 0 ? 'Save' : (activeCheckoutIndex === 1 ? 'Continue' : (activeCheckoutIndex === 2 ? 'Place Order' : 'Continue Shopping'))}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;