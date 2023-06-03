import FarmStats from "main/components/Commons/FarmStats";
import userCommonsFixtures from "fixtures/userCommonsFixtures";

export default {
  title: "components/commons/FarmStats",
  component: FarmStats,
};

const Template = (args) => <FarmStats userCommons={args.userCommons} />;

export const Default = Template.bind({});

Default.args = {
  userCommons: userCommonsFixtures.oneUserCommons[0],
};
