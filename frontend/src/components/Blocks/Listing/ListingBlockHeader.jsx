import { useSelector } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';

const ListingBlockHeader = ({ data }) => {
  const { title, headline, headlineTag, block, linkHref, linkTitle } = data;
  const head = title || headline;
  const CustomTag = `${headlineTag || 'h2'}`;

  const total = useSelector(
    (state) => state.querystringsearch.subrequests?.[block]?.total,
  );

  return head ? (
    <div className="listing-header">
      {headline && (
        <CustomTag id={block}>
          {headline}
          {data.showCount && total ? ` (${total})` : ''}
        </CustomTag>
      )}

      {linkHref && (
        <UniversalLink href={linkHref?.[0]['@id']}>
          {linkTitle || '...'}
        </UniversalLink>
      )}
    </div>
  ) : (
    ''
  );
};

export default ListingBlockHeader;
