import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import globalStyles from '../../../styles/globals';
import {iQuiz} from '../../../types/rewards/rewards';
import {answerQuizOptionHandler} from '../../../api/rewards/rewardsHandler';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {md, medium} from '../../../constants/fonts';
import {px2, pyh} from '../../../constants/spacing';
import {green, white} from '../../../constants/colors';

type Props = {
  quiz: iQuiz;
};

const Quiz = ({quiz}: Props) => {
  return (
    <View key={quiz._id} style={styles.card}>
      <View style={quizStyles.sponsorView}>
        {quiz.sponsor !== null && (
          <Image
            source={{uri: quiz.sponsor?.logo}}
            style={globalStyles.avatar}
          />
        )}
        <View style={quiz.sponsor !== null && {marginLeft: px2}}>
          <Text
            style={[
              globalStyles.textHeading,
              quiz.sponsor !== null && {color: quiz.sponsor?.color},
            ]}>
            {quiz.title}
          </Text>
          <Text style={globalStyles.textSmallLight}>
            <Icon name="people-outline" size={md} />
            {' ' + quiz.participantCount + ' '}
            {quiz.participantCount > 1 ? 'Participants' : 'Participant'}
          </Text>
        </View>
      </View>
      <Text style={[globalStyles.textLight, {marginVertical: pyh}]}>
        {quiz.question}
      </Text>

      {quiz.options.map(option => {
        return (
          <TouchableOpacity
            key={option._id}
            onPress={() =>
              quiz.userSelection === null &&
              answerQuizOptionHandler(quiz._id, option._id)
            }
            style={[
              styles.listOption,
              styles.option,

              option._id === quiz.correctChoice
                ? styles.correctOption
                : option._id === quiz.userSelection
                ? styles.incorrectUserOption
                : {},
            ]}>
            <Text style={globalStyles.textLight}>{option.option}</Text>
            {quiz.correctChoice === option._id && (
              <View style={styles.listOption}>
                {option._id === quiz.userSelection && (
                  <Text
                    style={[
                      globalStyles.textLight,
                      {color: green, marginRight: px2},
                    ]}>
                    You Choose
                  </Text>
                )}
                <Icon name="checkmark-circle" color={green} size={20} />
              </View>
            )}
            {quiz.userSelection === option._id &&
              quiz.userSelection !== quiz.correctChoice && (
                <View style={styles.listOption}>
                  {option._id === quiz.userSelection && (
                    <Text
                      style={[
                        globalStyles.textLight,
                        {color: 'red', marginRight: px2},
                      ]}>
                      You Choose
                    </Text>
                  )}
                  <Icon name="close-circle" color="red" size={20} />
                </View>
              )}
          </TouchableOpacity>
        );
      })}
      {quiz.sponsor !== null && (
        <Text
          onPress={() =>
            quiz.sponsor?.redirectionUrl &&
            Linking.openURL(quiz.sponsor?.redirectionUrl)
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
              color: quiz.sponsor?.color,
              fontFamily: medium,
            }}>
            {quiz.sponsor?.name}
          </Text>
        </Text>
      )}
      <Text
        style={[
          globalStyles.flag,
          styles.type,
          quiz.sponsor !== null && {
            backgroundColor: quiz.sponsor?.color,
            borderColor: quiz.sponsor?.color,
            color: white,
          },
        ]}>
        <Icon name="school" size={20} />
      </Text>
    </View>
  );
};

const quizStyles = StyleSheet.create({
  sponsorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Quiz;
