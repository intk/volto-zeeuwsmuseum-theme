import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { defineMessages, injectIntl, useIntl } from 'react-intl';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Container, List } from 'semantic-ui-react';
// import { RenderBlocks } from '@plone/volto/components';
import { SocialLinks } from '@package/components';
import { useSiteDataContent } from '@package/helpers';
import { Logo } from '@plone/volto/components';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

// const footertranslations = {
//   bezoekadres: {
//     en: 'ADDRESS',
//     nl: 'BEZOEKADRES',
//     de: 'ADRESSE',
//   },
//   plan_en_bezoek: {
//     en: 'PLAN YOUR VISIT',
//     nl: 'PLAN EEN BEZOEK',
//     de: 'PLANEN SIE IHREN BESUCH',
//   },
//   contact_algemeen: {
//     en: 'CONTACT',
//     nl: 'CONTACT ALGEMEEN',
//     de: 'KONTAKT',
//   },
//   contract: {
//     en: 'CONTACT',
//     nl: 'CONTACT',
//     de: 'KONTAKT',
//   },
//   nieuwsbrief: {
//     en: 'NEWSLETTER',
//     nl: 'NIEUWSBRIEF',
//     de: 'NEWSLETTER',
//   },
//   schrijf: {
//     en: 'Subscribe to our newsletter.',
//     nl: 'Schrijf je in voor onze nieuwsbrief en blijf op de hoogte.',
//     de: 'Abonnieren Sie unseren Newsletter.',
//   },
// };

const messages = defineMessages({
  newsletterErrorMessage: {
    id: 'newslettererror',
    defaultMessage: 'Aanmelden op nieuwsbrief mislukt.',
  },
  newsletterSuccessMessage: {
    id: 'newslettersuccess',
    defaultMessage:
      'Bedankt voor uw aanmelding. U ontvangt een e-mail waarin uw inschrijving wordt bevestigd.',
  },
});

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
    <div className="buttonWrapper">
      <a
        href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/praktische-info"
        className="text-button"
      >
        {addressButton}
      </a>
    </div>
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
    <SocialLinks />

    <div className="buttonWrapper">
      <a href="https://www.zeeuwsmuseum.nl/nl/contact" className="text-button">
        {contactButton}
      </a>
    </div>
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

const MailChimpForm = ({ status, message, onValidated }) => {
  // let intl = useIntl();
  let email;
  const submit = () =>
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  return (
    <>
      <div id="newsletter-subscriber-form">
        <div className="input-group">
          <input
            className="text-widget required form-control input-lg textline-field"
            id="form-widgets-email"
            ref={(node) => (email = node)}
            type="email"
            // placeholder={intl.formatMessage(messages.Mailaddress)}
            placeholder="Email"
          />
          <br />
          <span className="input-group-btn">
            <button
              className="submit-button"
              name="form.buttons.subscribe"
              type="submit"
              aria-label="mailchimp-submit"
              onClick={submit}
            >
              <FaChevronRight />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export function Footer(props) {
  let intl = useIntl();
  const siteDataContent = useSiteDataContent();
  const { blocks = {} } = siteDataContent;
  const siteDataId = Object.keys(blocks).find(
    (id) => blocks[id]?.['@type'] === 'footerData',
  );
  const mailchimp_url =
    'https://zeeuwsmuseum.us13.list-manage.com/subscribe/post-json?&u=88e39abc49bff280b2ff566d0&id=5978f9fd67';
  const [status, setStatus] = useState(undefined);

  const footerData = blocks[siteDataId] || {};
  // const localeLanguage = props.intl.locale;
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
            <div className="buttonWrapper">
              <dd className="portletItem odd">
                <MailchimpSubscribe
                  url={mailchimp_url}
                  render={({ subscribe, status, message }) => (
                    <>
                      {setStatus(status)}
                      <MailChimpForm
                        status={status}
                        message={message}
                        onValidated={(formData) => subscribe(formData)}
                      />
                    </>
                  )}
                />
              </dd>
              <div className="message-wrapper">
                <div className="message">
                  {status === 'sending' && (
                    <div style={{ color: 'blue' }}>...</div>
                  )}
                  {status === 'error' && (
                    <div
                      style={{ color: 'red' }}
                      // dangerouslySetInnerHTML={{ __html: message }}
                    >
                      <p>
                        {' '}
                        {intl.formatMessage(messages.newsletterErrorMessage)}
                        error
                      </p>
                    </div>
                  )}
                  {status === 'success' && (
                    <div
                      className="success-msg"
                      style={{ color: 'blue' }}
                      // dangerouslySetInnerHTML={{ __html: message }}
                    >
                      <p>
                        {' '}
                        {intl.formatMessage(messages.newsletterSuccessMessage)}
                      </p>{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
