import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function NotificationSettings() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림 설정</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>알림 받기</Text>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
});
