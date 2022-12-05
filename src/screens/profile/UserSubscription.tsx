import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import globalStyles from '../../styles/globals';
import {px4} from '../../constants/spacing';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import usePricingStore from '../../store/pricingStore';
import dayjs from 'dayjs';
import {getUserSubscriptionPlanHandler} from '../../handlers/pricing/pricingHandler';

const UserSubscription = () => {
  const {userSubscription, subscriptions} = usePricingStore();
  useEffect(() => {
    (async function () {
      await getUserSubscriptionPlanHandler();
    })();
  }, []);
  return (
    <View style={globalStyles.main}>
      <Text style={[globalStyles.textHeading, {padding: px4}]}>
        User Subscription
      </Text>
      <ViewWrapper>
        <View
          style={{
            paddingHorizontal: px4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={globalStyles.textLight}>{userSubscription?.name}</Text>
          <Text style={globalStyles.textLight}>
            {dayjs(userSubscription?.expiresAt).format('DD-MMM-YYYY hh:mm')}
          </Text>
        </View>
      </ViewWrapper>
    </View>
  );
};

export default UserSubscription;

const styles = StyleSheet.create({});
