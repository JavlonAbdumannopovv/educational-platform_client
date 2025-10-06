import {
  Card,
  CardBody,
  Divider,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Account from "./account";
import DangerZone from "./danger-zone";
import MyCourses from "./my-courses";
import Settings from "./settings";
import { UserService } from "src/services/user.service";
<Divider />;

const UserDashboardPageComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const getAllCourses = async () => {
      setIsLoading(true);
      try {
        const response = await UserService.myCourses();

        setCourses(response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getAllCourses();
  }, []);

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
            <TabList mb="1em" h={"250"} w={"200px"}>
              <Tab>Account</Tab>
              <Tab>Settings</Tab>
              <Tab>My courses</Tab>
              <Tab>Danger Zone</Tab>
            </TabList>
            <TabPanels px={5}>
              {isLoading && courses.length ? (
                <Stack mt={4} pr={4}>
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                  <Skeleton height="30px" />
                </Stack>
              ) : (
                <>
                  {tabIndex === 0 && user && <Account />}
                  {tabIndex === 1 && user && <Settings />}
                  {tabIndex === 2 && user && <MyCourses courses={courses} />}
                  {tabIndex === 3 && user && <DangerZone />}
                </>
              )}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export default UserDashboardPageComponent;
