import { useSessionStorage } from "@/utils/useSessionStorage";
import {getUsers} from "@/utils/getUsers";

export const UsersList = async (user) => {
    const token = useSessionStorage("jwt");
    const dt = await token;
    const data = getUsers(dt.value, user);
    const res = await data;
    return res;
}