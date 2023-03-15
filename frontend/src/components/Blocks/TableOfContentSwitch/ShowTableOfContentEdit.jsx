import React from 'react';
import { BlockDataForm, SidebarPortal, Icon } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { Message, Header } from 'semantic-ui-react';
import ShowTableOfContentView from './ShowTableOfContentView';
import ShowTableOfContentEditSchema from './schema';

import menuicon from '@plone/volto/icons/menu-alt.svg';

const messages = defineMessages({
  showtableofcontents: {
    id: 'SHOW TABLE OF CONTENTS',
    defaultMessage: 'SHOW TABLE OF CONTENTS',
  },
});

const ShowTableOfContentEdit = (props) => {
  const intl = useIntl();
  const { block, onChangeBlock, data = {}, selected } = props;
  const schema = ShowTableOfContentEditSchema(props);

  return (
    <>
      <ShowTableOfContentView
        {...props}
        path={getBaseUrl(props.pathname)}
        mode="edit"
      />
      <Message icon info>
        <Message.Content>
          <Header as="h6">
            <Icon name={menuicon} size="15" />
            {intl.formatMessage(messages.showtableofcontents)}: {data.TOC}
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
export default ShowTableOfContentEdit;
