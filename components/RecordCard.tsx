import Image from 'next/image';
import Link from 'next/link';

interface RecordCardProps {
  id: number;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  name: string;
  artists: string;
}

const RecordCard: React.FC<RecordCardProps> = ({
  id,
  imageUrl,
  imageWidth,
  imageHeight,
  name,
  artists,
}) => {
  return (
    <Link href={`/dashboard/records/${id}`} className="font-medium">
      <Image
        src={imageUrl}
        alt="album cover"
        width={imageWidth}
        height={imageHeight}
      />
      <h3 className="mt-2 font-semibold">{name}</h3>
      <p className="text-neutral-500">{artists}</p>
    </Link>
  );
};

export default RecordCard;
