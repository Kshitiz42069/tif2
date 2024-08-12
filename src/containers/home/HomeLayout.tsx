import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  // requisition
  const [requisitionTitle, setRequisitionTitle] = useState<string>("");
  const [requisitionNumber, setRequisitionNumber] = useState<number>(0);
  const [requisitionGender, setRequisitionGender] = useState<string>("");
  const [requisitionUrgency, setRequisitionUrgency] = useState<string>("");
  
  // job details
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDetails, setJobDetails] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  
  
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={tabIndex} onChange={handleTabsChange} isLazy>
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  requisitionTitle={requisitionTitle}
                  requisitionUrgency={requisitionUrgency}
                  requisitionGender={requisitionGender}
                  requisitionNumber={requisitionNumber ?? 0}
                  handleOnChangeTitle={setRequisitionTitle}
                  handleOnChangeGender={setRequisitionGender}
                  handleOnChangeUrgency={setRequisitionUrgency}
                  handleOnChangeNumber={setRequisitionNumber}
                  handleTabChange={setTabIndex}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm 
                  jobTitle={jobTitle}
                  jobDetails={jobDetails}
                  jobLocation={jobLocation}
                  handleOnChangeJobTitle={setJobTitle}
                  handleOnChangeJobDetails={setJobDetails}
                  handleOnChangeJobLocation={setJobLocation}
                  handleTabChange={setTabIndex}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm />
              </TabPanel>
            </TabPanels>
            <DisplayCard
              requisitionTitle={requisitionTitle}
              requisitionUrgency={requisitionUrgency}
              requisitionGender={requisitionGender}
              requisitionNumber={requisitionNumber}
              jobTitle={jobTitle}
              jobDetails={jobDetails}
              jobLocation={jobLocation}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
