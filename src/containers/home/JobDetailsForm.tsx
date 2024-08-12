import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC<{
  handleOnChangeJobTitle: (a: string) => void;
  handleOnChangeJobDetails: (a: string) => void;
  handleOnChangeJobLocation: (a: string) => void;
  handleTabChange: (a: number) => void;
  jobTitle:string;
  jobDetails:string;
  jobLocation:string;

}> = (props) => {
  const {
    handleOnChangeJobDetails,
    handleOnChangeJobLocation,
    handleOnChangeJobTitle,
    handleTabChange,
    jobDetails,
    jobLocation,
    jobTitle
  } = props;
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        console.log({ values });
        // Go to next step
        handleTabChange(2);
      },
    });
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
      handleOnChangeJobTitle(e.target.value as string);
      handleChange(e);
    };
    const onChangeDetails = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
      handleOnChangeJobDetails(e.target.value as string);
      handleChange(e);
    };
    const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
      handleOnChangeJobLocation(e.target.value as string);
      handleChange(e);
    };
    const onPrevious=()=>{
      handleTabChange(0);
    }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={onChangeTitle}
          onBlur={handleBlur}
          value={jobTitle || values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={onChangeDetails}
          onBlur={handleBlur}
          value={jobDetails||values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={onChangeLocation}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={jobLocation||values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={onPrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
