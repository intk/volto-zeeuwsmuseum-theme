import React from 'react';
import { BlockDataForm, SidebarPortal } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { Message, Header } from 'semantic-ui-react';
import TableOfContentView from './TableOfContentView';
import TableOfContentEditSchema from './schema';

const messages = defineMessages({
  tableofcontents: {
    id: 'SHOW TABLE OF CONTENTS',
    defaultMessage: 'SHOW TABLE OF CONTENTS',
  },
});

const TableOfContentEdit = (props) => {
  const intl = useIntl();
  const { block, onChangeBlock, data = {}, selected } = props;
  const schema = TableOfContentEditSchema(props);

  return (
    <>
      <TableOfContentView
        {...props}
        path={getBaseUrl(props.pathname)}
        mode="edit"
      />
      <Message icon info>
        <Message.Content>
          <Header as="h6">
            {/* <Icon name={menuicon} size="15px" /> */}
            {intl.formatMessage(messages.tableofcontents)}
          </Header>
        </Message.Content>
      </Message>

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
export default TableOfContentEdit;
