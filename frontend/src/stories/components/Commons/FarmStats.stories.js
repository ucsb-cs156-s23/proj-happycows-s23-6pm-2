import FarmStats from "main/components/Commons/FarmStats";
import userCommonsFixtures from "fixtures/userCommonsFixtures";

export default {
  title: "components/commons/FarmStats",
  component: FarmStats,
  argTypes: {
    cowHealth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
      },
    },
  },
};

const Template = (args) => {
  return (
    <FarmStats
      userCommons={{
        ...args.userCommons,
        cowHealth: args.cowHealth,
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  userCommons: userCommonsFixtures.oneUserCommons[0],
};
