import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import React, {useState} from 'react';
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    backgroundColor: black,
  },
  mainScroll: {
    flexGrow: 1,
  },
});

export default ViewWrapper;
