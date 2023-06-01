import FarmStats from "main/components/Commons/FarmStats";
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

export default {
  title: 'components/commons/FarmStats',
  component: FarmStats,
  argTypes: {
    'userCommons.cowHealth': {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
  },
};

const Template = (props) => <FarmStats {...props} />;

export const Default = Template.bind({});

Default.args = {
  userCommons: userCommonsFixtures.oneUserCommons[0],
};
