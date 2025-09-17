import { createSlice } from "@reduxjs/toolkit";
import { Country } from "@/types";

type CountryState = {
  countryList: Country[];
  selectedCountry: Country[];
};

const initialState: CountryState = {
  countryList: [],
  selectedCountry: [],
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountry: (state, actions) => {
      state.countryList = actions.payload;
    },
    setSelectedCountry: (state, actions) => {
      const tempSelectedCountry = [];

      // Get Country by User Selected
      for (const selectedCountry of actions.payload) {
        for (const country of state.countryList) {
          if (selectedCountry === country.name) {
            tempSelectedCountry.push(country);
          }
        }
      }

      state.selectedCountry = tempSelectedCountry;
    },
  },
});

export const { setSelectedCountry, setCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
