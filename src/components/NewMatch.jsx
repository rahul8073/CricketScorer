import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { startMatch } from '../Redux/action/Game';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function NewMatch() {
  const [hostTeam, setHostTeam] = useState('');
  const [visitorTeam, setVisitorTeam] = useState('');
  const [toss, setToss] = useState('z');
  const [opted, setOpted] = useState('');
  const [overs, setOvers] = useState('');
  const navigation = useNavigation();

  const handleStartMatch = () => {
    const matchData = {
      hostTeam,
      visitorTeam,
      toss,
      opted,
      overs,
    };
    if (
      matchData.hostTeam &&
      matchData.visitorTeam &&
      matchData.toss &&
      matchData.opted &&
      matchData.overs
    ) {
      navigation.navigate('selectplayer',{hostTeam,visitorTeam,toss,opted,overs,});
    } else {
      Alert.alert('Please Fill All Field');
    }
  };

  return (
    <ScrollView>
      <View>
        {/* Teams */}
        <View>
          <Text style={styles.headerText}>Teams</Text>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="default"
              placeholder="Host Team"
              value={hostTeam}
              onChangeText={setHostTeam}
              style={styles.input}
            />
            <TextInput
              keyboardType="default"
              placeholder="Visitor Team"
              value={visitorTeam}
              onChangeText={setVisitorTeam}
              style={styles.input}
            />
          </View>
        </View>

        {/* Toss */}
        <View>
          <Text style={styles.headerText}>Toss won by?</Text>
          <View style={styles.inputContainer}>
            <View style={styles.optionRow}>
              <TouchableOpacity onPress={() => setToss(hostTeam)}>
                <View style={styles.optionItem}>
                  <View style={styles.radioCircle}>
                    <View
                      style={[
                        styles.radioCircleInner,
                        toss === hostTeam && styles.radioSelected,
                      ]}
                    />
                  </View>
                  <Text>{hostTeam || 'Host Team'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setToss(visitorTeam)}>
                <View style={styles.optionItem}>
                  <View style={styles.radioCircle}>
                    <View
                      style={[
                        styles.radioCircleInner,
                        toss === visitorTeam && styles.radioSelected,
                      ]}
                    />
                  </View>
                  <Text>{visitorTeam || 'Visitor Team'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Opted to */}
        <View>
          <Text style={styles.headerText}>Opted to?</Text>
          <View style={styles.inputContainer}>
            <View style={styles.optionRow}>
              <TouchableOpacity onPress={() => setOpted('Bat')}>
                <View style={styles.optionItem}>
                  <View style={styles.radioCircle}>
                    <View
                      style={[
                        styles.radioCircleInner,
                        opted === 'Bat' && styles.radioSelected,
                      ]}
                    />
                  </View>
                  <Text>Bat</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpted('Bowl')}>
                <View style={styles.optionItem}>
                  <View style={styles.radioCircle}>
                    <View
                      style={[
                        styles.radioCircleInner,
                        opted === 'Bowl' && styles.radioSelected,
                      ]}
                    />
                  </View>
                  <Text>Bowl</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Overs */}
        <View>
          <Text style={styles.headerText}>Overs?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="number-pad"
              placeholder="16"
              value={overs}
              onChangeText={setOvers}
              style={styles.input}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.advanceButton}
            onPress={() => navigation.navigate('AdvanceSetting')}>
            <Text style={styles.advanceButtonText}>Advance Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStartMatch}
            style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Match</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: wp('5%'), // Responsive font size
    color: '#2f855a',
    padding: wp('2%'),
  },
  inputContainer: {
    backgroundColor: 'white',
    marginHorizontal: wp('2%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: hp('1%'),
    padding: wp('1%'),
  },
  optionRow: {
    flexDirection: 'row',
    gap: wp('5%'),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  radioCircle: {
    height: wp('4%'),
    width: wp('4%'),
    borderWidth: 1,
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleInner: {
    height: wp('2%'),
    width: wp('2%'),
    borderRadius: wp('1%'),
  },
  radioSelected: {
    backgroundColor: '#2f855a',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  advanceButton: {
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  advanceButtonText: {
    fontSize: wp('4.5%'),
  },
  startButton: {
    backgroundColor: '#2f855a',
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  startButtonText: {
    color: 'white',
    fontSize: wp('4.5%'),
  },
});
