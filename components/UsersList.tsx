import { useSessionStorage } from "@/utils/useSessionStorage";
import {getUsers} from "@/utils/getUsers";

export const UsersList = async (user: string) => {
    const token = useSessionStorage();
    const dt = await token;
    const data = getUsers(dt?.value as string, user);
    const res = await data;
    return res;
}