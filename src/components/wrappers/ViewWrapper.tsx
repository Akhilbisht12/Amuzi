import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import React, {useState} from 'react';
import {height} from '../../constants/dimensions';
import {black} from '../../constants/colors';

type Props = {
  children: any;
  refreshAction?: () => void;
};

const ViewWrapper = ({children, refreshAction}: Props) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <View style={styles.main}>
      <FlatList
        data={[]}
        renderItem={null}
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  mainScroll: {
    height: height,
  },
});

export default ViewWrapper;
