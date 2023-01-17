import {FlatList, RefreshControl} from 'react-native';
import React, {useState} from 'react';

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
  const [page, setPage] = useState(1);

  const handlePageChange = () => {
    setPage(page + 1);
    onPageChange(page + 1);
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
      key={item => item._id}
      ListEmptyComponent={EmptyList && EmptyList}
      onEndReached={handlePageChange}
    />
  );
};

export default PaginatedList;
