import { SettingsModel, SettingsState, initialState } from "./model";

import { TypeKeys } from "./actions.constants";
import { ActionTypes } from "./actions.types";

export const SettingsReducer = (
  state: SettingsModel = initialState,
  action: ActionTypes
): SettingsState => {
  switch (action.type) {
    case TypeKeys.SET_THEME:
      return { ...state, theme: action.payload.theme };
    case TypeKeys.RESET_THEME_STATE:
      return initialState;
    default:
      return state;
  }
};
