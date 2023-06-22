import { convertMsToMinutesSeconds } from "@/hooks";
import { tracks } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReviewInfo } from "./reviewInfo";

async function getTracks(id: string) {
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&entity=song&country=hk`
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

export default async function TracksList({ id }: { id: string }) {
  const data = await getTracks(id);

  //   console.log("Tracks: ", data);

  return (
    <div className="flex flex-col items-center w-full">
      {data.results &&
        data.results.length &&
        data.results.slice(1).map((item: tracks, index: number) => (
          <Link
            key={item.trackId}
            href={`/track/${item.trackId}`}
            className={` ${
              index % 2 === 0 ? "bg-cyan-300" : "bg-white"
            } grid grid-cols-5 md:grid-cols-9 justify-between items-center hover:bg-gray-400 text-black rounded-lg font-noto w-full`}
          >
            <div className="p-2 font-semibold text-md">{item.trackNumber}</div>
            <div className="flex flex-col col-span-2 p-2 font-semibold text-md">
              {item.trackName}
            </div>
            <div className="hidden col-span-2 p-2 md:flex">
              {convertMsToMinutesSeconds(item.trackTimeMillis)}
            </div>
            <div className="hidden col-span-2 p-2 md:flex">
              {item.trackPrice} {item.currency}
            </div>
            <div className="col-span-2 p-2 line-clamp-1">
              <ReviewInfo trackId={item.trackId.toString()} />
            </div>
          </Link>
        ))}
    </div>
  );
}
