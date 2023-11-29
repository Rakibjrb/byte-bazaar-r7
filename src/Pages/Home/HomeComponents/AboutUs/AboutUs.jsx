import featuredImg from "../../../../assets/aboutus/aboutusfront.jpg";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div className="frommenu text-white py-20 mb-32">
      <div className="w-full flex justify-center">
        <div className="text-center">
          <h3 className="text-[#fff] italic text-xl">---About---</h3>
          <h2 className="text-3xl md:text-4xl mt-6 py-2 px-10 border-t-2 border-b-2 uppercase">
            About US
          </h2>
        </div>
      </div>

      <div className="md:flex justify-center items-center  pt-12 px-5 lg:px-36">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="md:ml-10">
          <p>
            Byte Bazaar is your go-to destination for cutting-edge tech
            products. We curate a selection of the latest and greatest gadgets,
            electronics, and accessories to enhance your tech lifestyle. We
            accept a variety of payment methods, including credit/debit cards,
            PayPal, and other secure online payment options. Choose the method
            that suits you best during the checkout process.
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4 text-white">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
