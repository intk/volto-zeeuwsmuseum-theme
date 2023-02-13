import { List } from 'semantic-ui-react';
import { useSiteDataContent } from '@package/helpers';

import defaultIcon from '@package/icons/link.svg';

import {
  FaFacebookF,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaTwitch,
} from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import { ImInstagram } from 'react-icons/im';

const SocialLink = ({ href = '', title = '' }) => {
  const icon = title.toLowerCase();
  switch (icon) {
    case 'facebook':
      return (
        <a href={href}>
          <FaFacebookF className="social" />
        </a>
      );
    case 'twitter':
      return (
        <a href={href}>
          <IoLogoTwitter className="social" />
        </a>
      );
    case 'instagram':
      return (
        <a href={href}>
          <ImInstagram className="social" />
        </a>
      );
    case 'linkedin':
      return (
        <a href={href}>
          <FaLinkedin className="social" />
        </a>
      );
    case 'twitch':
      return (
        <a href={href}>
          <FaTwitch className="social" />
        </a>
      );
    case 'tiktok':
      return (
        <a href={href}>
          <FaTiktok className="social" />
        </a>
      );
    case 'youtube':
      return (
        <a href={href}>
          <FaYoutube className="social" />
        </a>
      );
    default:
      return (
        <a href={href}>
          <img
            height="auto"
            title={title}
            src={defaultIcon}
            alt={title}
            className="social"
          />
        </a>
      );
  }
};

const SocialLinks = (props) => {
  const siteDataContent = useSiteDataContent();
  const { blocks = {} } = siteDataContent;
  const siteDataId = Object.keys(blocks).find(
    (id) => blocks[id]?.['@type'] === 'siteData',
  );

  const siteData = blocks[siteDataId] || {};
  const { socialLinks, socialLinksTitle } = siteData;

  return (
    <div className="social-links">
      {socialLinks?.length
        ? socialLinks.map((l, i) => (
            <SocialLink key={`${l.href}-${i}`} href={l.href} title={l.title} />
          ))
        : null}
    </div>
  );
};

export default SocialLinks;
