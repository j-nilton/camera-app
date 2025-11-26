import { useState } from 'react';

export type MyPhoto = {
  uri: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: number;
};

export function usePhotoViewModel() {
  const [photos, setPhotos] = useState<MyPhoto[]>([]);

  const addPhoto = (photo: MyPhoto) => {
    setPhotos((prev) => [photo, ...prev]);
  };

  const getSortedPhotos = () => {
    return [...photos].sort((a, b) => b.timestamp - a.timestamp);
  };

  return {
    photos,
    addPhoto,
    getSortedPhotos,
  };
}