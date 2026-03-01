import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SvgImage from './SVGImage';
import { Icons } from '@/utils/icons';
import { ToastComponentProps } from '@/utils/interfaces';

const ToastComponent = ({ isActive, setIsActive, message }: ToastComponentProps) => {
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 4000);
    }
  }, [isActive]);

  return (
    <View className={`absolute left-[3%] top-[10px] h-[46px] w-[94%] px-[12px] bg-pure-canvas border-[1.5px] border-solid border-lavender-haze rounded-[12px] flex flex-row items-center gap-[8px] transition-all duration-300 z-10 ${isActive ? 'translate-y-0' : 'translate-y-[-100px]'}`}>
      <SvgImage source={Icons.SuccessIcon} height={20} width={20} />
      <Text className='w-[90%] text-midnight-carbon text-[12px] font-inter-medium'>{message}</Text>
    </View>
  );
};

export default ToastComponent;