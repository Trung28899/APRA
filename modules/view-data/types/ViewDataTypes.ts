import { ReactNode } from "react";

interface PhotoData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  thumbnailImage?: ReactNode;
}

export type { PhotoData };
