import React from 'react';

import CommonsCardBox from "main/components/Commons/CommonsCardBox";
import userCommonsFixtures from 'fixtures/userCommonsFixtures';

export default {
    title: 'pages/CommonsCardBox',
    component: CommonsCardBox
};

const Template = (props) => <CommonsCardBox {...props} />;

export const Default = Template.bind({});

Default.args = {
    commons: userCommonsFixtures.oneUserCommon[0].commons,
}
