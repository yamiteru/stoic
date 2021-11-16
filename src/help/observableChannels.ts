import { Maybe, Some, Subs } from "../types";
import createChannel from "./createChannel";
import extractListeners from "./extractListeners";

export default <T extends Some>(subs?: Maybe<Subs<T>>) => {
    const s = extractListeners<T>(subs);

    return [
        createChannel<T>(s("next")),
        createChannel<string>(s("error")),
        createChannel<void>(s("end")),
    ] as const;
};