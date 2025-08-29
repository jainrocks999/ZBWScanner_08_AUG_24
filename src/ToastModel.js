import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

const ToastModal = ({
  visible,
  message,
  onHide,
  iconName = "checkmark-circle",
  iconColor = "#333", // dark icon for white background
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto hide after 5s
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide && onHide());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        {/* <Icon name={iconName} size={28} color={iconColor} style={styles.icon} /> */}
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#fff", // white background
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 20,
    zIndex: 1000,
    elevation: 8,
    minWidth: 280, // bigger width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 12,
  },
  toastText: {
    color: "#333", // dark text for white background
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ToastModal;
