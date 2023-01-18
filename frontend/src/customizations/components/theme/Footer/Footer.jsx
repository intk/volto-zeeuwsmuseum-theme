/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */
import { FaChevronRight, FaFacebookF } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import { ImInstagram } from 'react-icons/im';
import React from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { Logo } from '@plone/volto/components';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  return (
    <container id="footer">
      <div id="top-footer">
        <div className="top-wrapper" id="top-wrap">
          <div className="footerInfoBox">
            <div className="titleWrapper">
              <a href="https://www.zeeuwsmuseum.nl/nl/zeeuws-museum-v4/#">
                BEZOKADRES
              </a>
            </div>
            <p>Abdij (Plein)</p>
            <p id="address">4331 BK, Middleburg</p>
            <a
              href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/praktische-info"
              className="text-button"
            >
              Plan een bezoek
            </a>
          </div>

          <div className="footerInfoBox">
            <div className="titleWrapper">
              <a href="https://www.zeeuwsmuseum.nl/nl/contact">
                CONTACT ALGEMEEN
              </a>
            </div>
            <p id="phoneNumber">+31 (0) 118 653000</p>
            <a
              id="mailadress"
              data-linktype="email"
              href="mailto:info@zeeuwsmuseum.nl?subject=Contact%20via Zeeuws Museum website"
              data-val="info@zeeuwsmuseum.nl"
              data-subject="Contact via Zeeuws Museum website"
            >
              info@zeeuwsmuseum.nl
            </a>

            {/* <br /> */}
            <a
              href="https://www.zeeuwsmuseum.nl/nl/contact"
              className="text-button"
            >
              Contact
            </a>
            <a href="https://twitter.com/Zeeuwsmuseum" target="_blank">
              <IoLogoTwitter className="social" />
            </a>
            <a href="https://www.facebook.com/ZeeuwsMuseum" target="_blank">
              <FaFacebookF className="social" />
            </a>
            <a href="https://www.instagram.com/zeeuws_museum" target="_blank">
              <ImInstagram className="social" />
            </a>
          </div>

          <div id="footermail" className="footerInfoBox">
            <div className="titleWrapper">
              <a id="footerTitle3" href="">
                NIEUWSBRIEF
              </a>
            </div>
            <p> Schrijf je in voor onze nieuwsbrief en blijf op de hoogte. </p>

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
      </div>
      <div id="bottom-footer">
        <div id="footerdown">
          <Logo id="footerLogo" />
        </div>
      </div>
    </container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
