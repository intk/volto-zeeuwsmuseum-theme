import React from 'react';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { Button, Image } from 'semantic-ui-react';


const View = ({ data }) => {
  const{
    photoName,
    photographer
  }= data;
  return (
    <div>
      <p id="photo-credit">{photoName} <br/>{photographer}</p>

    </div>
  );
};

export default View;
