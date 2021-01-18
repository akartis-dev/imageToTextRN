import React from 'react';
import { Animated } from 'react-native';
import { Toolbar, COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import Test2 from './Test2';

const uiTheme = {
  palette: {
    primaryColor: COLOR.purple900,
  },
  toolbar: {
    container: {
      height: 70,
    },
  },
};

const App = () => {

  return (
    <>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Toolbar
          leftElement="menu"
          centerElement="Image to text"
        />
        <Test2 />
      </ThemeContext.Provider>
    </>
  );
};

export default App;
