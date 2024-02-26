export type ColorStyle =
  | 'solid'
  | 'split'
  | 'splatter'
  | 'marbled'
  | 'swirl'
  | 'pinwheel'
  | 'haze'
  | 'color in color'
  | 'picture disc'
  | 'shape'
  | 'other';

export interface VinylDisc {
  color1: string;
  color2?: string;
  color3?: string;
  colorStyle: ColorStyle;
  labelColor: string;
  labelImageUrl?: string;
  labelImageFile?: {
    name: string;
    base64: string;
  };
  labelStyle: string;
  order: number;
}
