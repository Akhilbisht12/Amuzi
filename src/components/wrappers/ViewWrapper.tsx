import {StyleSheet, RefreshControl, FlatList} from 'react-native';
import React, {useState} from 'react';
import {black} from '../../constants/colors';

type Props = {
  children: any;
  refreshAction?: () => void;
};

const ViewWrapper = ({children, refreshAction}: Props) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[]}
      renderItem={null}
      contentContainerStyle={styles.mainScroll}
      ListEmptyComponent={null}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(true);
            refreshAction && refreshAction();
            setRefresh(false);
          }}
        />
      }
      ListHeaderComponent={() => <React.Fragment>{children}</React.Fragment>}
    />
  );
};

const styles = StyleSheet.create({
  mainScroll: {
    flexGrow: 1,
    backgroundColor: black,
  },
});

export default ViewWrapper;
