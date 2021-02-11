import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Notifications: undefined;
  Category: { category: string };
  Rental: undefined;
  Checkout: undefined;
  Stripe: { sessionId: string };
  'My Store': undefined;
  'My Rentals': undefined;
  'Post Rental': { rentalId: string }; 
};

export type CategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Category'
>;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type NotificationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Notifications'
>;
export type RentalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Rental'
>;
export type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Checkout'
>;
export type StripeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Stripe'
>;
export type StoreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'My Store'
>;
export type ManageRentalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'My Rentals'
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type PostRentalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Post Rental'
>;

export type AppNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  CompositeNavigationProp<
    DrawerNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<RootStackParamList>
  >
>;
