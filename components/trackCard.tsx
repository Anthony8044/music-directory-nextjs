import { tracks } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReviewInfo } from "./reviewInfo";

const TrackCard = ({
  key,
  item,
  index,
}: {
  key: number;
  item: tracks;
  index: number;
}) => {
  return (
    <div
      key={key}
      className={`${
        index % 2 === 0 ? "" : " bg-cyan-300"
      } grid w-full divide-x-2 grid-cols-6 border-x-2 border-y md:grid-cols-10`}
    >
      <div className="flex justify-center col-span-2">
        <Link href={`/track/${item.trackId}`}>
          <Image
            src={item.artworkUrl100}
            alt={item.trackName}
            width={100}
            height={100}
            className={
              " max-w-[100px] rounded-lg shadow-2xl m-2 transition duration-150 ease-in-out hover:scale-105"
            }
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRpoCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggrAAAADALAJ0BKokAiQA+tValTjwko6In8mlTgBaJaW7hceDhwyAGFpfWt0AjIeULXkjb5Mk+LQ27lAgdKwKiPqo+lBMp3umQRsnnTIIetZEwmkRurZ+IydrNToCpdKyb4ZPIGwCAAP78yA91fAM8YR3U151sdf3o/nTwUIjPWDbQux/70fzAFUjKsVO+3y4GzBP5ao10nefQn3PQP5gsL29CztVDp6qw0tpXC7SoAAA="
          />
        </Link>
      </div>
      <Link
        href={`/track/${item.trackId}`}
        className="flex flex-col items-center justify-center col-span-2 p-2 hover:bg-gray-200"
      >
        <div className="text-lg font-semibold underline md:text-xl">
          {item.trackName}
        </div>
        <div>
          {item.collectionName === "404 Not Found" ? "-" : item.collectionName}
        </div>
      </Link>
      <Link
        className="items-center justify-center hidden col-span-2 p-2 text-xl font-medium underline md:flex hover:bg-gray-200"
        href={`/artist/${item.artistId}`}
      >
        {item.artistName}
      </Link>
      <div className="items-center justify-center hidden col-span-2 p-2 md:flex">
        {item.trackPrice} {item.currency}
      </div>
      <Link
        className="flex items-center justify-center col-span-2 p-2 hover:bg-gray-200"
        href={`/track/${item.trackId}`}
      >
        <ReviewInfo trackId={item.trackId.toString()} />
      </Link>
    </div>
  );
};

export default TrackCard;
