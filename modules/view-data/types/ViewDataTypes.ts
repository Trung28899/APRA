import { ReactNode } from "react";

interface PhotoData {
  id: number | string;
  title: string;
  thumbnailUrl: string;
}

interface PhotoRow {
  id: ReactNode;
  title: ReactNode;
  thumbnailImage: ReactNode;
}

export type { PhotoData, PhotoRow };
