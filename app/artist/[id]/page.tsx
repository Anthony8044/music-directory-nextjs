import TracksList from "@/components/tracksList";
import { Button } from "@/components/ui/button";
import { tracks } from "@/types";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getArtist(id: string) {
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&entity=album&country=hk&limit=5`
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

export default async function Artist({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getArtist(id);

  //   console.log(data);

  return (
    <main className="flex flex-col items-center min-h-screen py-8 px-[5%] md:px-[10%] font-noto">
      <div className="flex w-full">
        <Link href={`/`} className="pb-8 ">
          <Button>
            <Home size={20} />
          </Button>
        </Link>
        {data.results && data.results.length > 0 && (
          <h1 className={` font-bold text-3xl flex justify-center w-full`}>
            {data.results[0].artistName}
          </h1>
        )}
      </div>

      {data.results &&
        data.results.length > 0 &&
        data.results.slice(1).map((item: tracks) => (
          <div
            key={item.collectionId}
            className={` flex mb-8 bg-cyan-300  flex-wrap gap-x-8 items-center text-black px-6 py-4 rounded-xl shadow-md shadow-blue-400 font-noto w-full`}
          >
            <div className="flex justify-start w-full mb-8 md:w-fit md:mb-4">
              <Image
                src={item.artworkUrl100}
                alt={item.collectionName}
                width={200}
                height={200}
                className={" rounded-lg shadow-2xl"}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRpoCAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggrAAAADALAJ0BKokAiQA+tValTjwko6In8mlTgBaJaW7hceDhwyAGFpfWt0AjIeULXkjb5Mk+LQ27lAgdKwKiPqo+lBMp3umQRsnnTIIetZEwmkRurZ+IydrNToCpdKyb4ZPIGwCAAP78yA91fAM8YR3U151sdf3o/nTwUIjPWDbQux/70fzAFUjKsVO+3y4GzBP5ao10nefQn3PQP5gsL29CztVDp6qw0tpXC7SoAAA="
              />
            </div>
            <div className="flex flex-col ">
              <div className="text-xl font-semibold">{item.collectionName}</div>
              <div className="text-lg">
                Price: {item.collectionPrice} {item.currency}
              </div>
              <div className="text-lg">Tracks: {item.trackCount}</div>
              <div className="text-lg">
                Release Date:{" "}
                {new Date(item.releaseDate).toLocaleDateString("en-HK")}
              </div>
              <div className="text-sm font-extralight">{item.copyright}</div>
            </div>
            <div className=" relative max-h-[440px] w-full overflow-y-auto scrollbar mt-8">
              <div className="sticky top-0 grid w-full grid-cols-5 font-semibold text-white bg-blue-600 divide-x divide-gray-200 rounded-lg md:grid-cols-9">
                <div className="flex p-2">Track #</div>
                <div className="flex col-span-2 p-2 border-black">Track</div>
                <div className="hidden col-span-2 p-2 border-black md:flex">
                  Time
                </div>
                <div className="hidden col-span-2 p-2 border-black md:flex">
                  Price
                </div>
                <div className="flex col-span-2 p-2 border-black rounded-tr-lg">
                  Reviews
                </div>
              </div>
              <TracksList id={item.collectionId.toString()} />
            </div>
          </div>
        ))}
    </main>
  );
}
