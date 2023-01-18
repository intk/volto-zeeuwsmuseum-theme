/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */
// import { BsChevronDown } from 'react-icons/bs';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import { Dropdown, Menu, Accordion, Form } from 'semantic-ui-react';
import cx from 'classnames';
import { BodyClass, getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getNavigation } from '@plone/volto/actions';
import { CSSTransition } from 'react-transition-group';
import NavItems from '@plone/volto/components/theme/Navigation/NavItems';
import { FaChevronDown } from 'react-icons/fa';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    lang: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
    };
  }

  componentDidMount() {
    const { settings } = config;
    if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
      this.props.getNavigation(
        getBaseUrl(this.props.pathname),
        settings.navDepth,
      );
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { settings } = config;
    if (
      nextProps.pathname !== this.props.pathname ||
      nextProps.token !== this.props.token
    ) {
      if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
        this.props.getNavigation(
          getBaseUrl(nextProps.pathname),
          settings.navDepth,
        );
      }
    }
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      return;
    }
    this.setState({ isMobileMenuOpen: false });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */



  render() {
    const { activeIndex } = this.state;

    const PlanContent = (
      <div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/praktische-info">
            Praktische informatie
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/nu-in-het-museum">
            Zien en doen
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/kinderen-klas-of-groep">
            Families, groupen en scholen
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/leukdagjeuit">
            Dagje uit Middelburg
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/boek-je-bezoek">
            Boek je bezoek
          </a>
        </div>
      </div>
    );

    const OntdekContent = (
      <div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/videotheek">Videotheek</a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/collectie/mode-en-streekdracht">
            Mode en streekdracht
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/collectie/wandtapijten">
            Wandtapijten
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/collectie/geschiedenis-en-archeologie">
            Geschiedenis en archeologie
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/collectie/kunst">Kunst</a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/collectie/kunstnijverheid">
            Kunstnijverheid
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/collectie/natuurhistorie">
            Natuurhistorie
          </a>
        </div>
      </div>
    );
    const OverContent = (
      <div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/steun-het-museum">
            Steun het museum
          </a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/pers">Pers</a>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/organisatie">
            Organisatie
          </a>
          <div>
            <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/publicaties">
              Publicaties
            </a>
          </div>
        </div>
        <div>
          <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/voorwaarden">
            Voorwaarden
          </a>
        </div>
      </div>
    );

    const rootPanels = [
      {
        key: 'panel-1',
        title: (
          <Accordion.Title>
            <p>
              PLAN JE BEZOEK <FaChevronDown color="#808080" />
            </p>
          </Accordion.Title>
        ),
        content: { content: PlanContent },
      },
      {
        key: 'panel-2',
        title: (
          <Accordion.Title>
            <p>
              ONTDEK <FaChevronDown color="#808080" />
            </p>
          </Accordion.Title>
        ),
        content: { content: OntdekContent },
      },
      {
        key: 'panel-2',
        title: (
          <Accordion.Title>
            <p>
              OVER HET MUSEUM <FaChevronDown color="#808080" />
            </p>
          </Accordion.Title>
        ),
        content: { content: OverContent },
      },
    ];
    return (
      <nav className="navigation" id="navigation" aria-label="navigation">
        <div className="hamburger-wrapper mobile tablet only">
          <button
            className={cx('hamburger hamburger--spin', {
              'is-active': this.state.isMobileMenuOpen,
            })}
            aria-label={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            title={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>

        <Menu
          stackable
          pointing
          secondary
          className="computer large screen widescreen only"
          onClick={this.closeMobileMenu}
        >
          {/* <Menu.Item
            className="simple"
            name="editorials"
            onClick={this.handleItemClick}
            href="http://volto.cihanandac.net"
          >
            JAARVERSLAG
          </Menu.Item> */}

          <Dropdown
            item
            icon={<FaChevronDown color="#808080" />}
            simple
            text="PLAN JE BEZOEK"
          >
            <Dropdown.Menu>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/praktische-info">
                  Praktische informatie
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/nu-in-het-museum">
                  Zien en doen
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/kinderen-klas-of-groep">
                  Families, groupen en scholen
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/leukdagjeuit">
                  Dagje uit Middelburg
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/boek-je-bezoek">
                  Boek je bezoek
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            icon={<FaChevronDown color="#808080" />}
            simple
            text="ONTDEK"
          >
            <Dropdown.Menu>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/videotheek">
                  Videotheek
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/collectie/mode-en-streekdracht">
                  Mode en streekdracht
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/collectie/wandtapijten">
                  Wandtapijten
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/collectie/geschiedenis-en-archeologie">
                  Geschiedenis en archeologie
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/collectie/kunst">
                  Kunst
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/collectie/kunstnijverheid">
                  Kunstnijverheid
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/collectie/natuurhistorie">
                  Natuurhistorie
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            item
            icon={<FaChevronDown color="#808080" />}
            simple
            text="OVER HET MUSEUM"
          >
            <Dropdown.Menu>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/steun-het-museum">
                  Steun het museum
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/pers">
                  Pers
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/organisatie">
                  Organisatie
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/publicaties">
                  Publicaties
                </a>
              </Dropdown.Item>
              <Dropdown.Item id="dropdownItemA">
                <a href="https://www.zeeuwsmuseum.nl/nl/over-het-museum/voorwaarden">
                  Voorwaarden
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item
            className="simple"
            name="editorials"
            onClick={this.handleItemClick}
            href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/boek-je-bezoek"
          >
            TICKETS
          </Menu.Item>
        </Menu>
        <CSSTransition
          in={this.state.isMobileMenuOpen}
          timeout={500}
          classNames="mobile-menu"
          unmountOnExit
        >
          <div key="mobile-menu-key" className="mobile-menu">
            <BodyClass className="has-mobile-menu-open" />
            <div className="mobile-menu-nav">
              <div>
                {/* <Menu.Item
                  name="editorials"
                  onClick={this.handleItemClick}
                  href="http://volto.cihanandac.net"
                >
                  JAARVERSLAG
                </Menu.Item> */}
              </div>
              <div>
                <Accordion
                  className="accordion"
                  panels={rootPanels}
                ></Accordion>
              </div>
              <div>
                <Menu.Item
                  className="simple"
                  name="editorials"
                  onClick={this.handleItemClick}
                  href="https://www.zeeuwsmuseum.nl/nl/plan-je-bezoek/boek-je-bezoek"
                >
                  TICKETS
                </Menu.Item>
              </div>
            </div>
          </div>
        </CSSTransition>
      </nav>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      token: state.userSession.token,
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
)(Navigation);
