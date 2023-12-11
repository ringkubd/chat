import { createApi } from "@reduxjs/toolkit/query/react";
import {onQueryStartedErrorToast} from "../../../lib/ErrorHandle";
import BaseQuery from "../../../lib/BaseQuery";

export const authAPI = createApi({
    reducerPath: 'auth_api',
    baseQuery: BaseQuery,
    tagTypes: ['login'],
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'login',
                body: credentials,
                method: 'POST'
            }),
            invalidatesTags: ['login'],
            onQueryStarted: onQueryStartedErrorToast
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'register',
                body: credentials,
                method: 'POST'
            }),
            invalidatesTags: ['login'],
            onQueryStarted: onQueryStartedErrorToast
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authAPI;
// export default BaseQuery;
