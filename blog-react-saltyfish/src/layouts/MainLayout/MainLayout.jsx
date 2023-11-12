import Header from './Header'
import Footer from './Footer'
import Background from './Background';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Background />
    </>
  )
}