import {
  Box,
  Card,
  CardBody,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useTypedSelector } from "src/hooks/useTypedSelector";

<Divider />;
const DashboardPageComponent = () => {
  const { lesson } = useTypedSelector((state) => state.lesson);

  return (
    <Box>
      <Header />
      <Sidebar
        display={{ base: "none", lg: "block" }}
        position={"fixed"}
        top={"12vh"}
        right={"2vh"}
        bottom={"2vh"}
        w={"400px"}
      />

      <Box
        mt={"12vh"}
        marginRight={{ base: 2, lg: "450px" }}
        marginLeft={{ base: 2, lg: 5 }}
      >
        <Container maxW={"container.lg"}>
          <Stack gap={5}>
            <Text fontSize={25} fontWeight={"bold"}>
              {lesson.name}
            </Text>
            <Card>
              <CardBody>
                <Box
                  dangerouslySetInnerHTML={{ __html: lesson.embedVideo }}
                  sx={{
                    iframe: {
                      width: "100%",
                    },
                  }}
                ></Box>
              </CardBody>
            </Card>
            <Divider />
            <Box
              css={{
                a: { color: "teal", textDecoration: "underline" },
                li: { listStyle: "none" },
              }}
              dangerouslySetInnerHTML={{ __html: lesson.material }}
            ></Box>
          </Stack>

          <Sidebar
            display={{ base: "block", lg: "none" }}
            pos={"relative"}
            width={"100%"}
            mb={10}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPageComponent;
