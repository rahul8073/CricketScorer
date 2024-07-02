import { SCORE_CARD, START_MATCH } from "../constants/constants";

export const startMatch=(data)=>{
    console.log("Start Match Action called",data);
 return {
        type:START_MATCH,data
 }
}
export const scoreCard=(data)=>{
       console.log(data,"scorecard action");
       return {
              type:SCORE_CARD,
              data
       }
}