import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { injectIntl } from 'react-intl';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Container, List } from 'semantic-ui-react';
// import { RenderBlocks } from '@plone/volto/components';
import { SocialLinks } from '@package/components';
import { useSiteDataContent } from '@package/helpers';
import { Logo } from '@plone/volto/components';

const footertranslations = {
  bezoekadres: {
    en: 'ADDRESS',
    nl: 'BEZOEKADRES',
    de: 'ADRESSE',
  },
  plan_en_bezoek: {
    en: 'PLAN YOUR VISIT',
    nl: 'PLAN EEN BEZOEK',
    de: 'PLANEN SIE IHREN BESUCH',
  },
  contact_algemeen: {
    en: 'CONTACT',
    nl: 'CONTACT ALGEMEEN',
    de: 'KONTAKT',
  },
  contract: {
    en: 'CONTACT',
    nl: 'CONTACT',
    de: 'KONTAKT',
  },
  nieuwsbrief: {
    en: 'NEWSLETTER',
    nl: 'NIEUWSBRIEF',
    de: 'NEWSLETTER',
  },
  schrijf: {
    en: 'Subscribe to our newsletter.',
    nl: 'Schrijf je in voor onze nieuwsbrief en blijf op de hoogte.',
    de: 'Abonnieren Sie unseren Newsletter.',
  },
};

export const Address = ({
  addressTitle,
  address,
  addressSecond,
  addressButton,
  contactTitle,
  phone,
  email,
  contactButton,
  newsletterTitle,
  newsletterText,
}) => (
  <div className="footerInfoBox">
    <div className="titleWrapper">{addressTitle}</div>
    <div>{!!address && <p id="address">{address}</p>}</div>
    <div>{!!addressSecond && <p id="address">{addressSecond}</p>}</div>
    <a
      href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/praktische-info"
      className="text-button"
    >
      {addressButton}
    </a>
  </div>
);

export const Contact = ({
  addressTitle,
  address,
  addressSecond,
  addressButton,
  contactTitle,
  phone,
  email,
  contactButton,
  newsletterTitle,
  newsletterText,
}) => (
  <div className="footerInfoBox">
    <div className="titleWrapper">
      <a href="https://www.zeeuwsmuseum.nl/nl/contact">{contactTitle}</a>
    </div>
    {!!phone && <p id="phoneNumber">{phone}</p>}
    {!!email && (
      <a
        id="mailadress"
        data-linktype="email"
        href={`mailto:${email}`}
        data-val="info@zeeuwsmuseum.nl"
        data-subject="Contact via Zeeuws Museum website"
      >
        {email}
      </a>
    )}

    <a href="https://www.zeeuwsmuseum.nl/nl/contact" className="text-button">
      {contactButton}
    </a>
    <SocialLinks />
  </div>
);

// const FooterBlocks = ({ includeTypes }) => {
//   const siteDataContent = useSiteDataContent();
//   const { blocks = {}, blocks_layout } = siteDataContent;
//   const filtered = blocks_layout?.items?.filter((id) =>
//     includeTypes.includes(blocks[id]?.['@type']),
//   );
//   const properties = {
//     blocks,
//     blocks_layout: {
//       ...blocks_layout,
//       items: filtered,
//     },
//   };
//   return <RenderBlocks content={properties} />;
// };

export function Footer(props) {
  const siteDataContent = useSiteDataContent();
  const { blocks = {} } = siteDataContent;
  const siteDataId = Object.keys(blocks).find(
    (id) => blocks[id]?.['@type'] === 'footerData',
  );

  const footerData = blocks[siteDataId] || {};
  const localeLanguage = props.intl.locale;
  return (
    <container id="footer">
      <div id="top-footer">
        <div className="top-wrapper" id="top-wrap">
          <Address {...footerData} />
          <Contact {...footerData} />
          <div id="footermail" className="footerInfoBox">
            <div className="titleWrapper">
              <p id="footerTitle3">{footerData.newsletterTitle}</p>
            </div>
            <p>{footerData.newsletterText}</p>

            <dd className="portletItem odd">
              <form
                id="newsletter-subscriber-form"
                method="get"
                action="https://zeeuwsmuseum.us13.list-manage.com/subscribe/post-json?c=?"
              >
                <div className="input-group">
                  <input
                    type="text"
                    className="text-widget required form-control input-lg textline-field"
                    placeholder="Email"
                    id="form-widgets-email"
                    name="EMAIL"
                    aria-label="mailchimp-email"
                  />
                  <input
                    type="hidden"
                    value="88e39abc49bff280b2ff566d0"
                    name="u"
                  />
                  <input type="hidden" value="5978f9fd67" name="id" />

                  <span className="input-group-btn">
                    <button
                      className="submit-button"
                      name="form.buttons.subscribe"
                      type="submit"
                      aria-label="mailchimp-submit"
                    >
                      <FaChevronRight />
                    </button>
                  </span>
                </div>
                {/* <div id="subscribe-result" >
                <p className="error-msg" >Aanmelden op nieuwsbrief mislukt.</p>
                <p className="success-msg">Bedankt voor uw aanmelding. U ontvangt een e-mail waarin uw inschrijving wordt bevestigd.</p>
              </div> */}
              </form>
            </dd>
          </div>
        </div>
        {/* <div className="footerInfoBox">
          <div className="titleWrapper">
            <FooterBlocks includeTypes={['actionLinks']} />
          </div>
        </div> */}
      </div>
      <div id="bottom-footer">
        <div id="footerdown">
          <Logo id="footerLogo" />
        </div>
      </div>
    </container>
  );
}

export default injectIntl(Footer);
