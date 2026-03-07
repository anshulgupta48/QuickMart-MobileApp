import { FC } from 'react';
import { ImageProps, StyleProp, ViewStyle } from 'react-native';

// <======== Exporting Interfaces ========>
export interface SvgImageProps {
    height?: number;
    width?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    source: React.FC<{ height?: number; width?: number, color?: string }>;
};

export interface ToastComponentProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
};

export interface TabsBarIconProps {
    focused: boolean;
    title: string;
    icon: FC<ImageProps>;
};

export interface ProductCardProps {
    banner: FC<ImageProps>;
    title: string;
    discountedPrice: string;
    originalPrice: string;
    colors: string[];
};