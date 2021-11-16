import { Maybe, Subs, SubType } from "../types";

export default <T>(subs?: Maybe<Subs<T>>) => {
    if(subs) return (type: SubType) => subs[type] ? [subs[type]]: [];
    else return (type: SubType) => [];
}