import React from 'react';
import PropTypes from 'prop-types';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';
import { carouselSchema } from './schema';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { difference, usePrevious } from '@plone/volto/helpers';
import { replaceItemOfArray } from '@plone/volto/helpers/Utils/Utils';

const CarouselData = (props) => {
  const { block, data, onChangeBlock, schemaEnhancer } = props;
  const { columns } = props.data;
  const previous = usePrevious(columns);

  React.useEffect(() => {
    if (previous) {
      const diff = difference(columns, previous);
      const index = diff.findIndex((val) => val);
      if (diff[index]?.href?.[0]) {
        onChangeBlock(block, {
          ...data,
          columns: replaceItemOfArray(data.columns, index, {
            ...data.columns[index],
            title: diff[index].href[0].title,
            description: diff[index].href[0].Description,
          }),
        });
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [columns]);

  const intl = useIntl();
  const schema = schemaEnhancer
    ? schemaEnhancer(carouselSchema({ ...props, intl }), props)
    : carouselSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        props.onChangeBlock(props.block, {
          ...props.data,
          [id]: value,
        });
      }}
      formData={props.data || { '@type': 'carousel', columns: [{}] }}
      block={props.block}
    />
  );
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default withObjectBrowser(CarouselData);
