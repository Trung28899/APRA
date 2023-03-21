import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { filterData } from "./data_helpers";
import { mockData } from "./mockData";

describe("Filtering data from API to remove items without the desired title", () => {
  test("Empty search term", () => {
    const result = filterData(mockData, "");
    expect(result).toStrictEqual(mockData);
  });

  test("Empty data", () => {
    const result = filterData([], "qui");
    expect(result).toStrictEqual([]);
  });

  test("No Result", () => {
    const result = filterData(mockData, "something");
    expect(result).toStrictEqual([]);
  });

  test("Valid search term and mockData", () => {
    const result = filterData(mockData, "off");

    expect(result).toStrictEqual([
      {
        id: "3",
        title: "officia porro iure quia iusto qui ipsa ut modi",
        thumbnailUrl: "https://via.placeholder.com/150/24f355",
      },
      {
        id: "68",
        title: "in voluptate sit officia non nesciunt quis",
        thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
      },
    ]);
  });
});
