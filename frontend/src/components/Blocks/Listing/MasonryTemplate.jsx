import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { BodyClass } from '@plone/volto/helpers';
import { ListingBlockHeader } from '@package/components';
import config from '@plone/volto/registry';

import Card from './ListingCard';
import './less/search-listing.less';

const Masonry = loadable(() => import('react-masonry-css'));

const MasonryTemplate = (props) => {
  const { items } = props;
  const { breakpointColumnsObj } = config.settings;

  return (
    <>
      <BodyClass className="has-search-listing" />
      <ListingBlockHeader data={props} />

      <div className="masonry-layout-listing">
        <div className="listings">
          <div className="listings ">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {items.map((item, i) => (
                <div className="listing-column" key={i}>
                  <Card item={item} {...props} />
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </>
  );
};

MasonryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MasonryTemplate;
