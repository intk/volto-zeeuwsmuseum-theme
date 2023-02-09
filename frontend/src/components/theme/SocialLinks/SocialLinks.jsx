import { List } from 'semantic-ui-react';
import { useSiteDataContent } from '@package/helpers';

import defaultIcon from '@package/icons/link.svg';
// import LogoImage from '@package/icons/logo.svg';
import FacebookLogo from '@package/static/facebook.svg';
import InstagramLogo from '@package/static/instagram.svg';
import TwitterLogo from '@package/static/twiter.svg';
import YouTubeLogo from '@package/static/youtube.svg';
import LinkedInLogo from '@package/static/linkedin.svg';
import twitchIcon from '@package/icons/twitch.svg';

const SocialLink = ({ href = '', title = '' }) => {
  const icon =
    href.indexOf('facebook') > -1
      ? FacebookLogo
      : href.indexOf('twitter') > -1
      ? TwitterLogo
      : href.indexOf('linkedin') > -1
      ? LinkedInLogo
      : href.indexOf('twitch') > -1
      ? twitchIcon
      : href.indexOf('instagram') > -1
      ? InstagramLogo
      : href.indexOf('youtube') > -1
      ? YouTubeLogo
      : defaultIcon;

  return (
    <a href={href}>
      <img
        height="auto"
        title={title}
        src={icon}
        alt={title}
        className="logo-social"
      />
    </a>
  );
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
      {!!socialLinksTitle && (
        <div className="section-title">{socialLinksTitle}</div>
      )}

      <List>
        {socialLinks?.length
          ? socialLinks.map((l, i) => (
              <List.Item key={i} style={{background:"black"}}>
                {/* <List.Content>
                  <p key={`${l.href}-${i}`}>
                    <a href={l.href}>{l.title}</a>
                  </p>
                </List.Content> */}
                <SocialLink
                  key={`${l.href}-${i}`}
                  href={l.href}
                  title={l.title}
                />
              </List.Item>
            ))
          : null}
      </List>
    </div>
  );
};

export default SocialLinks;
