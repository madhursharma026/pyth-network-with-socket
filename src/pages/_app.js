import { PriceProvider } from '@/contexts/PriceContext'
import '@/styles/globals.css'
import '@/styles/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './Layout'

export default function App({ Component, pageProps }) {
  return (
    <PriceProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PriceProvider>
  )
}
