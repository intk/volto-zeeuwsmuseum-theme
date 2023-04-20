/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { getBreadcrumbs } from '@plone/volto/actions';
import {
  getBaseUrl,
  hasApiExpander,
  flattenToAppURL,
} from '@plone/volto/helpers';
import { BsChevronCompactRight } from 'react-icons/bs';
import { Dropdown, Menu, Accordion, Form } from 'semantic-ui-react';
import { FaChevronDown, FaRegHandScissors } from 'react-icons/fa';
import { BodyClass } from '@plone/volto/helpers';
import NavItem from '@plone/volto/components/theme/Navigation/NavItem';
import { NavLink } from 'react-router-dom';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

// extra
let menuArray = [];

/**
 * Breadcrumbs container class.
 */
export class BreadcrumbsComponent extends Component {
  state = {
    open: false,
    focus: false,
  };

  closeMobileMenu = () => {
    this.setState({ open: false, focus: false });
  };

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    root: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  componentDidMount() {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(this.props.pathname))) {
      this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      if (!hasApiExpander('breadcrumbs', getBaseUrl(this.props.pathname))) {
        this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
      }
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    let parentURL = '';
    let selfURL = '';
    if (this.props.content != undefined) {
      const parentID = this.props.parentData['@id'];
      const selfID = this.props.content['@id'];
      if (parentID !== undefined) {
        parentURL = flattenToAppURL(this?.props?.parentData['@id']);
      }
      if (selfID !== undefined) {
        selfURL = flattenToAppURL(this?.props?.content['@id']);
      }
    }

    return (
      <Segment
        role="navigation"
        aria-label={this.props.intl.formatMessage(messages.breadcrumbs)}
        className="secondNav"
        id="breadcrumb-container"
        secondary
        vertical
        key={this.props.parentPage}
      >
        {this.props.content != undefined ? (
          this.props.content['@type'] == 'Document' ? (
            <Container id="crumbcontainer">
              <Breadcrumb id="folderMap">
                {this.props.parentPage === false ? (
                  <Breadcrumb.Section
                    className="crumbcontainer"
                    key="crumbcontainer"
                    active
                  >
                    <NavLink
                      to={parentURL}
                      key="goToParent"
                      className="parenttitle"
                    >
                      {this.props.parentData.title}
                    </NavLink>
                    <Breadcrumb.Divider className="breaddivider">
                      <BsChevronCompactRight
                        stroke="white"
                        fill="currentColor"
                        strokeWidth="0.5"
                      />
                    </Breadcrumb.Divider>
                  </Breadcrumb.Section>
                ) : (
                  ''
                )}

                <Breadcrumb.Section
                  className="crumbcontainer"
                  key={this.props.content.title}
                  active
                >
                  <div className="breadtitle">
                    <span>{this.props.content.title}</span>
                  </div>
                </Breadcrumb.Section>
              </Breadcrumb>

              <Container id="dropdowncontainer">
                <div id="inhoud">
                  <Dropdown
                    item
                    simple
                    open={this.state.open}
                    onFocus={this.closeMobileMenu}
                    onBlur={this.closeMobileMenu}
                    text={'INHOUD'}
                    icon={<FaChevronDown color="#808080" />}
                  >
                    <Dropdown.Menu className="dropdownContentPage">
                      {/* this section adds either the parent page or the self to the TOC
                      depending on the position of the page; parent page of child page */}
                      {this.props.parentPage === false ? (
                        <Dropdown.Item id="InhoudDropdown">
                          <NavLink
                            to={parentURL}
                            key={'breadcrumb' + parentURL}
                            activeClassName="active"
                          >
                            {this.props.parentData.title}
                          </NavLink>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item id="InhoudDropdown">
                          <NavLink
                            to={selfURL}
                            key={'breadcrumb' + selfURL}
                            activeClassName="active"
                          >
                            {this.props.content.title}
                          </NavLink>
                        </Dropdown.Item>
                      )}

                      {/* this section adds either the children of the parent page or the
                      children page of the page itself. depending if the page is a parent page or not */}
                      {(() => {
                        if (this.props.parentPage === false) {
                          menuArray = [];
                          if (this.props.parentData.items != undefined) {
                            for (let item of this.props.parentData.items) {
                              if (
                                menuArray.includes(item) == false &&
                                item['@type'] == 'Document'
                              ) {
                                if (item['@id'] != null) {
                                  item.url = flattenToAppURL(item['@id']);
                                  menuArray.push(item);
                                }
                              }
                            }
                          }
                        } else {
                          menuArray = [];
                          if (this.props.menuItems.items != undefined) {
                            for (let item of this.props.menuItems.items) {
                              if (
                                menuArray.includes(item) == false &&
                                item['@type'] == 'Document'
                              ) {
                                menuArray.push(item);
                              }
                            }
                          }
                        }
                      })()}

                      {/* Adding the menu items from the menuArray to the Dropdown itself */}
                      {[...menuArray].map((x, i) => (
                        <Dropdown.Item key={i} id="InhoudDropdown">
                          <NavLink to={x.url} key={x.url} id="InhoudDropdown">
                            {x.title}
                          </NavLink>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Container>
            </Container>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </Segment>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      navItems: state.navigation.items,
      items: state.breadcrumbs.items,
      root: state.breadcrumbs.root,
      content: state.content.data,
    }),
    { getBreadcrumbs },
  ),
)(BreadcrumbsComponent);
