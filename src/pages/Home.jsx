import Header from "../components/Header/Header";
import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import CryptoTable from "../components/Home/CryptoTable";
import NFTSection from "../components/Home/NFTSection";
import TechStack from "../components/Home/TechStack";
import Footer from "../components/Footer/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <CryptoTable />
      <NFTSection />
      <TechStack />
      <Footer />
    </>
  );
};

export default Home;
