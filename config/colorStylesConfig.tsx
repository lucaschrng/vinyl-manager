import { ColorStyle } from '@/types/vinylDisc';

type ColorStylesConfig = Partial<{
  [key in ColorStyle]: number;
}>;

const colorStylesConfig: ColorStylesConfig = {
  solid: 1,
  split: 2,
  splatter: 2,
  marbled: 2,
  swirl: 2,
  pinwheel: 2,
  haze: 2,
  'color in color': 2,
  'picture disc': 1,
  shape: 1,
  other: 1,
};

export default colorStylesConfig;
