import { AnyAction } from "redux";

export type Reducer<S, A extends AnyAction> = (state: S, action: A) => S;
//The reducer function takes in the current state and an action as arguments, and returns the updated state. The action argument is of type A, which means it must be a valid action that the reducer can handle. The return value of the reducer is the updated state of type S.