import { createSlice } from '@reduxjs/toolkit'

const pigeonSlice = createSlice({
  name: 'pigeons',
  initialState: {
    id: 0,
    pigeonNumber: 0,
    yearOfBirth: 0,
    country: "none",
    gender: "",
    colour:"",
    mother:0,
    father:0,
  },
  reducers: {
    pigeonSelect(state, action) {
        return {...state,
            id: action.payload.id,
            pigeonNumber: action.payload.pigeonNumber,
            yearOfBirth: action.payload.yearOfBirth,
            country: action.payload.country,
            gender: action.payload.gender,
            colour: action.payload.colour,
            mother: action.payload.mother,
            father: action.payload.father,
        }
    },
  },
})

export const { pigeonSelect } = pigeonSlice.actions
export default pigeonSlice.reducer