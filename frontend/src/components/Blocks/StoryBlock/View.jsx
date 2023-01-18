import React from 'react';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { Button, Image } from 'semantic-ui-react';


const View = ({ data }) => {
  const{
    title,
    story,
    image
  }= data;
  return (
    <div id='storyBlock' style={{width:"100%", height:'100vh'}}>
      <Image src={image} />
      <h2 id="storyTitle">{title}</h2>
      <p id='storyParagraph'>{story}</p>
    </div>
  );
};

export default View;
