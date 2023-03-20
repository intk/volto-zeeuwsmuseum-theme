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
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
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
        <Container id="crumbcontainer">
          <Breadcrumb id="folderMap">
            {this.props.menuItems['@type'] == 'Document' &&
            this.props.items.length > 2 ? (
              <Breadcrumb.Section
                className="crumbcontainer"
                key="crumbcontainer"
                active
              >
                <NavLink
                  to={this.props.items[this.props.items.length - 2].url}
                  key="goToParent"
                  className="parenttitle"
                >
                  {this.props.items[this.props.items.length - 2].title}
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
              key={this.props.menuItems['@url']}
              active
            >
              <div className="breadtitle">
                <span>{this.props.menuItems.title}</span>
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
                  {/* <Dropdown.Item id="InhoudDropdown">
                    <NavLink
                      to={
                        this.props.items.length != undefined &&
                        this.props.items.length > 2
                          ? this.props.menuItems['@type'] == 'Document'
                            ? this.props.items[this.props.items.length - 2].url
                            : this.props.items[this.props.items.length - 1].url
                          : ''
                      }
                      key={
                        this.props.items.length != undefined &&
                        this.props.items.length > 2
                          ? this.props.menuItems['@type'] == 'Document'
                            ? this.props.items[this.props.items.length - 2].url
                            : this.props.items[this.props.items.length - 1].url
                          : ''
                      }
                      activeClassName="active"
                    >
                      Beeldimpressie
                    </NavLink>
                  </Dropdown.Item> */}
                  {console.log(this.props.parentData)}

                  {(() => {
                    if (this.props.parentPage === false) {
                      let nav = this.props.navItems;
                      let parentTitle = this.props.menuItems.parent.title;

                      for (let item1 of nav) {
                        if (item1.title == parentTitle) {
                          menuArray = item1.items;
                          for (let item of menuArray) {
                            if (
                              item.title == 'IMAGES' ||
                              item.title == 'images'
                            ) {
                              let placeofItem = menuArray.indexOf(item);
                              if (placeofItem > -1) {
                                menuArray.splice(placeofItem, 1);
                              }
                            }
                          }
                          break;
                        }
                        for (let item2 of item1.items) {
                          if (item2.title == parentTitle) {
                            menuArray = item2.items;
                            for (let item of menuArray) {
                              if (
                                item.title == 'IMAGES' ||
                                item.title == 'images'
                              ) {
                                let placeofItem = menuArray.indexOf(item);
                                if (placeofItem > -1) {
                                  menuArray.splice(placeofItem, 1);
                                }
                              }
                            }
                            break;
                          }
                          for (let item3 of item2.items) {
                            if (item3.title == parentTitle) {
                              menuArray = item3.items;
                              for (let item of menuArray) {
                                if (
                                  item.title == 'IMAGES' ||
                                  item.title == 'images'
                                ) {
                                  let placeofItem = menuArray.indexOf(item);
                                  if (placeofItem > -1) {
                                    menuArray.splice(placeofItem, 1);
                                  }
                                }
                              }
                              break;
                            }
                            for (let item4 of item3.items) {
                              if (item4.title == parentTitle) {
                                menuArray = item4.items;
                                for (let item of menuArray) {
                                  if (
                                    item.title == 'IMAGES' ||
                                    item.title == 'images'
                                  ) {
                                    let placeofItem = menuArray.indexOf(item);
                                    if (placeofItem > -1) {
                                      menuArray.splice(placeofItem, 1);
                                    }
                                  }
                                }
                                break;
                              }
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
