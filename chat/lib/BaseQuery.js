import {fetchBaseQuery} from "@reduxjs/toolkit/query";


const BaseQuery = fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
        headers.set('Accept', `application/json`)
        // headers.set('Authorization', `Bearer ${token}`)
        return headers
    }
})
export default BaseQuery;
