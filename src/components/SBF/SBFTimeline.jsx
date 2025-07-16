const SBFTimeline = () => {
  const timelineEvents = [
    {
      date: "May 2019",
      title: "1. The Birth of FTX",
      description:
        "Sam Bankman-Fried launches FTX, a cryptocurrency exchange designed for professional traders. Backed by major investors, it quickly gains popularity for its advanced features and aggressive marketing.",
    },
    {
      date: "2021",
      title: "2. The Peak of Power",
      description:
        "FTX becomes one of the world’s largest crypto exchanges, valued at $32 billion. Sam is hailed as the 'next Warren Buffett' and becomes a major political donor and public figure.",
    },
    {
      date: "November 2022",
      title: "3. The Collapse",
      description:
        "A CoinDesk report reveals shady financial ties between FTX and Alameda Research. Within days, FTX files for bankruptcy. Billions in customer funds are missing. Sam resigns as CEO.",
    },
    {
      date: "March 2024",
      title: "4. The Trial",
      description:
        "After a high-profile trial, Sam Bankman-Fried is found guilty on multiple fraud and conspiracy charges. He is sentenced to 25 years in federal prison, marking one of the biggest fraud convictions in crypto history.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-ftx rounded-full mr-3"></div>
              <span className="text-sm font-semibold text-ftx">
                {event.date}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SBFTimeline;
