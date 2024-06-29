"use server"

import { cookies } from "next/headers"

export const useSessionStorage = () => {
    const token = cookies().get("jwt")
    return token
}