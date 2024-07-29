import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import { useCreateCardCategoriesMutation } from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";

const AddCategory = () => {
  const { openCategoryModal } = useSelector((state) => state.card);
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");

  const [createCardCategories] = useCreateCardCategoriesMutation();
  const [upload, { isLoading }] = useUploadMutation();

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Category name is required"),
      icon_url: yup.string().required("Category image is required"),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { name, icon_url } = data;
      const card = {
        name,
        icon_url,
      };

      const response = await createCardCategories(card);
      console.log("response create card", response.data);
      toast.success("Add Category Successful");
      dispatch(toggleAddModal(false));
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileUpload = async (event) => {
    console.log("file event", event.target.files[0]);
    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const response = await upload(formData);
      console.log("image upload success", response.data);

      if (!response.data.status) {
        throw new Error("Failed to upload image");
      }

      setValue("icon_url", response.data.data, { shouldValidate: true });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("fail");
    }
  };

  return (
    <div>
      <Modal
        title="Create Card Category"
        labelclassName="btn-outline-dark"
        activeModal={openCategoryModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Category Name"
            placeholder="Category Name"
            register={register}
            error={errors.name}
          />
          <input type="file" onChange={handleFileUpload} />
          <Result status={status} />
          {errors?.icon_url && (
            <div className={` mt-2 text-danger-500 block text-sm `}>
              {errors?.icon_url?.message}
            </div>
          )}
          <div className="ltr:text-right rtl:text-left">
            <Button
              type="submit"
              text="Add Category"
              className="btn btn-dark block w-full text-center "
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCategory;
