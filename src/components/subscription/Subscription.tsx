import {
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import globalStyles from '../../styles/globals';
import usePricingStore from '../../store/pricingStore';
import {
  createSubscriptionOrderHandler,
  getEventPassHandler,
  getSubscriptionPlansHandler,
  getUserSubscriptionPlanHandler,
} from '../../handlers/pricing/pricingHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  px1,
  px2,
  px3,
  px4,
  px8,
  py1,
  py2,
  py3,
  pyh,
} from '../../constants/spacing';
import {
  blackLight,
  gray,
  grayLight,
  green,
  white,
} from '../../constants/colors';
import {bold, lg} from '../../constants/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import SuccessModal from '../modals/SuccessModal';
import {width} from '../../constants/dimensions';
import useStore from '../../store/store';
import {useFocusEffect} from '@react-navigation/native';

const Subscription = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const {subscriptions} = usePricingStore();
  const sheetRef = useRef<BottomSheetModal>(null);
  const {setOpenSubscriptionPanel, openSubsriptionPanel, currentEvent} =
    useStore();
  const snapPoints = useMemo(() => [200, 700], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const closeSheet = useCallback(() => {
    setOpenSubscriptionPanel(false);
    sheetRef.current?.close();
  }, [setOpenSubscriptionPanel]);

  useEffect(() => {
    (async function () {
      await getSubscriptionPlansHandler();
    })();
  }, []);

  useEffect(() => {
    if (openSubsriptionPanel === true) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.close();
    }
  }, [openSubsriptionPanel]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (openSubsriptionPanel === true) {
          sheetRef.current?.close();
          setOpenSubscriptionPanel(false);
          return true;
        } else {
          return false;
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [setOpenSubscriptionPanel, openSubsriptionPanel]),
  );

  const handleSubscriptionPurchase = async () => {
    try {
      await createSubscriptionOrderHandler(subscriptions[active]._id);
      await getUserSubscriptionPlanHandler();
      sheetRef.current?.close();
      setVisible(true);
    } catch (error) {}
  };

  return (
    <>
      <BottomSheetModalProvider>
        <BottomSheetModal
          handleStyle={{
            backgroundColor: blackLight,
            borderTopLeftRadius: px8,
            borderTopRightRadius: px8,
          }}
          backgroundStyle={{backgroundColor: gray, borderRadius: px8}}
          handleIndicatorStyle={{backgroundColor: blackLight}}
          containerStyle={{zIndex: 10}}
          enableContentPanningGesture
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.main}>
            <View style={styles.subscriptionHead}>
              <View>
                <Text
                  style={[
                    globalStyles.textHeading,
                    {fontSize: lg, marginTop: py2},
                  ]}>
                  Get Your Subscription
                </Text>
                <Text style={[globalStyles.textLight, {width: width * 0.7}]}>
                  Get access to all live events and watch all videos without
                  ads. Go Ad Free Now
                </Text>
              </View>
              <Pressable onPress={() => closeSheet()}>
                <Icon color={white} name="close-outline" size={25} />
              </Pressable>
            </View>
            <ScrollView>
              {subscriptions.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => setActive(i)}
                    style={[
                      styles.card,
                      {borderColor: active === i ? green : grayLight},
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={[
                          styles.radioButton,
                          {
                            borderColor: active === i ? green : grayLight,
                          },
                        ]}>
                        <View
                          style={[
                            styles.radioActive,
                            {
                              backgroundColor:
                                active === i ? green : 'transparent',
                            },
                          ]}
                        />
                      </View>
                      <View>
                        <Text
                          style={[
                            globalStyles.textHeading,
                            {fontSize: lg, fontFamily: bold},
                          ]}>
                          {item.name}
                        </Text>
                        <Text style={globalStyles.textLight}>
                          Validity: {item.validity} Days
                        </Text>
                      </View>
                    </View>
                    <View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={[
                            globalStyles.textHeading,
                            {
                              textDecorationLine: 'line-through',
                              color: grayLight,
                              marginRight: px2,
                            },
                          ]}>
                          ₹ {item.price}
                        </Text>
                        <Text
                          style={[
                            globalStyles.textHeading,
                            {
                              fontSize: lg,
                              marginVertical: pyh,
                              textAlign: 'right',
                            },
                          ]}>
                          ₹{item.discountPrice}
                        </Text>
                      </View>

                      <Text style={[globalStyles.textLight, styles.flag]}>
                        Save ₹{Math.round(item.price - item.discountPrice)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              onPress={handleSubscriptionPurchase}
              style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>Proceed To Pay</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <SuccessModal
        visible={visible}
        setVisible={setVisible}
        title="Congratulations"
        body="You have successfully purchased the subscription"
        buttonAction={() => {
          currentEvent && getEventPassHandler(currentEvent);
        }}
      />
    </>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: px4,
    backgroundColor: blackLight,
    justifyContent: 'space-between',
    paddingBottom: py3,
    flex: 1,
  },
  subscriptionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: px4,
  },
  card: {
    marginVertical: py1,
    borderWidth: 1,
    borderRadius: px2,
    paddingHorizontal: px2,
    paddingVertical: py2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flag: {
    borderTopRightRadius: px2,
    borderBottomLeftRadius: px2,
    backgroundColor: `${green}30`,
    paddingHorizontal: px4,
    color: green,
    paddingVertical: pyh,
  },
  radioButton: {
    borderWidth: 2,
    padding: px1,
    marginHorizontal: px2,
    borderRadius: px3,
  },
  radioActive: {
    padding: px1,
    borderRadius: px4,
  },
});
