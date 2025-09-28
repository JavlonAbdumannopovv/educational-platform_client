import {
  Card,
  CardBody,
  Divider,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Account from "./account";
import DangerZone from "./danger-zone";
import MyCourses from "./my-courses";
import Settings from "./settings";
<Divider />;

const UserDashboardPageComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useTypedSelector((state) => state.user);

  const tabHandler = async (idx: number) => {
    setTabIndex(idx);
  };
  return (
    <>
      <Card>
        <CardBody>
          <Tabs
            defaultValue={tabIndex}
            isFitted
            variant="enclosed-colored"
            colorScheme={"facebook"}
            orientation={"vertical"}
            onChange={tabHandler}
          >
            <TabList px={5} w={"200px"}>
              <Tab>Account</Tab>
              <Tab>Settings</Tab>
              <Tab>My courses</Tab>
              <Tab>Danger Zone</Tab>
            </TabList>
            <TabPanels px={5}>
              {tabIndex === 0 && user && <Account />}
              {tabIndex === 1 && <Settings />}
              {tabIndex === 2 && <MyCourses />}
              {tabIndex === 3 && <DangerZone />}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export default UserDashboardPageComponent;
