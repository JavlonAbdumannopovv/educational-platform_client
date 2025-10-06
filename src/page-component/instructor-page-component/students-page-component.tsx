import {
  Box,
  Button,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { AiOutlineFieldNumber, AiOutlineReload } from "react-icons/ai";
import { courseusers } from "src/config/constants";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { StudentType } from "src/interfaces/instructor.interface";
import { ChartData } from "src/components";

const StudentsPageComponent = () => {
  const [searchVal, setSearchVal] = useState("");
  const [allStudents, setAllStudents] = useState<StudentType[]>([]);
  const { students } = useTypedSelector((state) => state.instructor);

  const { t } = useTranslation();

  const onSearchStudent = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setAllStudents(
      students.filter(
        (c) =>
          c.email.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  useEffect(() => {
    setAllStudents(students);
  }, []);

  return (
    <>
      <ChartData
        title={t("students_title", { ns: "instructor" })}
        subtitle={t("students_description", { ns: "instructor" })}
        dataArr={courseusers}
      />

      <Box mt={10}>
        <Heading>{t("all_users", { ns: "instructor" })}</Heading>
        <Box pos={"relative"} mt={5}>
          <Input
            h={14}
            w={"full"}
            bg={"white"}
            color={"gray.900"}
            placeholder={t("search_input_placeholder", { ns: "courses" }) || ""}
            _placeholder={{ color: "gray.500" }}
            value={searchVal}
            onChange={(e) => onSearchStudent(e)}
          />
        </Box>
        <TableContainer mt={10}>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>
              <Button
                colorScheme={"facebook"}
                variant={"outline"}
                rightIcon={<AiOutlineReload />}
              >
                {t("more", { ns: "instructor" })}...
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>
                  <AiOutlineFieldNumber fontSize={20} />
                </Th>
                <Th>{t("email", { ns: "instructor" })}</Th>
                <Th>{t("courses", { ns: "instructor" })}</Th>
                <Th>{t("enrolled_date", { ns: "instructor" })}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allStudents.map((user, idx) => (
                <Tr key={user.email}>
                  <Td>{idx + 1}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.coursesCount}</Td>
                  <Td> {format(new Date(user.createdAt), "dd MMMM, yyyy")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StudentsPageComponent;
