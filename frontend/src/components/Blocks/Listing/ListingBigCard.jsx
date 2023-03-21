import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedTime } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { FormattedDate } from '@plone/volto/components';
import { PreviewImage } from '@package/components';

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const Card = ({ item, showDate, showTag, showContentType }) => {
  const size = 'large';
  const { image_field, Subject } = item;
  const tag = Subject && Subject.length > 0 ? Subject[0] : '';

  return (
    <section className="listing-card default-card">
      <Link className="card-link" to={flattenToAppURL(item['@id'])}>
        <div className="card-details">
          <div className="card-content">
            <div className="card-meta">
              {showDate && !!item.effective && (
                <FormattedDate date={item.effective} format={dateOptions} />
              )}
              {showContentType && <span>{item['@type']}</span>}
              {showTag && <span>{tag}</span>}
            </div>
            <h2 className="card-title">{item.title}</h2>

            {!!image_field && (
              <div className="image-wrapper mobile tablet only">
                <PreviewImage
                  item={item}
                  size={size}
                  isFallback={!image_field}
                />
              </div>
            )}
            {!!item.description && (
              <p className="card-description">{item.description}</p>
            )}
          </div>
          <div className="computer large screen widescreen only">
            {!!image_field && (
              <div className="image-wrapper">
                <PreviewImage
                  item={item}
                  size={size}
                  isFallback={!image_field}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </section>
  );
};

const NewsItemCard = ({ item, showDate, showTag, showContentType }) => {
  const size = 'large';
  const { image_field, Subject } = item;
  const tag = Subject && Subject.length > 0 ? Subject[0] : '';

  return (
    <section className="listing-card newsitem-card default-card">
      <Link
        className="card-link"
        to={flattenToAppURL(item['@id'])}
        title={item.title}
      >
        <div className="card-details">
          <div className="card-content">
            <div className="card-meta">
              {showDate && !!item.effective && (
                <FormattedDate date={item.effective} format={dateOptions} />
              )}
              {showContentType && <span>{item['@type']}</span>}
              {showTag && <span>{tag}</span>}
            </div>
            <h2 className="card-title">{item.title}</h2>

            {!!image_field && (
              <div className="image-wrapper mobile tablet only">
                <PreviewImage
                  item={item}
                  size={size}
                  isFallback={!image_field}
                />
              </div>
            )}

            <p className="card-description">{item.description}</p>
          </div>
          <div className="computer large screen widescreen only">
            {!!image_field && (
              <div className="image-wrapper">
                <PreviewImage
                  item={item}
                  size={size}
                  isFallback={!image_field}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </section>
  );
};

const EventCard = ({ item, showDate, showTag, showContentType }) => {
  const size = 'large';
  const { image_field, Subject } = item;
  const tag = Subject && Subject.length > 0 ? Subject[0] : '';

  return item.start ? (
    <section className="listing-card event-card default-card">
      <Link
        className="card-link"
        to={flattenToAppURL(item['@id'])}
        title={item.title}
      >
        <div className="card-details">
          <div className="card-content">
            <div className="card-meta">
              {showDate && (
                <>
                  {!!item.effective && (
                    <FormattedDate date={item.start} format={dateOptions} />
                  )}
                  {!!item.start && (
                    <span>
                      <FormattedTime value={new Date(item.start)} />
                    </span>
                  )}
                </>
              )}
              {showContentType && <span>{item['@type']}</span>}
              {showTag && <span>{tag}</span>}
            </div>
            <h2 className="card-title">{item.title}</h2>

            {!!image_field && (
              <div className="image-wrapper mobile tablet only">
                <PreviewImage
                  item={item}
                  size={size}
                  isFallback={!image_field}
                />
              </div>
            )}

            <p className="card-description">{item.description}</p>
          </div>
          <div className="computer large screen widescreen only">
            {!!image_field && (
              <div className="image-wrapper">
                <PreviewImage
                  item={item}
                  size={size}
                  isFallback={!image_field}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </section>
  ) : (
    <Card item={item} />
  );
};

const cardTypes = {
  default: Card,
  'News Item': NewsItemCard,
  Event: EventCard,
};

const UniversalCard = ({ item, ...rest }) => {
  const CardImpl = cardTypes[item['@type']] || cardTypes['default'];
  return <CardImpl item={item} {...rest} />;
};

export default UniversalCard;
