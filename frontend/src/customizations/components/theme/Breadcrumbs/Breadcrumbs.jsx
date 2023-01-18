/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import { BsChevronCompactRight } from 'react-icons/bs';
import NavItems from '@plone/volto/components/theme/Navigation/NavItems';
import { getNavigation } from '@plone/volto/actions';
import { Dropdown, Menu, Accordion, Form } from 'semantic-ui-react';
import { FaChevronDown } from 'react-icons/fa';
import { Navigation } from '@plone/volto/components';

import homeSVG from '@plone/volto/icons/home.svg';

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
        className="breadcrumbs"
        secondary
        vertical
      >
        <Container id="crumbcontainer">
          <Breadcrumb id="folderMap">
            {/* <Link
              to={this.props.root || '/'}
              className="section"
              title={this.props.intl.formatMessage(messages.home)}
            >
              <Icon name={homeSVG} size="18px" />
            </Link>
            {this.props.items.map((item, index, items) => [
              <Breadcrumb.Divider key={`divider-${item.url}`} />,
              index < items.length - 1 ? (
                <Link key={item.url} to={item.url} className="section">
                  {item.title}
                </Link>
              ) : (
                <Breadcrumb.Section key={item.url} active>
                  {item.title}
                </Breadcrumb.Section>
              ),
            ])} */}

            {this.props.menuItems['@type'] == 'Document' ? (
              <Breadcrumb.Section
                className="crumbcontainer"
                key={this.props.menuItems.parent['@url']}
                active
              >
                <a
                  href={this.props.menuItems.parent['@id']}
                  className="parenttitle"
                >
                  {this.props.menuItems.parent.title}
                </a>
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
                text={
                  this.props.items.length > 4
                    ? this.props.items[2].title
                    : 'INHOUD'
                }
                icon={<FaChevronDown color="#808080" />}
              >
                <Dropdown.Menu className="dropdownContentPage">
                  <Dropdown.Item id="InhoudDropdown">
                    <a
                      href={
                        this.props.items.length != undefined &&
                        this.props.items.length > 2
                          ? this.props.menuItems['@type'] == 'Document'
                            ? this.props.items[this.props.items.length - 2].url
                            : this.props.items[this.props.items.length - 1].url
                          : ''
                      }
                    >
                      Beeldimpressie
                    </a>
                  </Dropdown.Item>

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
                        for (let item2 of item1.items) {
                          if (item2.title == parentTitle) {
                            menuArray = item2.items;
                            console.log(menuArray);

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
                              console.log(menuArray);
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

                  {[...menuArray].map((x, i) => (
                    <Dropdown.Item key={i} id="InhoudDropdown">
                      <a href={x.url}>{x.title}</a>
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
