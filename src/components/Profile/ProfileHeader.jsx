import { CreditCard } from "lucide-react";
import profileCover from "../../assets/profile-cover.webp";
import avatarImage from "../../assets/profile-avatar.jpg";
import useAuthStore from "../../zustang/useAuthStore";

const ProfileHeader = () => {
  const email = useAuthStore((state) => state.email);

  return (
    <section className="relative pt-40 pb-5">
      <img
        src={profileCover}
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <img
            src={avatarImage}
            alt="Profile"
            className="border-4 border-solid border-white rounded-full object-cover h-50 w-50"
          />
        </div>
        <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div className="block">
            <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
              {email?.slice(0, 3)?.toUpperCase()}
            </h3>
            <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
              {email}
            </p>
          </div>
          <button className="cursor-pointer py-3.5 px-5 flex rounded-lg bg-black items-center shadow-sm shadow-transparent transition-all duration-500 ">
            <CreditCard color="white" />
            <span className="px-2 font-semibold text-base leading-7 text-white">
              Buy crypto
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProfileHeader;
