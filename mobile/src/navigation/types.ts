import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Splash01: undefined;
  Splash02: undefined;
  Onboarding01: undefined;
  Onboarding02: undefined;
  Onboarding03: undefined;
  Login: undefined;
  Signup: undefined;
  Successful: undefined;
};

export type MainTabParamList = {
  Categorie01: undefined;
  Categorie02: undefined;
  MyCart01: undefined;
  Wishlist: undefined;
  Mine01: undefined;
};

export type ShopStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  Categorie03: undefined;
  Mine02: undefined;
  Mine03: undefined;
  Mine04: undefined;
  ProductCategory01: undefined;
  ProductCategory02: undefined;
  ProductCategory03: undefined;
  ProductCategory04: undefined;
  ProductDetails01: undefined;
  ProductDetails02: undefined;
  ProductDetails03: undefined;
  ProductDetails04: undefined;
  MyCart02: undefined;
  MyCart03: undefined;
  MyCart04: undefined;
  Filters: undefined;
  FiltersSuccess: undefined;
  Screener: undefined;
  ClientReviews: undefined;
  OrderDetails: undefined;
  OrderTracking: undefined;
  TrackingAddress: undefined;
  FindingCollectionPoint: undefined;
  RoadMap: undefined;
  DiscountsOffer: undefined;
  Notification: undefined;
  Profile: undefined;
  Settings: undefined;
  Ongoing: undefined;
  Complated: undefined;
  CountryOrRegion: undefined;
  Language: undefined;
  PaymentMathod: undefined;
  PaymentConfirm: undefined;
  ContinueShopping: undefined;
  MessagesList: undefined;
  Message: undefined;
  AudioCall: undefined;
  VideoCall: undefined;
};
