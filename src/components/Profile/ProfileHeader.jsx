import { CreditCard } from "lucide-react";
const ProfileHeader = () => {
  return (
    <section className="relative pt-40 pb-5">
      <img
        src="https://images.wsj.net/im-942199/?width=1280&height=657"
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <img
            src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24289349/STK_226445_Sam_Bankman_Fried_FTX_2.jpg?quality=90&strip=all&crop=16.666666666667,0,66.666666666667,100"
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full object-cover h-50 w-50"
          />
        </div>
        <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div className="block">
            <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
              Emma Smith
            </h3>
            <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
              Engineer at BB Agency Industry <br className="hidden sm:block" />
              New York, United States
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
