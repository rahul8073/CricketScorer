import { START_MATCH } from "../constants/constants";

 
 export const MatchReducer=(state={data:[]},action)=>{
    switch (action.type) {
        case START_MATCH:  
        return { ...state, data: action.data };
        default:
            return state;
    }
 }