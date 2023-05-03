/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import config from '@plone/volto/registry';
import { EventDetails } from '@plone/volto/components';
// import { NextPrevButtons } from '@package/components';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

/**
 * Component to display the default view.
 * @function DefaultView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = ({ content, intl, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  // if (content['@type'] === 'LRF' && typeof window !== undefined) {
  //   window.location.href = 'https://www.zeeuwsmuseum.nl';
  // }
  useEffect(() => {
    const redirection = (event) => {
      const languageToken = content.language?.token
        ? content.language.token
        : '';
      if (content['@type'] === 'LRF') {
        window.location.href = `https://www.zeeuwsmuseum.nl/${languageToken}`;
      }
    };
    redirection();
  }, [content]);

  return hasBlocksData(content) ? (
    <div id="page-document" className="ui container">
      {map(content[blocksLayoutFieldname].items, (block) => {
        const blockType = content[blocksFieldname]?.[block]?.['@type'];
        const Block = config.blocks.blocksConfig[blockType]?.['view'] || null;
        const documentFirstHeading = blockType === 'title';

        return (
          <>
            {Block !== null ? (
              <Block
                key={block}
                id={block}
                properties={content}
                data={content[blocksFieldname][block]}
                path={getBaseUrl(location?.pathname || '')}
              />
            ) : (
              <div key={block}>
                {intl.formatMessage(messages.unknownBlock, {
                  block: blockType,
                })}
              </div>
            )}
            {documentFirstHeading && <EventDetails content={content} />}
          </>
        );
      })}
      {/* <NextPrevButtons content={content} /> */}
    </div>
  ) : (
    <Container id="page-document">
      {/* if the visitor is at the main page, then redirect */}
      <div className="redirection" style={{ textAlign: 'center' }}></div>
      {/* redirection ends here */}
      {/* <h1 className="documentFirstHeading">{content.title}</h1> */}
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.image && (
        <Image
          className="document-image"
          src={content.image.scales.thumb.download}
          floated="right"
        />
      )}
      {content.remoteUrl && (
        <span>
          The link address is:
          <a href={content.remoteUrl}>{content.remoteUrl}</a>
        </span>
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.text.data,
          }}
        />
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EventView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(EventView);
