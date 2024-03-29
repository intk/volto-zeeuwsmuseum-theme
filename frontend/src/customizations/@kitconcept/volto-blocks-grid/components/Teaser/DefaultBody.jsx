/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderContent, Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from './utils';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { useSelector } from 'react-redux';
import { EventDetails } from '@plone/volto/components';
import { useDispatch } from 'react-redux';
import { getBlockContent } from '../../../../../actions/index';
const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const buttonMessage = {
  button: {
    en: 'Read More',
    nl: 'Lees Meer',
    de: 'Weiterlesen',
  },
};

const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

const TeaserDefaultTemplate = (props) => {
  const { className, data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const align = data?.styles?.align;

  const Image = config.getComponent('Image').component || DefaultImage;
  const lang = useSelector((state) => state.intl.locale);
  let content = ' ';

  const dispatch = useDispatch();
  const [contentDate, setContentDate] = useState(' ');

  useLayoutEffect(() => {
    if (href !== undefined) {
      let content = flattenToAppURL(href['@id']);
      dispatch(getBlockContent(content)).then((response) => {
        setContentDate(response);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <div className={cx('block teaser', className)}>
      <>
        {!href && isEditMode && (
          <Message>
            <div className="grid-teaser-item placeholder">
              <img src={imageBlockSVG} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        )}
        {href && (
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={data.openLinkInNewTab ? '_blank' : null}
          >
            <div className="grid-teaser-item default">
              {(href.hasPreviewImage || href.image_field || image) && (
                <div className="grid-image-wrapper">
                  <Image
                    src={flattenToAppURL(
                      getTeaserImageURL({ href, image, align }),
                    )}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
              <div className="content">
                {/* {href[`@type`] === 'Event' && (
                  <EventDetails content={contents} />
                )} */}
                {href[`@type`] === 'Event' &&
                  contentDate !== ' ' &&
                  href !== undefined && <EventDetails content={contentDate} />}
                <h2>{href.Title}</h2>
                {!data.hide_description && <p>{href.Description}</p>}
                <button
                  className={`content-button ${props.data.href[0]['@type']}`}
                >
                  {buttonMessage['button'][lang]}
                </button>
              </div>
            </div>
          </MaybeWrap>
        )}
      </>
    </div>
  );
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;
