import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

export type Props = {
  injectedJavaScript: string;
  fullScreen: boolean;
};

const tag: string = 'LemurAppViewerWV';

const ViewerWV: React.FC<Props> = ({ injectedJavaScript, fullScreen }) => {
  const uri: string = 'https://viewer.hal51.ai/';

  // Memoize the container style to prevent recalculation on every render
  const containerStyle = useMemo(() => {
    if (fullScreen) {
      activateKeepAwakeAsync(tag);
      // hideNavigationBar(); // Placeholder: Add real functionality here
      return styles.fullScreenContainer;
    }

    deactivateKeepAwake(tag);
    // showNavigationBar(); // Placeholder: Add real functionality here
    return {
      ...styles.defaultContainer,
      marginTop: 50,
      marginLeft: 20,
      marginRight: 20,
      borderWidth: 5,
      borderColor: 'white',
      borderRadius: 20,
      borderTopRightRadius: 20,
    };
  }, [fullScreen]);

  // WebView error handling
  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView error: ', nativeEvent);
  };

  return (
    <WebView
      style={styles.webView}
      containerStyle={containerStyle}
      source={{ uri }}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccessFromFileURLs={true}
      allowUniversalAccessFromFileURLs={true}
      mixedContentMode="always"
      mediaPlaybackRequiresUserAction={false}
      onError={handleError} // Handle WebView errors
    />
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  defaultContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    backgroundColor: '#000',
  },
});

export default ViewerWV;
