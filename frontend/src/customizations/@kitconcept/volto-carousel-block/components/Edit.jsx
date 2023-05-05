import React from 'react';
import { v4 as uuid } from 'uuid';
import { map } from 'lodash';
import View from './View';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';

const CarouselEdit = (props) => {
  const { onChangeBlock, block, selected } = props;
  const data = {
    columns: map([1, 2, 3, 4], () => ({ '@id': uuid() })),
    ...props.data,
  };
  if (!props.data.columns) {
    onChangeBlock(block, data);
  }

  return (
    <>
      <View {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <Sidebar
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default CarouselEdit;
