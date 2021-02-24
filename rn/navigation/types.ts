import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type Screens = 'Home' | 'Rental' | 'Login' | 'Contact Owner' | 'Checkout' | 'My Rentals' | 'Post Rental';

export type RootStackParamList = {
  Home: undefined;
  Login: { origin: Screens };
  Notifications: undefined;
  Category: { category: string };
  Rental: undefined;
  Checkout: undefined;
  Stripe: { sessionId: string };
  'My Store': undefined | { screen: string };
  'My Rentals': undefined;
  'My Messages': undefined;
  'Contact Owner': undefined;
  'Post Rental': { rentalId: string };
};

export type StoreScreenProps = StackScreenProps<RootStackParamList, 'My Store'>;

export type LoginScreenProps = StackScreenProps<
  RootStackParamList,
  'Login'
>;

export type ContactOwnerScreenProps = StackScreenProps<
  RootStackParamList,
  'Contact Owner'
>;

export type StripeScreenProps = StackScreenProps<
  RootStackParamList,
  'Stripe'
>;

export type PostRentalScreenProps = StackScreenProps<
  RootStackParamList,
  'Post Rental'
>;

export type CategoryScreenProps = StackScreenProps<
  RootStackParamList,
  'Category'
>;

export type RentalScreenProps = StackScreenProps<RootStackParamList, 'Rental'>;

export type ManageRentalScreenProps = StackScreenProps<
  RootStackParamList,
  'My Rentals'
>;


export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type NotificationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

export type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Checkout'
>;


export type AppNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  CompositeNavigationProp<
    DrawerNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<RootStackParamList>
  >
>;
