import Image from 'next/image';
import Link from 'next/link';

interface RecordCardProps {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
}

const RecordCard: React.FC<RecordCardProps> = ({
  href,
  imageSrc,
  title,
  subtitle,
}) => {
  return (
    <Link
      href={href}
      className="rounded border border-transparent p-2 transition duration-150 hover:border-stone-300 hover:bg-stone-200 hover:shadow-sm"
    >
      <Image
        src={imageSrc}
        width={160}
        height={160}
        alt={`${title} album cover`}
        className="aspect-square w-full object-cover shadow-lg"
        blurDataURL="/album_cover_placeholder.jpg"
        placeholder="blur"
      />
      <p className="mt-2 font-medium leading-5">
        {title}
        <br />
        <span className="text-neutral-500">{subtitle}</span>
      </p>
    </Link>
  );
};

export default RecordCard;
