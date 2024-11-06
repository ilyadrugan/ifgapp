import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardShow = (onStateChange?: () => void) => {
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      onStateChange && onStateChange();
      setKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      onStateChange && onStateChange();
      setKeyboardShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardShow;
};
