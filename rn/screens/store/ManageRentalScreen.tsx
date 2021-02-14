import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ManageRentalScreenNavigationProp } from '../../navigation';
import { usePaginateQuery } from '../../hooks';
import { firebase } from 'gateway';
import { Card } from '../../components/card';
import { Spinner } from '../../components/spinner';
import { RentalModel } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Row, Text } from 'native-base';


const EmptyMessageContainer = (): JSX.Element => (
  <Row style={{ justifyContent: 'center', marginTop: '5%' }}>
    <Text> Time to post new rentals! </Text>
  </Row>
);

interface ManageRentalProps {
  navigation: ManageRentalScreenNavigationProp;
  route: ManageRentalScreenNavigationProp;
}

export const ManageRentalScreen = ({ navigation }: ManageRentalProps) => {
  const authUser = useSelector((state: RootState) => state.auth.authedUser);
  const {
    rentals,
    hasMore,
    loadMore,
    resetLoad,
    loading,
    reloading,
  } = usePaginateQuery(
    firebase.db
      .collection('rentals')
      .where('ownerUid', '==', authUser?.uid)
      .orderBy('date', 'desc')
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', resetLoad);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: RentalModel }) => (
    <Card
      {...item}
      btnName='Manage'
      onSelect={() => navigation.navigate('Post Rental', { rentalId: item.id })}
    />
  );

  const handleLoadMore = (): void => {
    if (hasMore) loadMore();
  };

  if (loading) return <Spinner />;

  return (
    <FlatList
      testID='flatlist'
      refreshing={reloading}
      onRefresh={resetLoad}
      data={rentals}
      renderItem={renderItem}
      onEndReachedThreshold={0.2}
      onEndReached={handleLoadMore}
      initialNumToRender={2}
      ListEmptyComponent={EmptyMessageContainer}
    />
  );
};
