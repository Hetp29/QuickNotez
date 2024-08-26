import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'black' : 'gray.100',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
  components: {
    Box: {
      baseStyle: (props: any) => ({
        bg: props.colorMode === 'dark' ? 'black' : 'white',
      }),
    },
  },
  colors: {
    dark: {
      900: '#1a1a1a', // Black for the main content area
      800: '#2d2d2d', // Dark gray for the sidebar
    },
  },
});

export default theme;
