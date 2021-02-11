import React from 'react';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { firebase } from '../../firebase';
import { usePaginateQuery } from '../../hooks';
import { populateRental } from '../../redux/actions';
import { RentalModel } from '../../models';
import { CategoryScreenNavigationProp } from '../../navigation';
import { Card } from '../../components/card';


interface Props {
  navigation: CategoryScreenNavigationProp;
  route: { params: { category: string } };
}

export const CategoryScreen: React.FC<Props> = ({
  route,
  navigation,
}): JSX.Element => {

  const category: string = route.params.category;
  
  const dispatch = useDispatch();
  const {
    rentals,
    hasMore,
    loadMore,
    resetLoad,
    reloading,
  } = usePaginateQuery(
    firebase.db.collection('rentals').where('category', '==', category)
  );

  const handleSelect = (item: RentalModel): void => {
    dispatch(populateRental(item));
    navigation.navigate('Rental');
  };

  const handleLoadMore = (): void => {    
    if (hasMore) loadMore();
  };

  const renderItem = ({ item }: { item: RentalModel }) => (
    <Card {...item} btnName='View' onSelect={() => handleSelect(item)} />
  );

  return (
    <FlatList
      refreshing={reloading}
      onRefresh={resetLoad}
      data={rentals}
      renderItem={renderItem}
      onEndReachedThreshold={0.2}
      onEndReached={handleLoadMore}
      initialNumToRender={2}
    />
  );
};
