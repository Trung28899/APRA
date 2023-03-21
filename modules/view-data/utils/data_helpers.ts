import { PhotoData } from "@/modules/view-data/types/ViewDataTypes";

function filterData(photoData: PhotoData[], searchTerms: string): PhotoData[] {
  const filteredData = photoData.filter((photo) =>
    photo.title.includes(searchTerms)
  );

  return filteredData;
}

export { filterData };
