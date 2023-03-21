import { UniversalLink } from '@plone/volto/components';
import { ListingBlockHeader } from '@package/components';

import './less/az-listing.less';

const AgendaListingTemplate = (data) => {
  const { items = [] } = data;
  const groups = items.reduce(
    (acc, item) => ({
      ...acc,
      [item.title[0].toLowerCase()]: [
        ...(acc[item.title[0].toLowerCase()] || []),
        item,
      ],
    }),
    {},
  );

  return (
    <div className="az-listing">
      <ListingBlockHeader data={data} />

      <div className="az-listing-nav">
        {Object.keys(groups)
          .sort()
          .map((letter) => (
            <a key={letter} href={`#g-${letter}`}>
              {letter}
            </a>
          ))}
      </div>

      <div className="az-listing-content">
        {Object.keys(groups)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <h4 className="letter" id={`g-${letter}`}>
                {letter}
              </h4>
              <ul
                className={`az-list ${
                  groups[letter].length > 6 ? 'multi-column' : 'single-column'
                }`}
              >
                {groups[letter].map((item) => (
                  <li key={item['@id']}>
                    <UniversalLink item={item}>{item.title}</UniversalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AgendaListingTemplate;
