import { UniversalLink, Icon } from '@plone/volto/components';
import { ListingBlockHeader } from '@package/components';

import aheadSVG from '@plone/volto/icons/ahead.svg';

const SimpleLinks = (data) => {
  const { items = [] } = data;
  return (
    <div className="simplelinks-listing">
      <ListingBlockHeader data={data} />

      <div className="simplelinks-content">
        {items.map((item) => (
          <div key={item['@id']} className="simplelink-item" title={item.title}>
            <span>
              <UniversalLink item={item}>{item.title}</UniversalLink>
            </span>
            <Icon name={aheadSVG} size="45px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleLinks;
