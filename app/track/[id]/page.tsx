import { ReviewInfo } from "@/components/reviewInfo";
import { Reviews } from "@/components/reviews";
import { TextareaReactHookForm } from "@/components/testAreaReactHookForm";
import { Button } from "@/components/ui/button";
import { convertMsToMinutesSeconds } from "@/hooks";
import { tracks } from "@/types";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getTrack(id: string) {
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&country=hk`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return notFound();
  }

  return res.json();
}

export default async function Track({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getTrack(id);

  //   console.log(data);

  return (
    <main className="flex flex-col items-center min-h-screen py-8 px-[5%] md:px-[10%] font-noto">
      <div className="flex w-full">
        <Link href={`/`} className="pb-8 ">
          <Button
            role="button"
            type="button"
            name="homeButton"
            id="homeButton"
            aria-label="homeButton"
          >
            <Home size={20} />
          </Button>
        </Link>
        {data.results && data.results.length > 0 && (
          <h1 className={` font-bold text-3xl flex justify-center w-full`}>
            {data.results[0].trackName}
          </h1>
        )}
      </div>

      {data.results &&
        data.results.length > 0 &&
        data.results.map((item: tracks) => (
          <div
            key={item.trackId}
            className={`  flex mb-8 bg-cyan-300  flex-wrap gap-x-8 items-center text-black px-6 py-4 rounded-xl shadow-md shadow-blue-400 font-noto w-full`}
          >
            <div className="flex justify-start w-full mb-4 md:w-fit md:mb-0">
              <Image
                src={item.artworkUrl100}
                alt={item.trackName}
                width={200}
                height={200}
                className={" rounded-lg shadow-2xl"}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRpoCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggrAAAADALAJ0BKokAiQA+tValTjwko6In8mlTgBaJaW7hceDhwyAGFpfWt0AjIeULXkjb5Mk+LQ27lAgdKwKiPqo+lBMp3umQRsnnTIIetZEwmkRurZ+IydrNToCpdKyb4ZPIGwCAAP78yA91fAM8YR3U151sdf3o/nTwUIjPWDbQux/70fzAFUjKsVO+3y4GzBP5ao10nefQn3PQP5gsL29CztVDp6qw0tpXC7SoAAA="
              />
            </div>

            <div className="flex flex-col ">
              <div className="text-2xl font-semibold">{item.trackName}</div>
              <Link
                className="text-lg underline hover:text-gray-500"
                href={`/artist/${item.artistId}`}
              >
                Artist: {item.artistName}
              </Link>
              <div className="text-lg">Album: {item.collectionName}</div>
              <div className="text-lg">
                Track Price: {item.trackPrice} {item.currency}
              </div>
              <div className="text-lg">
                Time: {convertMsToMinutesSeconds(item.trackTimeMillis)}
              </div>
              <div className="text-lg ">
                <ReviewInfo trackId={item.trackId.toString()} />
              </div>
            </div>
          </div>
        ))}
      <div className="w-full">
        <TextareaReactHookForm trackId={id} />
        <Reviews trackId={id} />
      </div>
    </main>
  );
}
