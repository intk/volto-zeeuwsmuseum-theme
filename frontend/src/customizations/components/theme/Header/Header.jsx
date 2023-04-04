/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import {
  Navigation,
  Breadcrumbs,
  Logo,
  UniversalLink,
} from '@plone/volto/components';
import config from '@plone/volto/registry';
import { getBlockContent } from '../../../../actions/index';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';

// This function determines the direction of the page scrolling
// We then pass the result to the Segments className
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
  const { settings } = config;

  const messages = defineMessages({
    site: {
      id: 'Site',
      defaultMessage: 'Site',
    },
    plonesite: {
      id: 'Plone Site',
      defaultMessage: 'Plone Site',
    },
  });

  const [showTOC, setShowTOC] = useState(false);
  const [parentPage, setParentPage] = useState(false);
  const pathname = props.pathname;
  const parentPath = pathname.split('/').slice(0, -1).join('/');
  const changedPath = useLocation();
  const [parentData, setParentData] = useState('');

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getBlockContent(parentPath)).then((response) => {
      setParentData(response);
    });
  }, [changedPath.pathname]);

  useEffect(() => {
    let TOCswitch = false;
    let data = parentData;

    for (const blockKey in data.blocks) {
      if (
        data.blocks.hasOwnProperty(blockKey) &&
        data.blocks[blockKey]['@type'] === 'tableOfContent'
      ) {
        TOCswitch = true;
        document.body.setAttribute('show-table-of-content', TOCswitch);
        setParentPage(false);
      }
    }
    if (TOCswitch === false) {
      for (let block in props.content?.blocks) {
        if (props.content?.blocks[block]['@type'] === 'tableOfContent') {
          setParentPage(true);
          TOCswitch = true;
          document.body.setAttribute('show-table-of-content', TOCswitch);
        }
      }
    }
    document.body.setAttribute('show-table-of-content', TOCswitch);
    setShowTOC(TOCswitch);
  }, [parentData, props.content?.blocks]);

  return (
    <Segment
      basic
      className={`header-wrapper ${
        scrollDirection === 'down' ? 'hide' : 'show'
      }`}
      id="header-wrapper"
      role="banner"
    >
      <container className="header-container">
        <div className="header">
          <div className="logo-nav-wrapper">
            <div className="logo">
              <UniversalLink
                href={settings.isMultilingual ? `/${props.lang}` : '/'}
                title={props.intl.formatMessage(messages.site)}
                key="homelinklogo"
              >
                <p className="logo-written" id="logo-written">
                  ZEEUWS MUSEUM
                </p>
              </UniversalLink>
            </div>
            <Navigation
              pathname={props.pathname}
              menuItems={props.menuItems}
              parentPage={parentPage}
              parentData={parentData}
            />
          </div>
        </div>
      </container>
      {/* This section is to render Breadcrumbs conditionally */}
      {showTOC && (
        <Breadcrumbs
          pathname={props.pathname}
          menuItems={props.menuItems}
          parentPage={parentPage}
          showTOC={showTOC}
          parentData={parentData}
        />
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
    itemsN: state.navigation.items,
    lang: state.intl.locale,
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
