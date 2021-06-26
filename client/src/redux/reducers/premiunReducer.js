import {
  PAYMENT_METHOD,
  PREMIUM_REQUEST,
  PREMIUM_SUCCESS,
  PREMIUM_ERROR,
} from "../constants";

const initialState = {
  isPremium: false,
  error: false,
  isLoading: false,
};

const premiumReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_METHOD: {
      return {
        ...state,

        error: false,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};

export default premiumReducer;
