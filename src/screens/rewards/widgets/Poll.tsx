import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../../../styles/globals';
import {iPoll} from '../../../types/rewards/rewards';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {md, medium} from '../../../constants/fonts';
import {px2, pyh} from '../../../constants/spacing';
import {answerPollOptionHandler} from '../../../api/rewards/rewardsHandler';
import {width} from '../../../constants/dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {white} from '../../../constants/colors';

type Props = {
  poll: iPoll;
};

const Poll = ({poll}: Props) => {
  let TotalPredictions = 0;
  poll.options.flatMap(option => {
    TotalPredictions += option.predictedBy;
  });
  return (
    <View key={poll._id} style={styles.card}>
      <View style={pollStyles.sponsorView}>
        {poll.sponsor !== null && (
          <Image
            source={{uri: poll.sponsor?.logo}}
            style={globalStyles.avatar}
          />
        )}
        <View style={poll.sponsor !== null && {marginLeft: px2}}>
          <Text
            style={[
              globalStyles.textHeading,
              poll.sponsor !== null && {color: poll.sponsor?.color},
            ]}>
            {poll.title}
          </Text>
          <Text style={globalStyles.textSmallLight}>
            <Icon name="people-outline" size={md} />
            {' ' + poll.participantCount + ' '}
            {poll.participantCount > 1 ? 'Participants' : 'Participant'}
          </Text>
        </View>
      </View>
      <Text style={[globalStyles.textLight, {marginVertical: pyh}]}>
        {poll.question}
      </Text>

      {poll.options.map(option => {
        return poll.userSelection === null ? (
          <Text
            key={option._id}
            onPress={() =>
              poll.userSelection === null &&
              answerPollOptionHandler(poll._id, option._id)
            }
            style={[styles.option, globalStyles.textLight]}>
            {option.option}
          </Text>
        ) : (
          <TouchableOpacity
            key={option._id}
            style={[
              {
                height:
                  option.option.length < 40
                    ? 46
                    : 46 + (option.option.length / 40) * 10,
              },
              option._id === poll.userSelection
                ? poll.sponsor !== null
                  ? [
                      styles.correctPollOptionBorder,
                      {borderColor: poll.sponsor?.color},
                    ]
                  : styles.correctPollOptionBorder
                : styles.pollOptionBorder,
            ]}>
            <View style={[styles.listOption, styles.pollOptionText]}>
              <Text style={[{width: 0.72 * width}, globalStyles.textLight]}>
                {option.option}
              </Text>
              <Text style={globalStyles.textLight}>
                {((option.predictedBy * 100) / TotalPredictions).toFixed(1)}%
              </Text>
            </View>
            <View
              style={[
                {
                  width: (width * 0.88 * option.predictedBy) / TotalPredictions,
                  height:
                    option.option.length < 40
                      ? 46
                      : 46 + (option.option.length / 40) * 10,
                },
                option._id === poll.userSelection
                  ? poll.sponsor !== null
                    ? [
                        styles.correctPollOption,
                        {backgroundColor: `${poll.sponsor?.color}30`},
                      ]
                    : styles.correctPollOption
                  : styles.pollOption,
              ]}
              key={option._id}
            />
          </TouchableOpacity>
        );
      })}
      {poll.sponsor !== null && (
        <Text
          onPress={() =>
            poll.sponsor?.redirectionUrl &&
            Linking.openURL(poll.sponsor?.redirectionUrl)
          }
          style={[
            {
              textAlign: 'right',
              marginTop: pyh,
            },
            globalStyles.textLight,
          ]}>
          Sponsored by{' '}
          <Text
            style={{
              color: poll.sponsor?.color,
              fontFamily: medium,
            }}>
            {poll.sponsor?.name}
          </Text>
        </Text>
      )}
      <Text
        style={[
          globalStyles.flag,
          styles.type,
          poll.sponsor !== null && {
            backgroundColor: poll.sponsor?.color,
            borderColor: poll.sponsor?.color,
            color: white,
          },
        ]}>
        <Icon name="stats-chart" size={20} />
      </Text>
    </View>
  );
};

const pollStyles = StyleSheet.create({
  sponsorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Poll;
