import React from 'react';
import { View } from 'react-native';
import { SvgImageProps } from '@/utils/interfaces';

const SvgImage: React.FC<SvgImageProps> = ({ height, width, color, style, source: SVGComponent }) => {
  return (
    <View style={style}>
      <SVGComponent height={height} width={width} color={color} />
    </View>
  );
};

export default SvgImage;