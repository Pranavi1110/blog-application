import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Information Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h6 className="fw-semibold fs-6">INFORMATION</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-decoration-none text-light">Pages</a></li>
              <li><a href="#" className="text-decoration-none text-light">Our Team</a></li>
              <li><a href="#" className="text-decoration-none text-light">Features</a></li>
              <li><a href="#" className="text-decoration-none text-light">Pricing</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h6 className="fw-semibold fs-6">RESOURCES</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-decoration-none text-light">Wikipedia</a></li>
              <li><a href="#" className="text-decoration-none text-light">React Blog</a></li>
              <li><a href="#" className="text-decoration-none text-light">Terms & Service</a></li>
              <li><a href="#" className="text-decoration-none text-light">Angular Dev</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h6 className="fw-semibold fs-6">HELP</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-decoration-none text-light">Sign Up</a></li>
              <li><a href="#" className="text-decoration-none text-light">Login</a></li>
              <li><a href="#" className="text-decoration-none text-light">Terms of Service</a></li>
              <li><a href="#" className="text-decoration-none text-light">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-12 col-sm-6 col-md-3 mb-3 text-center text-md-start">
            <h6 className="fw-semibold fs-6">CONTACT US</h6>
            <p className="mb-1 small">Reach out if you need any assistance.</p>
            <p className="fw-bold small">
              <a href="tel:+919010974531" className="text-decoration-none text-light">
                +91 7075809373
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-3 border-top pt-3 small">
          <p className="mb-0">&copy; {new Date().getFullYear()} BLOG APP, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
