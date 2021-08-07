import {EndSubscribers, ErrSubscribers, PubSubscribers} from "../types/help";
import pub from "./pub";

const end = <T>(
    pubSubscribers: PubSubscribers<T>,
    errSubscribers: ErrSubscribers,
    endSubscribers: EndSubscribers
) => () => {
    pub(endSubscribers)();
    pubSubscribers.clear();
    errSubscribers.clear();
    endSubscribers.clear();
};

export default end;