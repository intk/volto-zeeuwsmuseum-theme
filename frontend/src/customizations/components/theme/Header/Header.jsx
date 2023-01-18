/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component, useState, useEffect } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
  Breadcrumbs,
  NavItems,
} from '@plone/volto/components';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 30 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
const Header = (props) => {
  /**
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

  const scrollDirection = useScrollDirection();
  const menuItems = props.menuItems;

  return (
    <Segment
      basic
      className={`header-wrapper ${
        scrollDirection === 'down' ? 'hide' : 'show'
      }`}
      id="header-wrapper"
      role="banner"
    >
      <Container className="header-container">
        <div className="header">
          <div className="logo-nav-wrapper">
            <div className="logo">
              <a className="logo-written" id="writtenlogo" href="/">
                ZEEUWS MUSEUM
              </a>
            </div>

            {/* This section is for the rest of the menu */}
            <Navigation pathname={props.pathname} />
          </div>
          <div className="tools-search-wrapper">
            <LanguageSelector />
            {!props.token && (
              <div className="tools">
                <Anontools />
              </div>
            )}
          </div>
        </div>
      </Container>

      {props.content != undefined ? (
        props.content['@type'] == 'Document' ||
        props.content['@type'] == 'slideshow' ? (
          <Breadcrumbs pathname={props.pathname} menuItems={props.menuItems} />
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </Segment>
  );
};

export default compose(
  injectIntl,
  connect((state) => ({
    navItems: state.navigation.items,
    items: state.breadcrumbs.items,
    root: state.breadcrumbs.root,
    token: state.userSession.token,
    content: state.content.data,
  })),
)(Header);

// details.propTypes = {
//      * Property types.
//    * @property {Object} propTypes Property types.
//    * @static
//    */
//   static propTypes = {
//     token: PropTypes.string,
//     pathname: PropTypes.string.isRequired,
//   };

//   /**
//    * Default properties.
//    * @property {Object} defaultProps Default properties.
//    * @static
//    */
//   static defaultProps = {
//     token: null,
//   };
// }
