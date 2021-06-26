import axios from "axios";
import swal from "sweetalert";
import {
  PAYMENT_METHOD,
  PREMIUM_REQUEST,
  PREMIUM_SUCCESS,
  PREMIUM_ERROR,
  BEARER,
} from "../constants";

const { REACT_APP_API } = process.env;

export const premiumPlus = (id, order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PREMIUM_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    axios.defaults.headers.common = BEARER();

    //Link para realizar el pago
    const { data } = await axios.post(`${REACT_APP_API}premium/mp/${id}`, order);

    dispatch({
      type: PREMIUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREMIUM_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
