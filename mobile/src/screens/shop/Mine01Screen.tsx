import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ShopScreen } from "../../components/shop/ShopScreen";
import { messageSamples } from "../../data/shop";
import { colors, radii } from "../../theme/tokens";

const menuItems: Array<{ label: string; route: string }> = [
  { label: "Personal Details", route: "Profile" },
  { label: "My Order", route: "OrderDetails" },
  { label: "My Favourites", route: "Wishlist" },
  { label: "Shipping Address", route: "TrackingAddress" },
  { label: "My Card", route: "PaymentMathod" },
  { label: "Settings", route: "Settings" },
  { label: "Messages", route: "MessagesList" }
];

export function Mine01Screen() {
  const navigation = useNavigation<any>();

  return (
    <ShopScreen title="Mine" subtitle="Your shopping account center">
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.profileName}>Hasan Mahmud</Text>
          <Text style={styles.profileEmail}>riko.fashion.shop@gmail.com</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <Pressable key={item.label} style={styles.menuItem} onPress={() => navigation.navigate(item.route)}>
            <Text style={styles.menuText}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.darkButton} onPress={() => navigation.navigate("DiscountsOffer")}>
        <Text style={styles.darkButtonText}>View Discounts Offer</Text>
      </Pressable>

      <View style={styles.msgPreview}>
        <Text style={styles.msgTitle}>Latest Message</Text>
        <Text style={styles.msgText}>
          {messageSamples[0].from}: {messageSamples[0].message}
        </Text>
      </View>
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 58
  },
  profileName: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 16
  },
  profileEmail: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12
  },
  menuList: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    overflow: "hidden"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder
  },
  menuText: {
    color: colors.textPrimary,
    fontWeight: "600"
  },
  arrow: {
    color: colors.textMuted,
    fontSize: 20
  },
  darkButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 13
  },
  darkButtonText: {
    color: "#fff",
    fontWeight: "700"
  },
  msgPreview: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 12
  },
  msgTitle: {
    color: colors.textPrimary,
    fontWeight: "800"
  },
  msgText: {
    marginTop: 4,
    color: colors.textSecondary
  }
});
