import sbfDownfall from "../../assets/sbf-downfall.jpg";

const SBFDownfall = () => {
  return (
    <>
      <img
        className="h-auto max-w-full ml-auto mr-auto"
        src={sbfDownfall}
        alt="SBF"
      />
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg ">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 ">
              The downfall of a crypto empire
              <span className="font-extrabold"> FTX</span>
            </h2>
            <p className="mb-4 font-medium">
              Sam Bankman-Fried faced serious criminal charges following the
              collapse of FTX, one of the world's largest cryptocurrency
              exchanges. The prosecution presented evidence that he had
              illegally transferred billions of dollars in customer funds to
              Alameda Research, his trading firm, without proper authorization
              or disclosure. This money was then used for high-risk trading,
              personal expenses, and political donations.
            </p>
            <p className="mb-4 font-medium">
              When crypto markets crashed in 2022, Alameda's risky bets went
              wrong, creating a massive hole in FTX's balance sheet. Customers
              tried to withdraw their money but discovered it wasn't there. The
              exchange filed for bankruptcy within days, leaving millions of
              users unable to access their funds.
            </p>
            <p className="mb-4 font-semibold">
              After a lengthy trial, Bankman-Fried was found guilty on multiple
              fraud charges. His conviction sent a clear message that the
              cryptocurrency industry must follow the same legal standards as
              traditional finance. The case highlighted the importance of proper
              oversight and separation between related financial companies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SBFDownfall;
