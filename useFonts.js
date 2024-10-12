import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function useCustomFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          ...Feather.font,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Set fontsLoaded to true even if there's an error to prevent the app from getting stuck
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
