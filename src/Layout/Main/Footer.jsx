import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#333333] to-[#4b4b4b] font-roboto text-white">
        <footer className="footer px-10 xl:px-0 py-16 text-base-content max-w-7xl mx-auto">
          <aside>
            <div className="flex items-center mb-4">
              <h2 className="text-3xl font-semibold text-white">
                Byte <span className="text-red-500">Bazaar</span>
              </h2>
            </div>
            <p className="text-white">
              Bytebazaar products Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav className="text-white">
            <header className="footer-title text-xl">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="text-white">
            <header className="footer-title text-xl">Company</header>
            <a className="link link-hover">About us</a>
            <Link to="/contact" className="link link-hover">
              Contact
            </Link>
            <a className="link link-hover">Produts</a>
            <a className="link link-hover">Blogs</a>
          </nav>
          <nav className="text-white">
            <header className="footer-title text-xl">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
      <div className="bg-[#000000] py-8">
        <p className="text-center text-white">
          2023 All right reserved by bytebazaar
        </p>
      </div>
    </>
  );
};

export default Footer;
