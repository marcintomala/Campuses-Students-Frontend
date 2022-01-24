import React from "react";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  return (
    <footer className="footer--pin">
      <div className="about-us">
        <div className="developers column">
          <h3>Developers</h3>
          <ul>
            <li>Tamala</li>
            <li>Tiego</li>
            <li>Ada</li>
            <li>Nong</li>
          </ul>
        </div>

        <div className="follows column">
          <h3>Follow us</h3>
          <a
            href="https://www.youtube.com"
            className="youtube social"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a
            href="https://www.facebook.com"
            className="facebook social"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.twitter.com"
            className="twitter social"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://www.instagram.com"
            className="instagram social"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>

        <div className="contact-us column">
          <h3>Contact Us</h3>
          <p>Phone: 123-456-7890</p>
          <p>Fax: 123-456-7890</p>
          <p>Email: </p>
        </div>
      </div>
    </footer>
  );
}
