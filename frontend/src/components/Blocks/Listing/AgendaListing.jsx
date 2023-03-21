import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import { ListingBlockHeader, FormattedDate } from '@package/components';
import { When } from '@plone/volto/components/theme/View/EventDatesInfo';
import './less/agenda-listing.less';

const Item = ({ item, showDate }) => {
  return (
    <div className="agenda-item">
      <UniversalLink item={item} className="agenda-item-link">
        <div className="agenda-wrapper">
          <div>
            <h3 className="agenda-title">{item.title}</h3>
            <p className="agenda-description">{item.description}</p>
          </div>

          <div className="agenda-right">
            {showDate && (
              <>
                {item['@type'] === 'Event' ? (
                  <When
                    start={item.start}
                    end={item.end}
                    whole_day={true}
                    open_end={item.open_end}
                  />
                ) : (
                  <>
                    {item.EffectiveDate !== 'None' ? (
                      <FormattedDate
                        isoDate={item.EffectiveDate}
                        format="long"
                      />
                    ) : null}
                  </>
                )}
              </>
            )}

            <div>
              {!!item.Subject && (
                <>
                  {item.Subject.map((tag, index) => (
                    <React.Fragment key={index}>
                      <span>{tag}</span>
                      {index < item.Subject.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <span className="arrow down" />
      </UniversalLink>
    </div>
  );
};

const AgendaListingTemplate = (data) => {
  const { items, showDate } = data;

  return (
    <div className="agenda-listing">
      <ListingBlockHeader data={data} />

      <div className="agenda-listing-content">
        {items.map((item, i) => (
          <Item item={item} showDate={showDate} key={i} />
        ))}
      </div>
    </div>
  );
};

export default AgendaListingTemplate;
