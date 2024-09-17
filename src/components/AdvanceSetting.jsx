import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function AdvanceSetting() {
  // Independent states for each switch
  const [noBallEnabled, setNoBallEnabled] = useState(false);
  const [reBallEnabled, setReBallEnabled] = useState(false);
  const [wideBallEnabled, setWideBallEnabled] = useState(false);
  const [reWideBallEnabled, setReWideBallEnabled] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.backButton}>
          <Icon name="arrow-left" size={wp('4%')} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Match Settings</Text>
      </View>

      {/* Players per team */}
      <View>
        <Text style={styles.sectionText}>Players per team?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="text"
            placeholder="11"
            style={styles.input}
          />
        </View>
      </View>

      {/* No Ball */}
      <View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>No Ball</Text>
          <Switch
            trackColor={{ false: 'gray', true: 'green' }}
            thumbColor={noBallEnabled ? 'green' : 'white'}
            ios_backgroundColor="green"
            onValueChange={setNoBallEnabled}
            value={noBallEnabled}
          />
        </View>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Re-Ball</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'green' }}
              thumbColor={reBallEnabled ? 'green' : 'white'}
              ios_backgroundColor="green"
              onValueChange={setReBallEnabled}
              value={reBallEnabled}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>No ball run</Text>
            <TextInput
              keyboardType="text"
              placeholder="1"
              style={styles.smallInput}
            />
          </View>
        </View>
      </View>

      {/* Wide Ball */}
      <View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Wide Ball</Text>
          <Switch
            trackColor={{ false: 'gray', true: 'green' }}
            thumbColor={wideBallEnabled ? 'green' : 'white'}
            ios_backgroundColor="green"
            onValueChange={setWideBallEnabled}
            value={wideBallEnabled}
          />
        </View>
        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Re-Ball</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'green' }}
              thumbColor={reWideBallEnabled ? 'green' : 'white'}
              ios_backgroundColor="green"
              onValueChange={setReWideBallEnabled}
              value={reWideBallEnabled}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Wide ball run</Text>
            <TextInput
              keyboardType="text"
              placeholder="1"
              style={styles.smallInput}
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingBottom: hp('2%'),
  },
  header: {
    backgroundColor: '#2f855a',
    padding: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: wp('3%'),
  },
  headerText: {
    fontSize: wp('5%'),
    color: 'white',
  },
  sectionText: {
    fontSize: wp('5%'),
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
    paddingVertical: wp('1%'),
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('2%'),
    paddingVertical: wp('2%'),
  },
  switchLabel: {
    fontSize: wp('4%'),
    color: '#2f855a',
  },
  switchContainer: {
    backgroundColor: 'white',
    marginHorizontal: wp('2%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  smallInput: {
    borderBottomWidth: 1,
    width: wp('10%'),
    textAlign: 'right',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: wp('4%'),
    width: '100%',
    paddingHorizontal: wp('2%'),
  },
  saveButton: {
    backgroundColor: '#2f855a',
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('4.5%'),
  },
});
