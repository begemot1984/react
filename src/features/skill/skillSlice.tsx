import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SEARCH_URL } from "../../common/constants";

export type Skill = {
  id: number;
  name: string;
};

export type SkillState = {
  query: string;
  status: string;
  skills: Skill[];
};

const initState: SkillState = {
  query: "",
  status: "Type something to search...",
  skills: [],
};

export const searchSkills = async (query: string) => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${SEARCH_URL}?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const skillSlice = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    searchSkillRequest: (state, action: PayloadAction<string>) => {
      state.status =
        action.payload.trim() !== "" ? "Loading..." : initState.status;
    },
    searchSkillSuccess: (state, action: PayloadAction<Skill[]>) => {
      state.status = "";
      state.skills = action.payload;
    },
    searchSkillReset: (state) => {
      state.status = initState.status;
      state.skills = [];
    },
    searchSkillFail: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    changeSearchField: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const {
  searchSkillRequest,
  searchSkillSuccess,
  searchSkillReset,
  searchSkillFail,
  changeSearchField,
} = skillSlice.actions;

export const skillReducer = skillSlice.reducer;
