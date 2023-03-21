import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink, UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { PreviewImage } from '@plone/volto/components';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const DefaultTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{linkTitle || href}</UniversalLink>;
  }

  return (
    <>
      {/* <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <div className="listing-body">
                <h4>{item.title ? item.title : item.id}</h4>
                <p>{item.description}</p>
              </div>
            </ConditionalLink>
          </div>
        ))}
      </div> */}
      <div id="page-listing">
        <section id="content-core">
          {items.map((item) => (
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
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};
DefaultTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default DefaultTemplate;
