import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SvgImage from './SVGImage';
import { Icons } from '@/utils/icons';
import { ToastComponentProps } from '@/utils/interfaces';

const ToastComponent = ({ isActive, setIsActive, message, btnText, handleBtnClick }: ToastComponentProps) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isActive) {
      timer = setTimeout(() => {
        setIsActive(false);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <View className={`absolute left-[3%] top-[10px] h-[46px] w-[94%] px-[12px] bg-pure-canvas border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-row justify-between items-center gap-[10px] transition-all duration-300 z-20 ${isActive ? 'translate-y-0' : 'translate-y-[-100px]'}`}>
      <View className='flex flex-row items-center gap-[8px]'>
        <SvgImage source={Icons.SuccessIcon} height={20} width={20} />
        <Text className={`text-midnight-carbon text-[12px] font-inter-medium ${(btnText && handleBtnClick) ? 'w-[70%]' : 'w-[90%]'}`}>{message}</Text>
      </View>

      {(btnText && handleBtnClick) && <TouchableOpacity activeOpacity={0.8} onPress={handleBtnClick}>
        <Text className='text-aqua-mint text-[12px] font-inter-semibold'>{btnText}</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default ToastComponent;