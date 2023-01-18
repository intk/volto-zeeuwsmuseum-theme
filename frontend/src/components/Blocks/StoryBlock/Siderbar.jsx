import React from 'react';
import { BlockDataForm, SidebarPortal } from '@plone/volto/components';
import BlockSchema from './BlockSchema';

const Sidebar = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  const schema = BlockSchema();

  return (
    <SidebarPortal selected={selected}>
      <BlockDataForm
        schema={schema}
        title={schema.title}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
          });
        }}
        formData={data}
        fieldIndex={data.index}
        block={block}
      />
    </SidebarPortal>
  );
};

export default Sidebar;
