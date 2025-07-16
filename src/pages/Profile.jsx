import Header from "../components/Header/Header";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileCryptoCards from "../components/Profile/ProfileCryptoCards";
import ProfileNFT from "../components/Profile/ProfileNFT";
import Footer from "../components/Footer/Footer";

const Profile = () => {
  return (
    <>
      <Header />
      <ProfileHeader />
      <ProfileCryptoCards />
      <ProfileNFT />
      <Footer />
    </>
  );
};

export default Profile;
