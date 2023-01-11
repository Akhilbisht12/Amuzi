import {View} from 'react-native';
import React, {useEffect} from 'react';
import globalStyles from '../../styles/globals';
import {getQuizNPollsHandler} from '../../api/rewards/rewardsHandler';
import useRewardStore from '../../store/rewardStore';
import Quiz from './widgets/Quiz';
import Poll from './widgets/Poll';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import {px2} from '../../constants/spacing';
import PageHeader from '../../components/Headers/PageHeader';

const Rewards = () => {
  const {quizRewards} = useRewardStore();
  useEffect(() => {
    (async function () {
      await getQuizNPollsHandler(10, 1);
    })();
  }, []);
  return (
    <View style={globalStyles.main}>
      <PageHeader title="Rewards" />
      <ViewWrapper refreshAction={() => getQuizNPollsHandler(10, 1)}>
        <View style={{paddingHorizontal: px2}}>
          {quizRewards.map(item =>
            item.type === 'quiz' ? (
              <Quiz key={item._id} quiz={item} />
            ) : (
              <Poll key={item._id} poll={item} />
            ),
          )}
        </View>
      </ViewWrapper>
    </View>
  );
};

export default Rewards;
