import React from 'react';
import { Grid, Message } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import cx from 'classnames';
import { getScaleUrl, getPath } from '../utils';
import '../css/roundtiled.less';

export const Card = (props) => {
  const { title, link, attachedimage, image_scale } = props;

  return (
    <div className="card">
      {link ? (
        <>
          <UniversalLink className="card-link" href={link}>
            <LazyLoadComponent>
              <div
                className="card-image"
                style={
                  attachedimage
                    ? {
                        backgroundImage: `url(${getScaleUrl(
                          getPath(attachedimage),
                          image_scale || 'preview',
                        )})`,
                      }
                    : {}
                }
              ></div>
            </LazyLoadComponent>
            <span className="card-title">{title}</span>
          </UniversalLink>
        </>
      ) : (
        <>
          <LazyLoadComponent>
            <div
              className="card-image"
              style={
                attachedimage
                  ? {
                      backgroundImage: `url(${getScaleUrl(
                        getPath(attachedimage),
                        image_scale || 'preview',
                      )})`,
                    }
                  : {}
              }
            ></div>
          </LazyLoadComponent>
          <span className="card-title">{title}</span>
        </>
      )}
    </div>
  );
};

const RoundTiled = (props) => {
  const { data, editable } = props;
  const { title, cards, image_scale } = data;

  return cards && cards.length > 0 ? (
    <div
      className={cx(
        'block align imagecards-block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <BodyClass className="has-card-tiles" />
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
      >
        <div className="roundtiled">
          <h2 className="roundtiled-title">{title}</h2>
          <div className="cards">
            <Grid className="cards-grid">
              {(cards || []).map((card, i) => (
                <Grid.Column key={i} mobile={12} tablet={6} computer={3}>
                  <Card {...card} image_scale={image_scale} />
                </Grid.Column>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>{editable ? <Message>No image cards</Message> : ''}</>
  );
};

export default RoundTiled;
