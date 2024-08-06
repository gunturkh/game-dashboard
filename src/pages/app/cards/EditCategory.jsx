import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, toggleEditCategoryModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import {
  useCreateCardCategoriesMutation,
  usePutCardCategoriesMutation,
} from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import Switch from "@/components/ui/Switch";

const EditCategory = () => {
  const { editCategoryModal, editCategoryItem } = useSelector(
    (state) => state.card
  );
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();

  const [putCardCategories] = usePutCardCategoriesMutation();
  const [upload, { isLoading }] = useUploadMutation();

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Category name is required"),
      is_active: yup.boolean().required("Is Active is required"),
      icon_url: yup.string(),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
    defaultValues: editCategoryItem,
  });
  useEffect(() => {
    if (editCategoryItem) {
      setValue("name", editCategoryItem.name);
      setValue("is_active", editCategoryItem.is_active);
    }
  }, [editCategoryItem]);

  console.log("errors", errors);
  console.log("editCategoryItem", editCategoryItem);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { name, is_active } = data;
      const card = {
        id: editCategoryItem.id,
        name,
        icon_url: editCategoryItem.icon_url,
        is_active: is_active,
      };

      console.log("edit card", card);
      const response = await putCardCategories(card);
      console.log("response edit card", response.data);
      toast.success("Edit Category Successful");
      dispatch(toggleEditCategoryModal(false));
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handleFileUpload = async (event) => {
  //   console.log("file event", event.target.files[0]);
  //   setStatus("uploading");
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", event.target.files[0]);
  //     const response = await upload(formData);
  //     console.log("image upload success", response.data);

  //     if (!response.data.status) {
  //       throw new Error("Failed to upload image");
  //     }

  //     setValue("icon_url", response.data.data, { shouldValidate: true });
  //     setStatus("success");
  //   } catch (error) {
  //     console.error(error);
  //     setStatus("fail");
  //   }
  // };

  console.log("edit value", getValues());

  return (
    <div>
      <Modal
        title="Edit Card Category"
        labelclassName="btn-outline-dark"
        activeModal={editCategoryModal}
        onClose={() => dispatch(toggleEditCategoryModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Category Name"
            placeholder="Category Name"
            register={register}
            error={errors.name}
          />
          <Controller
            name="is_active"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                label={"Enable Category?"}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {/* <input type="file" onChange={handleFileUpload} /> */}
          {/* <Result status={status} /> */}
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

export default EditCategory;
