import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import React, {useState} from 'react';
import {white} from '../../constants/colors';

type Props = {
  renderItem: any;
  data: any;
  refreshAction: () => void;
  onPageChange: (page: number) => void;
  EmptyList?: React.ReactElement;
};

const PaginatedList = ({
  data,
  renderItem,
  refreshAction,
  EmptyList,
  onPageChange,
}: Props) => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handlePageChange = () => {
    if (loading) return;
    try {
      setLoading(true);
      setPage(page + 1);
      onPageChange(page + 1);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(false);
            refreshAction();
            setRefresh(false);
          }}
        />
      }
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item._id}
      ListEmptyComponent={EmptyList && EmptyList}
      onEndReachedThreshold={0}
      ListFooterComponent={
        loading ? <ActivityIndicator size={30} color={white} /> : <View />
      }
      onEndReached={handlePageChange}
    />
  );
};

export default PaginatedList;
