import { StyleProp, ViewStyle } from 'react-native';

// <======== Exporting Interfaces ========>
export interface SvgImageProps {
    height?: number;
    width?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    source: React.FC<{ height?: number; width?: number, color?: string }>;
};