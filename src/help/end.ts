import {EndSubscribers, ErrSubscribers, PubSubscribers} from "../types/help";
import pub from "./pub";

const CLEAR = "clear";

const end = <Output>(
    pubSubscribers: PubSubscribers<Output>,
    errSubscribers: ErrSubscribers,
    endSubscribers: EndSubscribers
) => () => {
    pub(endSubscribers)();
    pubSubscribers[CLEAR]();
    errSubscribers[CLEAR]();
    endSubscribers[CLEAR]();
};

export default end;