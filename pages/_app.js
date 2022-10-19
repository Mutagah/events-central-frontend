import 'antd/dist/antd.css';
import '../styles/globals.css'
import Navbar from '../components/Navbar';
import Layout from 'antd/lib/layout/layout';
function MyApp({ Component, pageProps }) {
  return( 
    <>
    <Navbar/>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp
