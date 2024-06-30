import { START_MATCH } from "../constants/constants";

export const startMatch=(data)=>{
    console.log("Start Match Action called",data);
 return {
        type:START_MATCH,data
 }
}