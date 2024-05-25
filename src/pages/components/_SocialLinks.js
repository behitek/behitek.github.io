import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./styles.module.css";

import socialLinks from "../../data/_SocialLinks";

function SocialLink({ faIcon, alt, url }) {
  return (
    <div>
      <a href={url} target="_blank" className="text-primary-900 hover:text-primary-800">
        <FontAwesomeIcon alt={alt} title={alt} icon={faIcon} size="2x" />
      </a>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      {socialLinks.map((props, idx) => (
        <SocialLink key={idx} {...props} />
      ))}
    </div>
  );
}

export default SocialLinks;
