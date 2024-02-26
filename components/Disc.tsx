import { ColorStyle } from '@/types/vinylDisc';
import Image from 'next/image';
import colorStylesConfig from '@/config/colorStylesConfig';

import { Database } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface DiscProps {
  colorStyle: ColorStyle;
  color1: string;
  color2?: string;
  color3?: string;
  labelColor: string;
  labelImageUrl?: string;
  labelStyle: string;
}

const Disc: React.FC<DiscProps> = ({
  colorStyle,
  color1,
  color2 = '#000000',
  color3 = '#000000',
  labelColor,
  labelImageUrl,
  labelStyle,
}) => {
  const supabase = createClientComponentClient<Database>();

  if (labelStyle === 'image') {
    if (
      !labelImageUrl?.startsWith('http') &&
      !labelImageUrl?.startsWith('blob')
    ) {
      const { data: image } = supabase.storage
        .from('images')
        .getPublicUrl(labelImageUrl ?? '');

      labelImageUrl = image.publicUrl;
    }
  }

  return (
    <div className="relative aspect-square w-full rounded-full shadow-md">
      <div className="label-mask absolute inset-0 rounded-full">
        {Array.from(
          { length: colorStylesConfig[colorStyle] ?? 1 },
          (_, index) => (
            <div
              key={colorStyle + index}
              className={`masked ${colorStyle}-mask-${
                index + 1
              } absolute inset-0 rounded-full`}
              style={{
                background: [color1, color2, color3][index] ?? '#000000',
              }}
            />
          ),
        )}
      </div>

      <div className="hole-and-label-mask absolute inset-0 flex items-center justify-center rounded-full">
        <div
          className="h-[34.6%] w-[34.6%] rounded-full"
          style={{
            background:
              labelStyle === 'solid'
                ? labelColor
                : `url(${labelImageUrl}) no-repeat center/cover`,
          }}
        />
      </div>

      <Image
        src="/record_texture.webp"
        alt="vinyl disc"
        width={256}
        height={256}
        className="hole-mask absolute inset-0 aspect-square w-full rounded-full object-cover mix-blend-screen"
      />
    </div>
  );
};

export default Disc;
