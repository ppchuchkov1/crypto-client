import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-ftx sm:justify-start">
              <img src={logo} alt="Disney logo" className="h-10" />
            </div>
            <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left">
              This website is not affiliated with Disney. All images, videos,
              and content are used for demonstration purposes only.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">About Us</p>
              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Company History
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Meet the Team
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Employee Handbook
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Our Services</p>
              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Web Design
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Marketing
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Google Ads
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Helpful Links</p>
              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white transition hover:text-white/75"
                      href="/"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex group justify-center sm:justify-start gap-1.5"
                      href="/"
                    >
                      <span className="text-white transition group-hover:text-white/75">
                        Live Chat
                      </span>
                      <span className="relative flex w-2 h-2 -mr-2">
                        <span className="absolute inline-flex w-full h-full bg-ftx rounded-full opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 bg-ftx rounded-full" />
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="pt-6 mt-12 border-t border-gray-800">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-400">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
