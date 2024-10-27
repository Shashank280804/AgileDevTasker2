import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import URLS from "../../utils/constant";

const baseQuery = fetchBaseQuery({ baseUrl: URLS.BackendEndPoint });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
