import { ReactNode } from "react";

interface PhotoData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoRow {
  id: ReactNode;
  title: ReactNode;
  thumbnailImage: ReactNode;
}

export type { PhotoData, PhotoRow };
