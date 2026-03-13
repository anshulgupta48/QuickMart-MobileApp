import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, TextInputChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { Country, State, City } from 'country-state-city';
import { useRouter } from 'expo-router';
import SvgImage from '@/components/SVGImage';
import { Icons } from '@/utils/icons';
import ToastComponent from '@/components/ToastComponent';
import { checkoutDropdownOptionsType, ShippingAddressFormDataType } from '@/utils/interfaces';

const ShippingAddress = () => {
  const [shippingAddressFormData, setShippingAddressFormData] = useState<ShippingAddressFormDataType>({ fullName: '', phoneCode: null, phoneNumber: '', state: '', city: '', streetAddress: '', postalCode: '' });
  const [shippingAddressFormErrors, setShippingAddressFormErrors] = useState<string[]>([]);
  const [checkoutDropdownOptions, setcheckoutDropdownOptions] = useState<checkoutDropdownOptionsType>({ countriesData: [...new Set(Country.getAllCountries()?.map((c) => c.phonecode?.split(",")[0])?.filter((code) => code && !isNaN(Number(code)))?.map((code) => Number(code)))]?.sort((a, b) => a - b)?.map((code) => ({ label: `+${code}`, value: `+${code}` })), statesData: [], citiesData: [] });
  const [showShippingAddressNotification, setShowShippingAddressNotification] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddressFormData.phoneCode) {
      return;
    }

    const country = findCountryByPhoneCode(shippingAddressFormData.phoneCode);
    if (!country) {
      return;
    }

    const states = State.getStatesOfCountry(country.isoCode)?.sort((a, b) => a.name.localeCompare(b.name))?.map((s) => ({ label: s.name, value: s.isoCode }));
    setcheckoutDropdownOptions({ ...checkoutDropdownOptions, statesData: states });
  }, [shippingAddressFormData.phoneCode]);

  useEffect(() => {
    if (!shippingAddressFormData.phoneCode || !shippingAddressFormData.state) {
      return;
    }

    const country = findCountryByPhoneCode(shippingAddressFormData.phoneCode);
    if (!country) {
      return;
    }

    const cities = City.getCitiesOfState(country.isoCode, shippingAddressFormData.state)?.sort((a, b) => a.name.localeCompare(b.name))?.map((c) => ({ label: c.name, value: c.name }));
    setcheckoutDropdownOptions({ ...checkoutDropdownOptions, citiesData: cities });
  }, [shippingAddressFormData.state]);

  const handleChange = (fieldName: string, e: TextInputChangeEvent) => {
    setShippingAddressFormErrors([]);
    setShippingAddressFormData({ ...shippingAddressFormData, [fieldName]: e.nativeEvent.text });
  };

  const findCountryByPhoneCode = (phoneCode: string) => {
    const code = phoneCode.replace('+', '');

    return Country.getAllCountries().find((c) =>
      c.phonecode?.split(',').includes(code)
    );
  };

  const handleSave = () => {
    let updatedShippingAddressFormErrors = [];
    if (shippingAddressFormData.fullName === '') {
      updatedShippingAddressFormErrors.push('fullName');
    }
    if (shippingAddressFormData.phoneCode === null || shippingAddressFormData.phoneNumber === '') {
      updatedShippingAddressFormErrors.push('phoneNumber');
    }
    if (shippingAddressFormData.state === '') {
      updatedShippingAddressFormErrors.push('state');
    }
    if (shippingAddressFormData.city === '') {
      updatedShippingAddressFormErrors.push('city');
    }
    if (shippingAddressFormData.streetAddress === '') {
      updatedShippingAddressFormErrors.push('streetAddress');
    }
    if (shippingAddressFormData.postalCode === '') {
      updatedShippingAddressFormErrors.push('postalCode');
    }

    setShippingAddressFormErrors(updatedShippingAddressFormErrors);
    if (updatedShippingAddressFormErrors.length === 0) {
      setShowShippingAddressNotification(true);
    }
  };

  return (
    <SafeAreaView className='h-full w-full bg-pure-canvas'>
      <View className='h-screen w-full pt-[20px] pb-[10px] flex flex-col justify-between gap-[20px]'>
        <ToastComponent isActive={showShippingAddressNotification} setIsActive={setShowShippingAddressNotification} message='Shipping Address updated Successfully.' />

        <View className='w-full flex flex-col gap-[12px] relative'>
          <View className='w-full px-[16px] pb-[12px] border-b-[1.5px] border-solid border-lavender-haze flex flex-row items-center gap-[12px]'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
              <SvgImage source={Icons.ArrowLeftIcon} height={32} width={32} />
            </TouchableOpacity>

            <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Shipping Address</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full'>
            <View className='px-[16px] pb-[60px] flex flex-col gap-[24px]'>
              <View className='min-h-[550px] w-full flex flex-col gap-[24px]'>
                <View className='flex flex-col gap-[12px]'>
                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Full Name <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter your Full-Name' placeholderTextColor='#C0C0C0' value={shippingAddressFormData.fullName} onChange={(e) => handleChange('fullName', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${shippingAddressFormErrors.includes('fullName') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Phone Number <Text className='text-crimson-alert'>*</Text></Text>

                    <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[8px] ${shippingAddressFormErrors.includes('phoneNumber') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                      <View className='w-[50px] z-10'>
                        <Dropdown
                          data={checkoutDropdownOptions.countriesData}
                          labelField='label'
                          valueField='value'
                          value={shippingAddressFormData.phoneCode}
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
                          onChange={(item) => { setShippingAddressFormData({ ...shippingAddressFormData, phoneCode: item.value }) }}
                        />
                      </View>

                      <TextInput placeholder='Enter your Phone-Number' placeholderTextColor='#C0C0C0' value={shippingAddressFormData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e)} className='h-[60px] w-full text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300' />
                    </View>

                    <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[8px] ${shippingAddressFormErrors.includes('state') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                      <View className='w-full z-10'>
                        <Dropdown
                          disable={!shippingAddressFormData.phoneCode}
                          data={checkoutDropdownOptions.statesData}
                          labelField='label'
                          valueField='value'
                          value={shippingAddressFormData.state}
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
                          onChange={(item) => { setShippingAddressFormData({ ...shippingAddressFormData, state: item.value }) }}
                        />
                      </View>
                    </View>

                    <View className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] flex flex-row items-center gap-[8px] ${shippingAddressFormErrors.includes('city') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`}>
                      <View className='w-full z-10'>
                        <Dropdown
                          disable={!shippingAddressFormData.state}
                          data={checkoutDropdownOptions.citiesData}
                          labelField='label'
                          valueField='value'
                          value={shippingAddressFormData.city}
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
                          onChange={(item) => { setShippingAddressFormData({ ...shippingAddressFormData, city: item.value }) }}
                        />
                      </View>
                    </View>
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Street Address <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter your Street-Address' placeholderTextColor='#C0C0C0' value={shippingAddressFormData.streetAddress} onChange={(e) => handleChange('streetAddress', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${shippingAddressFormErrors.includes('streetAddress') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>

                  <View className='flex flex-col gap-[8px]'>
                    <Text className='text-midnight-carbon text-[14px] font-inter-medium'>Postal Code <Text className='text-crimson-alert'>*</Text></Text>

                    <TextInput placeholder='Enter your Postal-Code' placeholderTextColor='#C0C0C0' value={shippingAddressFormData.postalCode} onChange={(e) => handleChange('postalCode', e)} className={`h-[60px] w-full px-[16px] border-[1.5px] border-solid rounded-[12px] text-midnight-carbon text-[12px] font-inter-regular transition-all duration-300 ${shippingAddressFormErrors.includes('postalCode') ? 'border-crimson-alert' : 'border-lavender-haze focus:border-aqua-mint'}`} />
                  </View>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.8} className='h-[60px] w-full bg-midnight-carbon rounded-[12px] flex justify-center items-center' onPress={handleSave}>
                <Text className='text-pure-canvas text-[14px] font-inter-medium'>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShippingAddress;