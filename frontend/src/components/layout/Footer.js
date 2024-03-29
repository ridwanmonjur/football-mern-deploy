import React from "react";

const Footer = () => {
  return (

    <div className="mx-auto mb-5 text-center shadow" style={{ borderRadius: "10px", width: "80%", backgroundColor: "white" }}>
      <div className="row py-5 mx-auto text-center">
        <div className="col-12 py-2 col-lg-6">
          <div className="mt-n3 text-danger">
            <a className="fb-ic" href="https://www.facebook.com/ridwan.monjur.1/" alt="Facebook">
              <i className="fab fa-facebook-f fa-lg  mr-md-5 mr-3 fa-2x text-danger">
              </i>
            </a>
            <a className="tw-ic" href="https://twitter.com/BinMonjur" alt="Twitter">
              <i className="fab fa-twitter fa-lg  mr-md-5 mr-3 fa-2x text-danger">
              </i>
            </a>
            <a className="gplus-ic" href="mailto:mjrrdn@gmail.com" alt="Gmail">
              <i className="fab fa-google-plus fa-lg  mr-md-5 mr-3 fa-2x text-danger">
              </i>
            </a>
            <a className="li-ic" href="https://www.linkedin.com/in/ridwan-monjur-21255917b/" alt="Linkedin">
              <i className="fab fa-linkedin-in fa-lg  mr-md-5 mr-3 fa-2x text-danger">
              </i>
            </a>
            <a className="ins-ic" href="https://www.instagram.com/monjur.ridwan/" alt="Instagran">
              <i className="fab fa-instagram fa-lg  mr-md-5 mr-3 fa-2x text-danger">
              </i>
            </a>
          </div>

        </div>
        <div className="col-12 col-lg-6 pb-2">
          <div className="d-flex justify-content-center align-items-center text-danger mt-n2">
            &copy; 2020, Copyrighted by 
            <a href="https://www.instagram.com/monjur.ridwan/" className="text-danger">&nbsp;Ridwan Bin Monjur</a>
          </div>
        </div>

      </div>


    </div >

  );
}

export default Footer;