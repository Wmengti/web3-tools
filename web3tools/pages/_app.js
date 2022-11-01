import '../styles/globals.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { padWidth, avalancheChain } from '../utils';
import { useMemo, useEffect, useState } from 'react';
import ColorModeContext from '../store/colorModeContext';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import CssBaseline from '@mui/material/CssBaseline';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  defaultChains,
} from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
function MyApp({ Component, pageProps }) {
  const { chains, provider } = configureChains(defaultChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== avalancheChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
    // publicProvider(),
  ]);
  const { connectors } = getDefaultWallets({ appName: '0x3c tools', chains });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  useEffect(() => {
    let localTheme = window.localStorage.getItem('mode');
    setMode(localTheme || 'light');
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Helvetica Neue',
            'PingFang SC',
            'Microsoft YaHei',
            'Source Han Sans SC',
            'Noto Sans CJK SC',
            'WenQuanYi Micro Hei',
            'Roboto',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
        palette: {
          mode: mode,
          primary: {
            main: mode === 'light' ? '#000' : '#fff',
          },
          secondary: {
            main: '#f50057',
          },
          action: {
            selected: mode === 'light' ? '#bdbdbd' : '#424242',
          },
          background: {
            default: mode === 'light' ? '#f9f9fa' : '#303030',
            paper: mode === 'light' ? '#fff' : '#202020',
            input: mode === 'light' ? '#fafafa' : '#424242',
            border: mode === 'light' ? '#202020' : '#fff',
          },
          border: {
            main: mode === 'light' ? '#202020' : '#fff',
          },
        },
      }),
    [mode]
  );
  theme.typography.h3 = {
    fontSize: '3rem',
    fontWeight: 'normal',
    [`@media (max-width: ${padWidth})`]: {
      fontSize: '2rem',
    },
  };
  theme.typography.h4 = {
    fontSize: '2.4rem',
    fontWeight: 'normal',
    [`@media (max-width: ${padWidth})`]: {
      fontSize: '1.8rem',
    },
  };
  theme.typography.h5 = {
    fontSize: '2rem',
    fontWeight: 'normal',
    [`@media (max-width: ${padWidth})`]: {
      fontSize: '1.8rem',
    },
  };

  theme.typography.body1 = {
    fontSize: '1.4rem',
    [`@media (max-width: ${padWidth})`]: {
      fontSize: '1.2rem',
    },
  };

  theme.typography.body2 = {
    fontSize: '1.2rem',
    [`@media (max-width: ${padWidth})`]: {
      fontSize: '1rem',
    },
  };
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
