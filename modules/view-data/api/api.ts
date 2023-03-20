import axios from "axios";

function fetchPhotoBySearchTerms(keywords: string) {
  return axios.get(
    `https://jsonplaceholder.typicode.com/photos?title_like=${keywords}`
  );
}

export { fetchPhotoBySearchTerms };
