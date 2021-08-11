import {EndSubscribers, ErrSubscribers, PubRequiredSubscribers} from "../types/help";
import pub from "./pub";

const CLEAR = "clear";

const end = <Output>(
    pubSubscribers: PubRequiredSubscribers<Output>,
    errSubscribers: ErrSubscribers,
    endSubscribers: EndSubscribers
) => () => {
    pub(endSubscribers)(undefined);
    pubSubscribers[CLEAR]();
    errSubscribers[CLEAR]();
    endSubscribers[CLEAR]();
};

export default end;
