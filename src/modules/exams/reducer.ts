import { started, success, failed } from "../../utils/model";

import { ExamsState, initialState } from "./model";
import { ActionTypes, TypeKeys } from "./actions";

export const ExamsReducer = (
  state: ExamsState = initialState,
  action: ActionTypes
): ExamsState => {
  switch (action.type) {
    case TypeKeys.GET_EXAMS_STARTED:
      return { ...state, ...started() };
    case TypeKeys.GET_EXAMS_FAILED:
      return { ...state, ...failed(), error: action.error };
    case TypeKeys.GET_EXAMS_SUCCESS:
      return { ...state, ...success(), ...action.payload.exams };
    default:
      return state;
  }
};