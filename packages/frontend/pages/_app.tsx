import { AppProps } from 'next/app'
import Head from 'next/head'

import { ToastProvider } from 'shared/services/toast'
import { GlobalStyles } from 'styles/globals'

import 'antd/dist/antd.css'

function App({ Component, pageProps }: AppProps) {
  const configs = {
    title: 'Sistema de Incidentes',
    description: 'Este é um sistema de gerenciamente de incidentes ITIL',
    themeColor: '#000'
  }

  return (
    <>
      <Head>
        <title>{configs.title}</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={configs.themeColor} />
        <meta name="description" content={configs.description} />
      </Head>
      <GlobalStyles />
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  )
}

export default App
