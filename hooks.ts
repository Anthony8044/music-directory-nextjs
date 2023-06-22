import { z } from "zod";
import { FormSchema } from "./components/testAreaReactHookForm";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const convertMsToMinutesSeconds = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
};

const updateReviewStorage = ({
  trackId,
  data,
}: {
  trackId: string;
  data: z.infer<typeof FormSchema>;
}) => {
  const config: Config = {
    dictionaries: [names],
  };
  const characterName: string = uniqueNamesGenerator(config);
  let reviewData = JSON.stringify([
    {
      [trackId]: [
        { ...data, dateTime: Date.now(), name: `Anonymous ` + characterName },
      ],
    },
  ]);
  const fromLocalStorage = sessionStorage.getItem("reviews");

  // Check if sessionStorage exist then add key with data
  if (fromLocalStorage === null || fromLocalStorage === undefined) {
    sessionStorage.setItem("reviews", reviewData);
  } else {
    const localStorageData = JSON.parse(fromLocalStorage);
    let trackReviews = localStorageData.find((a: any) => trackId in a);
    // Check if track has reviews then append to the end of the reviews array of that track
    if (trackReviews !== undefined) {
      const updatedData = JSON.stringify([
        ...localStorageData.filter((a: any) => !(trackId in a)),
        {
          [trackId]: [
            ...trackReviews[trackId],
            {
              ...data,
              dateTime: Date.now(),
              name: `Anonymous ` + characterName,
            },
          ],
        },
      ]);
      sessionStorage.setItem("reviews", updatedData);
      // Check if track does not have reviews then just append the track with review to the end of array
    } else {
      const updatedData = JSON.stringify([
        ...localStorageData,
        {
          [trackId]: [
            {
              ...data,
              dateTime: Date.now(),
              name: `Anonymous ` + characterName,
            },
          ],
        },
      ]);
      sessionStorage.setItem("reviews", updatedData);
    }
  }
};

export { convertMsToMinutesSeconds, updateReviewStorage };
