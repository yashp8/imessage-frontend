import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '../chakra/theme';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
