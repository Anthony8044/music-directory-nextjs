"use client";

import { reviews } from "@/types";
import { Star, User } from "lucide-react";
import { useEffect, useState } from "react";

export function Reviews({ trackId }: { trackId: string }) {
  const [reviewData, setReviewData] = useState([]);
  const stars = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    const data = sessionStorage.getItem("reviews");
    if (data === null || data === undefined) {
    } else {
      const localStorageData = JSON.parse(data);
      let trackReviews = localStorageData.find(
        (a: { [trackId: string]: [reviews] }) => trackId in a
      );

      if (trackReviews !== undefined) {
        setReviewData(trackReviews[trackId]);
      }
    }
  }, [trackId]);

  return (
    <div>
      {reviewData && reviewData.length > 0 && (
        <div className="mt-8 text-2xl font-semibold ">User Reviews</div>
      )}
      {reviewData &&
        reviewData.length > 0 &&
        reviewData
          .sort(
            (a: reviews, b: reviews) => Number(b.dateTime) - Number(a.dateTime)
          )
          .map((a: reviews, index) => (
            <div
              className="p-6 mt-6 rounded-lg bg-slate-100 border-y-2"
              key={index}
            >
              <div className="flex">
                <div className="w-10 h-10 p-2 bg-blue-600 border-black rounded-lg">
                  <User color="#bfbfbf" />
                </div>
                <div className="flex flex-col ml-4">
                  <div className="text-sm font-semibold text-black ">
                    {a.name}
                  </div>
                  <div className="text-xs font-medium text-gray-400 ">
                    {new Date(a.dateTime).toLocaleString("en-HK")}
                  </div>
                </div>
              </div>
              <div className="pt-2 text-base font-normal">{a.review}</div>
              <div className="flex p-2 mt-2 bg-gray-200 rounded-lg w-fit">
                {stars.map((b, index) => {
                  if (a.stars.charAt(0) >= b) {
                    return (
                      <Star
                        color={`#58db00`}
                        fill="#58db00"
                        size={18}
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <Star
                        color="#bfbfbf"
                        fill="#bfbfbf"
                        size={18}
                        key={index}
                      />
                    );
                  }
                })}
                {/* <Star color="#58db00" fill="#58db00" size={18} />
              <Star color="#58db00" fill="#58db00" size={18} />
              <Star color="#bfbfbf" fill="#bfbfbf" size={18} />
              <Star color="#bfbfbf" fill="#bfbfbf" size={18} />
              <Star color="#bfbfbf" fill="#bfbfbf" size={18} /> */}
              </div>
            </div>
          ))}
    </div>
  );
}
