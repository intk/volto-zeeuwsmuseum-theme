import React from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from '../helpers';
import { Icon, MaybeWrap, UniversalLink } from '@plone/volto/components';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  moreInfo: {
    id: 'moreInfo',
    defaultMessage: 'More info',
  },
});

const CarouselBody = ({
  index,
  onChangeBlock,
  block,
  data,
  dataBlock,
  isEditMode,
  openObjectBrowser,
}) => {
  const intl = useIntl();
  const href = data.href?.[0];
  const imageType = href && href?.image_field && href.image_field;
  const image = data.preview_image?.[0];
  const handleClick = () => {
    openObjectBrowser({
      onSelectItem: (url, document) => {
        dataBlock.columns[index].title = document.Title;
        dataBlock.columns[index].description = document.Description;
        dataBlock.columns[index].href = [
          {
            '@id': document['@id'],
            Title: document.Title,
            Description: document.Description,
            title: document.Title,
            image_field: document.image_field,
          },
        ];
        onChangeBlock(block, dataBlock);
      },
      mode: 'link',
    });
  };

  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            <div className="toolbar-inner">
              <Button.Group>
                <Button onClick={handleClick} icon basic>
                  <Icon name={navTreeSVG} size="24px" />
                </Button>
              </Button.Group>
              <Input
                placeholder={`${intl.formatMessage(messages.source)}...`}
                onClick={handleClick}
                onFocus={(e) => e.target.blur()}
              />
            </div>
          </div>
        </Message>
      )}
      {href && (
        <div className="grid-teaser-item top">
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={data.openLinkInNewTab ? '_blank' : null}
            tabIndex={-1}
          >
            <>
              {(href.hasPreviewImage || //Although we do not get this attribute any longer from the schema, we still keep it to ensure old content with that attribute still works
                image ||
                imageType === 'image' ||
                imageType === 'preview_image') && (
                <div className="grid-image-wrapper">
                  <img
                    src={flattenToAppURL(
                      getTeaserImageURL(href, image, imageType),
                    )}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
              <div className="title-wrapper">
                <h3>{data?.title}</h3>
                {!dataBlock.hide_description && <p>{data?.description}</p>}
              </div>
            </>
          </MaybeWrap>
        </div>
      )}
    </>
  );
};

export default CarouselBody;
