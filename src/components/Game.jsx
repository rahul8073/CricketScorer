import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

export default function Game() {
  const navigation = useNavigation();
  const [Bowl, setBowl] = useState(null);
  const [wicket, setWicket] = useState(false)
  const [wide, setWide] = useState(false)
  const [NoBall, setNoball] = useState(false)
  const [bayes, setByes] = useState(false)
  const [legbayes, setLegByes] = useState(false)
  const [swap, setSwap] = useState(false)
  const route = useRoute();
  const { striker, nonstriker, bowler } = route.params;
  const Data = useSelector(state => state.MatchReducer);
  console.log(Data?.data, striker, nonstriker, bowler, Data?.data.opted, Data?.data.toss, "jjjjjjjjj");

  const [run,setRun]=useState();
  // Batsmen statistics
  const [strikerRuns, setStrikerRuns] = useState(0);
  const [strikerBallsFaced, setStrikerBallsFaced] = useState(0);
  const [strikerFours, setStrikerFours] = useState(0);
  const [strikerSixes, setStrikerSixes] = useState(0);

  const [nonStrikerRuns, setNonStrikerRuns] = useState(0);
  const [nonStrikerBallsFaced, setNonStrikerBallsFaced] = useState(0);
  const [nonStrikerFours, setNonStrikerFours] = useState(0);
  const [nonStrikerSixes, setNonStrikerSixes] = useState(0);

  // Match statistics
  const [totalRuns, setTotalRuns] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);

  // Over information
  const [currentOver, setCurrentOver] = useState(0); // Starting with 0 overs bowled
  const [currentBalls, setCurrentBalls] = useState(0); // Starting with 0 balls in the current over


  
  // Track runs and extras for the current over
  const [currentOverDetails, setCurrentOverDetails] = useState([]);

  const handleRunClick = (value) => {
    let extraRun = 0;
    let ballRun = value;

    if (wide || NoBall) {
      extraRun = 1;
    }

    if (bayes || legbayes) {
      // Update total runs and balls
      setTotalRuns(totalRuns + value + extraRun);
      setCurrentOverDetails([...currentOverDetails, { run: ballRun, extra: extraRun, wide, NoBall, bayes, legbayes }]);

      if (!wide && !NoBall) {
        setTotalBalls(totalBalls + 1);
        setCurrentBalls(currentBalls + 1);
        if (swap) {
          setNonStrikerBallsFaced(nonStrikerBallsFaced + 1);
          // setNonStrikerRuns(nonStrikerRuns + value);
        } else {
          setStrikerBallsFaced(strikerBallsFaced + 1);
          // setStrikerRuns(strikerRuns + value);
        }
      }

      // Check for completion of the over
      if (currentBalls === 5) {
        setCurrentOver(currentOver + 1);
        setCurrentBalls(0);
        setCurrentOverDetails([]);
        setSwap(!swap)
      }
    } else {
      // Update batsman and match statistics based on current batsman
      if (!wide && !NoBall) {
        // Update total balls
        setTotalBalls(totalBalls + 1);
        setCurrentBalls(currentBalls + 1);
      }
      if (swap) {
        setNonStrikerBallsFaced(nonStrikerBallsFaced + 1);
        setNonStrikerRuns(nonStrikerRuns + value);
      } else {
        setStrikerBallsFaced(strikerBallsFaced + 1);
        setStrikerRuns(strikerRuns + value);
      }


      // Update total runs
      setTotalRuns(totalRuns + value + extraRun);

      // Update over details
      setCurrentOverDetails([...currentOverDetails, { run: ballRun, extra: extraRun, wide, NoBall }]);

      if (wicket) {
        setTotalWickets(totalWickets + 1);
      }

      // Check for completion of the over
      if (currentBalls === 5) {
        setCurrentOver(currentOver + 1);
        setCurrentBalls(0);
        setCurrentOverDetails([]);
        setSwap(!swap)
      }

      // swap batsman  if 1 or 3 run take
      if(value==1|| value==3){
        setSwap(!swap)
      }

      // Check for boundaries (4s and 6s)
      if (value === 4) {
        if (swap) {
          setNonStrikerFours(nonStrikerFours + 1);
        } else {
          setStrikerFours(strikerFours + 1);
        }
      } else if (value === 6) {
        if (swap) {
          setNonStrikerSixes(nonStrikerSixes + 1);
        } else {
          setStrikerSixes(strikerSixes + 1);
        }
      }
    }

    // Reset states for extras
    setWide(false);
    setNoball(false);
    setByes(false);
    setLegByes(false);
  };



  // console.log(run,'0000000000000000');
  
  return (
    <View>
      {/* heading */}
      <View className="bg-green-700 flex flex-row justify-between">
        <View className="flex flex-row gap-3 p-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="flex flex-row items-center pt-1.5">
            <Icon name="arrow-left" size={14} color="white" />
          </TouchableOpacity>
          <View className="flex flex-row">
            <Text className="text-3xl text-white">{Data?.data.hostTeam}
              <Text className="text-[25px] text-white text"> vs</Text> {Data?.data.visitorTeam}
            </Text>
            {/* <Text className="text-sm text-white text">vs</Text> */}
          </View>
        </View>
      </View>
      {/* score */}
      <View className="px-5 py-2 bg-white mx-3 my-1 rounded-lg">
        <View className="flex flex-row justify-between ">
          <Text className="bg-white text-lg w-[50%]">
            {((Data?.data.toss === Data?.data.hostTeam || Data?.data.toss === Data?.data.visitorTeam) && Data?.data.opted === 'Bowl') ? Data?.data.visitorTeam : Data?.data.hostTeam}
            ,<Text>1st inning</Text>
          </Text>
          <Text className="text-lg w-[50%] text-right">CRR</Text>
        </View>
        <View className="flex flex-row justify-between mt-2">
          <Text className="text-[25px] text-black font-bold w-[50%]">
            {totalRuns}-{totalWickets}<Text className="font-normal text-[20px]">({`${currentOver}.${currentBalls}`})</Text>
          </Text>
          <Text className="text-[20px] w-[50%] text-right">{parseFloat(totalRuns/(currentOver+currentBalls/6)).toFixed(2)}</Text>
        </View>
      </View>
      {/* batsman and bowler */}
      <View className=" bg-white mx-3 my-1 rounded-lg">
        {/* batsman heading */}
        <View className="flex px-2 py-2 flex-row justify-between border-b border-gray-500">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap ">
            Batsman
          </Text>
          <Text className="text-lg w-[12%]">R</Text>
          <Text className="text-lg w-[12%]">B</Text>
          <Text className="text-lg w-[12%]">4s</Text>
          <Text className="text-lg w-[12%]">6s</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-lg w-[12%]">SR</Text>
        </View>
        {swap ?
          <>
            {/* batsman1 */}
            <View className="flex px-2  flex-row justify-between ">
              <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
                {nonstriker}
              </Text>
              {/* run */}
              <Text className="text-sm w-[12%]">{nonStrikerRuns}</Text>
              {/* bawl */}
              <Text className="text-sm w-[12%]">{nonStrikerBallsFaced}</Text>
              {/* 4s */}
              <Text className="text-sm w-[12%]">{nonStrikerFours}</Text>
              {/* 6s */}
              <Text className="text-sm w-[12%]">{nonStrikerSixes}</Text>
              {/* <Text className="text-lg w-[10%]">R</Text> */}
              {/* strike rate */}
              <Text className="text-sm w-[16%]">{parseFloat(nonStrikerRuns / nonStrikerBallsFaced * 100).toFixed(0)}</Text>
            </View>
            {/* batsman2 */}
            <View className="flex px-2  flex-row justify-between ">
              <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
                {striker}
              </Text>
              {/* run */}
              <Text className="text-sm w-[12%]">{strikerRuns}</Text>
              {/* ball */}
              <Text className="text-sm w-[12%]">{strikerBallsFaced}</Text>
              {/* 4s */}
              <Text className="text-sm w-[12%]">{strikerFours}</Text>
              {/* 6s */}
              <Text className="text-sm w-[12%]">{strikerSixes}</Text>
              {/* <Text className="text-lg w-[10%]">R</Text> */}
              {/* strike rate */}
              <Text className="text-sm w-[16%]">{parseFloat(strikerRuns / strikerBallsFaced * 100).toFixed(0)}</Text>
            </View>
          </>
          :
          <>
            {/* batsman1 */}
            <View className="flex px-2  flex-row justify-between ">
              <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
                {striker}
              </Text>
              {/* run */}
              <Text className="text-sm w-[12%]">{strikerRuns}</Text>
              {/* bawl */}
              <Text className="text-sm w-[12%]">{strikerBallsFaced}</Text>
              {/* 4s */}
              <Text className="text-sm w-[12%]">{strikerFours}</Text>
              {/* 6s */}
              <Text className="text-sm w-[12%]">{strikerSixes}</Text>
              {/* <Text className="text-lg w-[10%]">R</Text> */}
              {/* strike rate */}
              <Text className="text-sm w-[16%]">{parseFloat(strikerRuns / strikerBallsFaced * 100).toFixed(2)}</Text>
            </View>
            {/* batsman2 */}
            <View className="flex px-2  flex-row justify-between ">
              <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
                {nonstriker}
              </Text>
               {/* run */}
              <Text className="text-sm w-[12%]">{nonStrikerRuns}</Text>
              {/* ball */}
              <Text className="text-sm w-[12%]">{nonStrikerBallsFaced}</Text>
              {/* 4s */}
              <Text className="text-sm w-[12%]">{nonStrikerFours}</Text>
              {/* 6s */}
              <Text className="text-sm w-[12%]">{nonStrikerSixes}</Text>
              {/* strike rate */}
              <Text className="text-sm w-[16%]">{parseFloat(nonStrikerRuns / nonStrikerBallsFaced * 100).toFixed(2)}</Text>
            </View>
          </>


        }

        {/* Bowler heading */}
        <View className="flex px-2 mt-1 flex-row justify-between border-b border-gray-500">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap ">
            Bowler
          </Text>
          <Text className="text-lg w-[12%]">O</Text>
          <Text className="text-lg w-[12%]">M</Text>
          <Text className="text-lg w-[12%]">R</Text>
          <Text className="text-lg w-[12%]">W</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-lg w-[12%]">ER</Text>
        </View>
        {/* Bowler */}
        <View className="flex px-2  flex-row justify-between ">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
            {bowler}
          </Text>
          {/* over */}
          <Text className="text-sm w-[12%]">5.5</Text>
          {/* maiden */}
          <Text className="text-sm w-[12%]">1</Text>
          {/* run */}
          <Text className="text-sm w-[12%]">20</Text>
          {/* wicket */}
          <Text className="text-sm w-[12%]">2</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          {/* economy */}
          <Text className="text-sm w-[16%]">{parseFloat(20 / 5.5).toFixed(3)}</Text>
        </View>
      </View>

      {/* this over */}
      <View className="flex flex-row p-2 mx-3 my-1 bg-white rounded-lg">
        <Text>This over: </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row  gap-2 ">
          {currentOverDetails.map((detail, index) => (
              <View key={index}>
                <Text className="px-2 py-0.5 m-0 rounded-full border text-xs">
                  {detail.run}
                  {detail.extra > 0 ? `+${detail.extra}` : ''}
                  {detail.wide ? ' wd' : ''}
                  {detail.NoBall ? ' nb' : ''}
                  {detail.bayes ? ' bye' : ''}
                  {detail.legbayes ? ' legbye' : ''}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* scoring option */}
      <View className=" p-2 mx-3 my-1 bg-white rounded-lg">
        <View className="flex flex-row justify-between">
          <TouchableOpacity onPress={() => setWide(!wide)}>
            <View className="flex flex-row gap-1">
              <View className="flex flex-row items-center">
                <Text
                  className={`h-4 w-4  border   ${wide && 'bg-green-800'
                    }`}></Text>
              </View>
              <Text>Wide</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNoball(!NoBall)}>
            <View className="flex flex-row gap-1">
              <View className="flex flex-row items-center">
                <Text
                  className={`h-4 w-4  border   ${NoBall && 'bg-green-800'
                    }`}></Text>
              </View>
              <Text>No Ball</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setByes(!bayes)}>
            <View className="flex flex-row gap-1">
              <View className="flex flex-row items-center">
                <Text
                  className={`h-4 w-4  border   ${bayes && 'bg-green-800'
                    }`}></Text>
              </View>
              <Text>Byes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLegByes(!legbayes)}>
            <View className="flex flex-row gap-1">
              <View className="flex flex-row items-center">
                <Text
                  className={`h-4 w-4  border   ${legbayes && 'bg-green-800'
                    }`}></Text>
              </View>
              <Text>LegByes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between my-3">
          <TouchableOpacity onPress={() => setWicket(!wicket)}>
            <View className="flex flex-row gap-1">
              <View className="flex flex-row items-center">
                <Text
                  className={`h-4 w-4  border   ${wicket && 'bg-green-800'
                    }`}></Text>
              </View>
              <Text>Wicket</Text>
            </View>
          </TouchableOpacity>
          <View className="flex flex-row gap-x-2 text-white">
            <TouchableOpacity onPress={() => setBowl(0)} className="bg-green-700 p-2 rounded-lg">
              <Text className="text-center text-white">Retire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSwap(!swap)} className="bg-green-700 p-2 rounded-lg">
              <Text className="text-center text-white">Swap Batsman</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      {/* run set */}
      <View className="flex flex-row gap-2 p-2 mx-3 my-1 bg-white rounded-lg">
        <View className="  ">
          <TouchableOpacity onPress={() => setBowl(0)} className="bg-green-700 p-2 mb-2 rounded-lg">
            <Text className="text-center text-white">Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBowl(0)} className="bg-green-700 p-2 mb-2 rounded-lg">
            <Text className="text-center text-white">Partnerships</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBowl(0)} className="bg-green-700 p-2 mb-2 rounded-lg">
            <Text className="text-center text-white">Extras</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          // flexDirection: 'row',
          // flexWrap: 'wrap',
          // justifyContent: 'flex-start', // Adjust as per your layout needs
          // backgroundColor: 'yellow',
          // padding: 10,
          
        }} className={`flex flex-row justify-items-start p-2 w-[300px] flex-wrap`}>
          {[...Array(7)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleRunClick(index)}>
              <View className="rounded-full w-10 h-10 border border-black justify-between items-center mb-2 mr-2">
                <Text style={{ fontSize: 20, textAlign: 'center' }}>{index}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>


      </View>
    </View>
  );
}
