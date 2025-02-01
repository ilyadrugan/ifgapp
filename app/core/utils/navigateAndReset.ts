import { CommonActions } from "@react-navigation/native";

export const navigateAndReset = (navigation, routeName, params = {}) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Индекс указывает, какая страница будет начальной в стеке
        routes: [{ name: routeName, params }],
      })
    );
  };