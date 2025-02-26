import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { startMatch } from '../Redux/action/Game';

export default function Game() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Bowl, setBowl] = useState(null);
  const [wicket, setWicket] = useState(false)
  const [wide, setWide] = useState(false)
  const [NoBall, setNoball] = useState(false)
  const [bayes, setByes] = useState(false)
  const [legbayes, setLegByes] = useState(false)
  const [swap, setSwap] = useState(false)
  const Data = useSelector(state => state.MatchReducer);
  // console.log(Data?.data, "jjjjjjjjj");

  const [run, setRun] = useState();
  const [userId, SetUserId] = useState();
  // Batsmen statistics
  const [striker, setStriker] = useState();
  const [nonstriker, setNonStriker] = useState();
  const [bowler, setBowler] = useState();


  // Match statistics
  const [firstInning, setFirstInning] = useState(null);
  const [secondInning, setSeccondInning] = useState(null);
  const [currentInning, setcurrentInning] = useState(null);
  const [teams, setTeams] = useState(null);
  const [toss, setToss] = useState(null);
  const [overs, setOvers] = useState(5);
  const [totalBalls, setTotalBalls] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);

  // Over information
  const [currentOver, setCurrentOver] = useState(0); // Starting with 0 overs bowled
  const [currentBalls, setCurrentBalls] = useState(0); // Starting with 0 balls in the current over



  // Track runs and extras for the current over
  const [currentOverDetails, setCurrentOverDetails] = useState([]);
  useEffect(() => {
    socket.on('updatedRoom', (data) => {
      console.log(typeof (data), data?.MatchData, "socketupdatedboard");
      dispatch(startMatch(data))
      SetUserId(data.userId);
      setStriker(data?.MatchData?.CurrentPlayers.striker)
      setNonStriker(data?.MatchData?.CurrentPlayers.nonStriker)
      setBowler(data?.MatchData?.CurrentPlayers?.currentBowler)
      setFirstInning(data?.MatchData?.innings[0])
      setSeccondInning(data?.MatchData?.innings[1])
      setTeams(data?.MatchData?.teams)
      setToss(data?.MatchData.toss)
      setOvers(data?.MatchData.overs)
      setcurrentInning(data?.MatchData?.currentInning)
    });
    socket.on('completedOvers', (data) => {
      console.log(typeof (data), data, "completedOvers");
    });
    socket.on('InningComplete', (data) => {
      console.log(typeof (data), data, "InningComplete");
    });
    socket.on('MatchComplete', (data) => {
      console.log(typeof (data), data, "MatchComplete");
    });

    // SetUserId(Data.data.userId);
    // setStriker(Data?.data?.MatchData?.CurrentPlayers.striker)
    // setNonStriker(Data?.data?.MatchData?.CurrentPlayers.nonStriker)
    // setBowler(Data.data?.MatchData?.CurrentPlayers?.currentBowler)
    // setFirstInning(Data?.data?.MatchData?.innings[0])
    // setSeccondInning(Data?.data?.MatchData?.innings[1])
    // setTeams(Data?.data?.MatchData?.teams)
    // setToss(Data?.data?.MatchData.toss)
    // setOvers(Data?.data?.MatchData.overs)
    // setcurrentInning(Data?.data?.MatchData?.currentInning)
  }, [])
  const handleRunClick = (value) => {
    const runsdata = {
      userId,
      strikerName: striker?.player,
      bowlerName: bowler?.player,
      run: value,
      wicket,
      wide,
      noball: NoBall,
      byes: bayes,
      legbyes: legbayes,
      striker: true,
    }
    socket.emit("updateScoreBoard", runsdata)
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
            <Text className="text-3xl text-white">{teams?.hostTeam}
              <Text className="text-[25px] text-white text"> vs</Text> {teams?.visitorTeam}
            </Text>
            {/* <Text className="text-sm text-white text">vs</Text> */}
          </View>
        </View>
      </View>
      {/* score */}
      <View className="px-5 py-2 bg-white mx-3 my-1 rounded-lg">
        <View className="flex flex-row justify-between ">
          <Text className="bg-white text-lg w-[50%]">
            {((toss?.wonBy === teams?.hostTeam || toss?.wonBy === teams?.visitorTeam) && toss?.optedTo === 'Bowl') ? teams?.visitorTeam : teams?.hostTeam}
            ,<Text>{currentInning === 1 ? "1st Inning" : "2nd Inning"}</Text>
          </Text>
          <Text className="text-lg w-[50%] text-right">CRR</Text>
        </View>

        {currentInning === 1 ? (
          <View className="flex flex-row justify-between mt-2">
            <Text className="text-[25px] text-black font-bold w-[50%]">

              {firstInning?.score}-{firstInning?.wickets}<Text className="font-normal text-[20px]">({`${firstInning?.overs}/${overs}`})</Text>
            </Text>
            <Text className="text-[20px] w-[50%] text-right">{firstInning?.overs > 0 ? parseFloat(firstInning?.score / firstInning?.overs).toFixed(2) : "0.0"}</Text>
          </View>

        ) : (
          <View className="flex flex-row justify-between mt-2">
            <Text className="text-[25px] text-black font-bold w-[50%]">

              {secondInning?.score}-{secondInning?.wickets}<Text className="font-normal text-[20px]">({`${secondInning?.overs}/${overs}`})</Text>
            </Text>
            <Text className="text-[20px] w-[50%] text-right">{secondInning?.overs > 0 ? parseFloat(secondInning?.score / secondInning?.overs).toFixed(2) : "0.0"}</Text>



          </View>
        )
        }


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
        {/* batsman1 */}
        <View className="flex px-2  flex-row justify-between ">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
            {striker?.player}
          </Text>
          {/* run */}
          <Text className="text-sm w-[12%]">{striker?.runs}</Text>
          {/* bawl */}
          <Text className="text-sm w-[12%]">{striker?.balls}</Text>
          {/* 4s */}
          <Text className="text-sm w-[12%]">{striker?.fours}</Text>
          {/* 6s */}
          <Text className="text-sm w-[12%]">{striker?.sixes}</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          {/* strike rate */}
          <Text className="text-sm w-[16%]">{striker?.strikeRate}</Text>
        </View>
        {/* batsman2 */}
        <View className="flex px-2  flex-row justify-between ">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
            {nonstriker?.player}
          </Text>
          {/* run */}
          <Text className="text-sm w-[12%]">{nonstriker?.runs}</Text>
          {/* ball */}
          <Text className="text-sm w-[12%]">{nonstriker?.balls}</Text>
          {/* 4s */}
          <Text className="text-sm w-[12%]">{nonstriker?.fours}</Text>
          {/* 6s */}
          <Text className="text-sm w-[12%]">{nonstriker?.sixes}</Text>
          {/* strike rate */}
          <Text className="text-sm w-[16%]">{nonstriker?.strikeRate}</Text>
        </View>

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
            {bowler?.player}
          </Text>
          {/* over */}
          <Text className="text-sm w-[12%]">{bowler?.overs}</Text>
          {/* maiden */}
          <Text className="text-sm w-[12%]">{bowler?.maidenOvers}</Text>
          {/* run */}
          <Text className="text-sm w-[12%]">{bowler?.runs}</Text>
          {/* wicket */}
          <Text className="text-sm w-[12%]">{bowler?.wickets}</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          {/* economy */}
          <Text className="text-sm w-[16%]">{bowler?.economy}</Text>
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
