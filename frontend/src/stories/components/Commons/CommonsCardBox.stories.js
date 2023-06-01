import React from 'react';

import { CommonsCardBoxWithData } from "main/components/Commons/CommonsCardBox";
import userCommonsFixtures from 'fixtures/userCommonsFixtures';

export default {
  title: 'components/commons/CommonsCardBox',
  component: CommonsCardBoxWithData
};

const Template = (props) => <CommonsCardBoxWithData {...props} />;

export const Default = Template.bind({});

Default.args = {
  commons: userCommonsFixtures.oneUserCommons[0].commons,
  userCommons: userCommonsFixtures.oneUserCommons[0],
}

export const decorators = [
  (Story) => (
    <div style={{ textAlign: 'center' }}>
      <Story />
    </div>
  ),
];
