const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "₹",
        currencyName: "INR",
        currencyRate: 1
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

            switch (currencyName) {
                case "USD":
                    return {
                        ...state,
                        currencySymbol: "$",
                        currencyRate: 1,
                        currencyName
                    };
                case "EUR":
                    return {
                        ...state,
                        currencySymbol: "€",
                        currencyRate: 1,
                        currencyName
                    };
                case "GBP":
                    return {
                        ...state,
                        currencySymbol: "£",
                        currencyRate: 1,
                        currencyName
                    };
                case "INR":
                    return {
                        ...state,
                        currencySymbol: "₹",
                        currencyRate: 1,
                        currencyName
                    };
                default:
                    return state;
            }
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
