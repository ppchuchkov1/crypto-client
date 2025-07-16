import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SBFPrison from "../components/SBF/SBFPrison";
import SBFHero from "../components/SBF/SBFHero";
import SBFTimeline from "../components/SBF/SBFTimeline";
import SBFDownfall from "../components/SBF/SBFDownfall";

const SBF = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <SBFHero />
        <SBFTimeline />
        <SBFDownfall />
        <SBFPrison />
      </div>
      <Footer />
    </>
  );
};

export default SBF;
