import { FC } from 'react';
import { ImageProps, StyleProp, ViewStyle } from 'react-native';

// <======== Exporting Interfaces ========>
export interface SvgImageProps {
    height?: number;
    width?: number | string;
    color?: string;
    style?: StyleProp<ViewStyle>;
    source: React.FC<{ height?: number; width?: number | string, color?: string }>;
};

export interface ToastComponentProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    btnText?: string;
    handleBtnClick?: () => void;
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
    isWishlisted: boolean;
};

export interface checkoutDropdownOptionsType {
    countriesData: { label: string, value: string }[];
    statesData: { label: string, value: string }[];
    citiesData: { label: string, value: string }[];
};

export interface SignUpFormDataType {
    fullName: string;
    email: string;
    password: string;
};

export interface LoginFormDataType {
    email: string;
    password: string;
};

export interface ForgotPasswordDataType {
    email: string;
    password: string;
    confirmPassword: string;
};