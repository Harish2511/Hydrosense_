import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const GrafanaDashboard = () => {
  // Reload the WebView every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Reload the WebView
      // You might need to add a ref to the WebView and call its reload method
    }, 6000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://colab251102.grafana.net/public-dashboards/4f4a95806c6f43ac9a589000dcf53204' }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default GrafanaDashboard;
