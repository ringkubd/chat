import {setErrors} from "../store/service/error";

const onQueryStartedErrorToast = async (args, {  dispatch,
    getState,
    extra,
    requestId,
    queryFulfilled,
    getCacheEntry,
    updateCachedData }) => {
    try {
        await queryFulfilled;
    } catch (error) {
        const {error: baseError} = error;
        if (baseError){
            dispatch(setErrors({status: baseError?.status ?? null, message: baseError?.data?.message ?? null}));
        }
    }
};


export {
    onQueryStartedErrorToast
}
