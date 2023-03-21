import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { ListingBlockHeader } from '@package/components';

import Card from './ListingCard';

const ListingTemplate = (props) => {
  const { items } = props;

  return (
    <>
      <ListingBlockHeader data={props} />

      <Grid columns={4} className="listings">
        {items.map((item, i) => (
          <Grid.Column
            mobile={12}
            tablet={6}
            computer={3}
            className="listing-column"
            key={i}
          >
            <Card {...props} item={item} />
          </Grid.Column>
        ))}
      </Grid>
    </>
  );
};

ListingTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ListingTemplate;
