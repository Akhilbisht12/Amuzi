import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {getUserTransactionsHandler} from '../../handlers/pricing/pricingHandler';
import usePricingStore from '../../store/pricingStore';
import BackTitleHeader from '../../components/Headers/BackTitleHeader';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import {iTransaction} from '../../types/pricing/pricing';
import {
  black,
  blackLight,
  gray,
  grayLight,
  green,
  white,
} from '../../constants/colors';
import globalStyles from '../../styles/globals';
import {px2, px4, py2, pyh} from '../../constants/spacing';
import {width} from '../../constants/dimensions';
import dayjs from 'dayjs';
import {lg, sm, xs} from '../../constants/fonts';
import {styles} from '../watchlist/styles';

const Transactions = () => {
  const {transactions} = usePricingStore();
  useEffect(() => {
    (async function () {
      await getUserTransactionsHandler(1, 10);
    })();
  }, []);

  console.log(transactions);

  const renderTransaction = ({item}: {item: iTransaction}) => {
    return (
      <View
        style={{
          marginHorizontal: px4,
          paddingHorizontal: px2,
          borderRadius: px2,
          paddingVertical: py2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: blackLight,
          elevation: 10,
          marginVertical: pyh,
          position: 'relative',
        }}>
        <Text style={transactionStyles.flag}>
          {item.type === 0 ? 'Event Pass' : 'Subscription'}
        </Text>
        <View>
          <Text style={[globalStyles.textHeading, {width: 0.6 * width}]}>
            {item.type === 0
              ? item.eventTitle
                ? item.eventTitle
                : 'No Info Found'
              : item.planName + ' Plan'}
          </Text>
          <Text
            style={[{color: grayLight, paddingVertical: pyh, fontSize: xs}]}>
            {dayjs(item.paymentAt).format('dddd')}{' '}
            {dayjs(item.paymentAt).format('DD MMM YYYY')}
          </Text>
        </View>
        <Text
          style={[
            globalStyles.textHeading,
            {color: green, fontSize: lg, marginTop: pyh},
          ]}>
          ₹ {item.amount}
        </Text>
      </View>
    );
  };
  const EmptyView = () => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={globalStyles.textLight}>
          All your transactions will be listed here!
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: black}}>
      <BackTitleHeader title="Transactions" />
      <ViewWrapper>
        <FlatList
          contentContainerStyle={{paddingHorizontal: px4}}
          ListEmptyComponent={() => <EmptyView />}
          renderItem={renderTransaction}
          data={transactions}
          keyExtractor={item => item._id}
        />
      </ViewWrapper>
    </View>
  );
};

const transactionStyles = StyleSheet.create({
  flag: {
    backgroundColor: white,
    position: 'absolute',
    top: 0,
    right: 0,
    color: gray,
    paddingHorizontal: px4,
    paddingVertical: pyh,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default Transactions;
