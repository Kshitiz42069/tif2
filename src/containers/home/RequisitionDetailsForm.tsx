import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{
  handleOnChangeTitle: (a: string) => void;
  handleOnChangeGender: (a: string) => void;
  handleOnChangeUrgency: (a: string) => void;
  handleOnChangeNumber: (a: number) => void;
  handleTabChange: (a: number) => void;
  requisitionTitle: string;
  requisitionGender: string;
  requisitionUrgency: string;
  requisitionNumber: number | undefined;
}> = (props) => {
  const {
    handleOnChangeTitle,
    handleTabChange,
    handleOnChangeGender,
    handleOnChangeUrgency,
    handleOnChangeNumber,
    requisitionTitle,
    requisitionGender,
    requisitionUrgency,
    requisitionNumber,
  } = props;

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      handleTabChange(1);
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    handleOnChangeTitle(e.target.value as string);
    console.log(typeof handleOnChangeTitle);
    handleChange(e);
  };
  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    // handleOnChangeGender(e.target.value as string);
    // handleOnChangeUrgency(e.target.value as string);
    const numberValue = parseInt(e.target.value, 10); // Convert to integer
    handleOnChangeNumber(isNaN(numberValue) ? 0 : numberValue);
    console.log(typeof handleOnChangeTitle);
    handleChange(e);
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={requisitionTitle || values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={onChangeNumber}
          onBlur={handleBlur}
          value={requisitionNumber ||values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          // onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={requisitionUrgency ||values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
