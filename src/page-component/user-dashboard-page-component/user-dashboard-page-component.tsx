import {
  Card,
  CardBody,
  Divider,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Account from "./account";
import Settings from "./settings";
import MyCourses from "./my-courses";
import DangerZone from "./danger-zone";

<Divider />;

const UserDashboardPageComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);

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
            <TabList px={5}>
              <Tab>Account</Tab>
              <Tab>Settings</Tab>
              <Tab>My courses</Tab>
              <Tab>Danger Zone</Tab>
            </TabList>
            <TabPanels px={5}>
              {tabIndex === 0 && <Account />}
              {tabIndex === 1 && <Settings />}
              {tabIndex === 3 && <MyCourses />}
              {tabIndex === 5 && <DangerZone />}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export default UserDashboardPageComponent;
