import React from 'react';
import { BlockDataForm, SidebarPortal } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';
import SiteDataSchema from './schema';
import SiteDataView from './SiteDataView';

const SiteDataEdit = (props) => {
  const { block, onChangeBlock, data = {}, selected } = props;
  const schema = SiteDataSchema(props);

  return (
    <>
      <SiteDataView {...props} path={getBaseUrl(props.pathname)} mode="edit" />

      <SidebarPortal selected={selected}>
        <BlockDataForm
          key={Object.keys(data?.cards || {}).length}
          schema={schema}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};
export default SiteDataEdit;
