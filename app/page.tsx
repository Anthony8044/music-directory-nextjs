import TrackCard from "@/components/trackCard";
import { tracks } from "@/types";

async function getData() {
  const res = await fetch(
    "https://itunes.apple.com/search?term=canto%2Bpop&limit=50&country=hk"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  // console.log(data);

  return (
    <main className="flex flex-col items-center min-h-screen py-8 px-[5%] md:px-[10%] font-noto">
      <h1 className={` font-bold text-3xl pb-8`}>Cantonese Pop Tracks</h1>
      <div className="sticky top-0 grid w-full grid-cols-6 font-semibold text-white bg-blue-600 divide-x-2 rounded-t-lg rounded-tl-lg border-x-2 border-y-2 md:grid-cols-10">
        <div className="flex justify-center col-span-2 p-2">Artwork</div>
        <div className="flex justify-center col-span-2 p-2 ">Track</div>
        <div className="justify-center hidden col-span-2 p-2 md:flex">
          Artist
        </div>
        <div className="justify-center hidden col-span-2 p-2 md:flex">
          Price
        </div>
        <div className="flex justify-center col-span-2 p-2 rounded-tr-lg">
          Reviews
        </div>
      </div>
      {data.results &&
        data.results.length &&
        data.results.map((item: tracks, index: number) => (
          <TrackCard key={item.trackId} item={item} index={index} />
        ))}
    </main>
  );
}
