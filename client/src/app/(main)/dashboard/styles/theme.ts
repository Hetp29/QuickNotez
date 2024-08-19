import { extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false, 
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
  colors: {
    primary: {
      50: '#ebf8ff',
      100: '#ceedff',
      200: '#b3d9ff',
      300: '#66b2ff',
      400: '#3399ff',
      500: '#1a75ff',
      600: '#005cbf',
      700: '#003d7a',
      800: '#002a5c',
      900: '#001f3f',
    },
    secondary: {
      50: '#f7f6f9',
      100: '#e2e2e5',
      200: '#c8c9d1',
      300: '#a0a2b0',
      400: '#6e6e8b',
      500: '#4a4b68',
      600: '#333547',
      700: '#1f1f2e',
      800: '#1a1a23',
      900: '#0d0d14',
    },
    accent: {
      50: '#fef4f4',
      100: '#fed7d7',
      200: '#fbb5b5',
      300: '#f68787',
      400: '#f56565',
      500: '#e53e3e',
      600: '#c53030',
      700: '#9b2c2c',
      800: '#742a2a',
      900: '#521d1d',
    },
    gray: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  components: {
    Button: {
      baseStyle: (props: any) => ({
        fontWeight: 'bold',
        borderRadius: 'md',
        _focus: {
          boxShadow: 'outline',
        },
      }),
      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
          py: 2,
        },
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'primary.500' : 'primary.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'primary.600' : 'primary.600',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'primary.500' : 'primary.500',
          color: props.colorMode === 'dark' ? 'primary.500' : 'primary.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'primary.100' : 'primary.100',
          },
        }),
      },
    },
  },
});

export default theme;