import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Skeleton from '../../../constants/skeleton';

const SubscriptionSkel = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={Skeleton.RADIUS}
      speed={Skeleton.SPEED}
      backgroundColor={Skeleton.BACKGROUND}
      highlightColor={Skeleton.HIGHLIGHT}>
      <>
        <SkeletonPlaceholder.Item paddingVertical={2} height={20} width={60} />
      </>
    </SkeletonPlaceholder>
  );
};

export default SubscriptionSkel;
