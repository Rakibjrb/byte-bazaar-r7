import CommonHelmet from "../../Components/Common/Helmet";

const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto px-3 xl:px-0 mt-10 mb-16">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl capitalize mb-5">FAQs</h2>
        <div className="flex justify-center">
          <div className="w-16 h-2 bg-red-500 rounded-xl"></div>
        </div>
      </div>
      <div className="mt-10 space-y-5">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" defaultChecked="checked" />
          <div className="collapse-title text-xl font-medium">
            1. What is Byte Bazaar?
          </div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Byte Bazaar is your go-to destination
              for cutting-edge tech products. We curate a selection of the
              latest and greatest gadgets, electronics, and accessories to
              enhance your tech lifestyle.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">
            2. How do I place an order?
          </div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> To place an order, simply browse our
              website, add desired products to your cart, and proceed to
              checkout. Follow the on-screen instructions to provide shipping
              information and payment details.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">
            3. What payment methods do you accept?
          </div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> We accept a variety of payment methods,
              including credit/debit cards, PayPal, and other secure online
              payment options. Choose the method that suits you best during the
              checkout process.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">
            4. Is my payment information secure?
          </div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Yes, we take the security of your
              payment information seriously. Our website employs
              industry-standard encryption protocols to ensure that your
              personal and financial data is secure.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-0" />
          <div className="collapse-title text-xl font-medium">
            5. Can I subscribe to receive updates and promotions?
          </div>
          <div className="collapse-content">
            <p>
              <strong>Answer : </strong> Absolutely! Subscribe to our newsletter
              to stay informed about the latest products, promotions, and tech
              trends. Simply enter your email address in the subscription box at
              the bottom of our homepage.
            </p>
          </div>
        </div>
      </div>
      <CommonHelmet titlename={"FAQ"} />
    </div>
  );
};

export default Faq;
