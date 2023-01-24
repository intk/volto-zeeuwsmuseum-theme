/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { UniversalLink, PreviewImage } from '@plone/volto/components';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const ListingView = ({ content }) => (
  <Container id="page-home">
    <div id="list-title">
      <h1>{content.title}</h1>
    </div>
    <section id="content-core">
      {content.items.map((item) => (
        <div key={item.url} className="listing-items">
          {/* {(() => {
            let blocks = content.blocks;
            for (let block in blocks) {
              {
                console.log(blocks[block]);
              }
              if (blocks[block]['@type'] == 'slider') {
                console.log(blocks[block].slides[0].['@id']);
              }
            }
          })()} */}

          {item.image_field && (
            <UniversalLink item={item}>
              <PreviewImage
                item={item}
                size="large"
                alt={item.image_caption ? item.image_caption : item.title}
                className="ui image"
              />
            </UniversalLink>
          )}
          <div id="jaarverslag-title">
            <h2>
              <UniversalLink item={item}>{item.title}</UniversalLink>
            </h2>
            {item.description && <p>{item.description}</p>}
          </div>
        </div>
      ))}
    </section>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ListingView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        description: PropTypes.string,
        review_state: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default compose(
  injectIntl,
  connect((state) => ({
    navItems: state.navigation.items,
  })),
)(ListingView);
