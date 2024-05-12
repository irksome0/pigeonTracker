
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "",
    email: "",
    isAdmin: false,
  },
  reducers: {
    userCreate(state, action) {
        return {...state,
            username: action.payload.name,
            email: action.payload.email,
            isAdmin: action.payload.admin
        }
    },
  },
})

export const { userCreate } = userSlice.actions
export default userSlice.reducer