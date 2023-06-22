"use client";

import { reviews } from "@/types";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export function ReviewInfo({ trackId }: { trackId: string }) {
  const [reviewNum, setReviewNum] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const data = sessionStorage.getItem("reviews");
    if (data === null || data === undefined) {
    } else {
      const localStorageData = JSON.parse(data);
      let trackReviews = localStorageData.find(
        (a: { [trackId: string]: [reviews] }) => trackId in a
      );

      if (trackReviews !== undefined) {
        setReviewNum(trackReviews[trackId].length);
        let tempRating = 0;
        trackReviews[trackId].map((a: reviews) => {
          tempRating += Number(a.stars.charAt(0));
        });
        setAverageRating(
          Number((tempRating / trackReviews[trackId].length).toFixed(1))
        );
      }
    }
  }, [trackId]);

  return (
    <div>
      {reviewNum > 0 ? (
        <div className="flex justify-start">
          <div className="flex items-center justify-center">
            {averageRating} / 5
            <Star color={`#58db00`} fill="#58db00" size={18} className="mx-1" />
            Rating
          </div>
        </div>
      ) : (
        <div>No Reviews</div>
      )}
    </div>
  );
}
