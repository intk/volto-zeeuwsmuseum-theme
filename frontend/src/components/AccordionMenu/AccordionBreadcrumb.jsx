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
import { FaChevronDown } from 'react-icons/fa';
import NavItem from '@plone/volto/components/theme/Navigation/NavItem';
import config from '@plone/volto/registry';
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
export class AccordionBreadcrumb extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
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
    const { activeIndex } = this.state;
    const { settings } = config;

    return (
      <Segment>
        <Menu stackable pointing secondary>
          <Accordion className="item simple">
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              "INHOUD" <FaChevronDown />
            </Accordion.Title>
            <Accordion.Content
              active={activeIndex === 0}
              onClick={this.closeMobileMenu}
            >
              {(() => {
                // console.log(this.props)
                if (this.props.menuItems['@type'] === 'Document') {
                  let steps = this.props.items;
                  let nav = this.props.navItems;
                  let depth = 0;
                  let parentTitle = this.props.menuItems.parent.title;

                  for (let item1 of nav) {
                    if (item1.title == parentTitle) {
                      menuArray = item1.items;
                      for (let item of menuArray) {
                        if (item.title == 'IMAGES' || item.title == 'images') {
                          // console.log(menuArray)
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
                        // console.log(menuArray);

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
                          // console.log(menuArray);
                          for (let item of menuArray) {
                            if (
                              item.title == 'IMAGES' ||
                              item.title == 'images'
                            ) {
                              // console.log(menuArray)
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
                                // console.log(menuArray)
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

              <ul className="accordionbreadcrumblist">
                <li>
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
                    className="accordion item simple"
                    id="x"
                    activeClassName="active"
                  >
                    Beeldimpressie
                  </NavLink>
                </li>
                {[...menuArray].map((x, i) => (
                  <li>
                    <NavItem
                      item={x}
                      lang={this.lang}
                      key={'accordionnavitem' + x.url}
                      id="x"
                    />
                  </li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion>
        </Menu>
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
)(AccordionBreadcrumb);
