import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type Screens = 'Shop' | 'Rental' | 'Login' | 'Contact Owner' | 'Checkout' | 'My Rentals' | 'Post Rental' | 'Messages' ;

export type RootStackParamList = {
  Shop: undefined;
  Login: { origin: Screens };
  Notifications: undefined;
  Category: { category: string };
  Rental: undefined;
  'Contact Owner': { rentalId: string};
  Checkout: undefined;
  Stripe: { sessionId: string };
  'My Store': undefined | { screen: string };
  'My Rentals': undefined;
  'Messages': undefined;
  'Messenger': { rentalId: string; messageOwnerUid: string};
  'Post Rental': { rentalId: string };
};

export type StoreScreenProps = StackScreenProps<RootStackParamList, 'My Store'>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Shop'
>;

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
export type MessageScreenProps = StackScreenProps<
  RootStackParamList,
  'Messages'
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
  StackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<RootStackParamList>
  >
>;
