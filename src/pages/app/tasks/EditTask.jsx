import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import { useCreateCardCategoriesMutation } from "../cards/cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { toggleEditCardModal } from "./store";
import Icons from "@/components/ui/Icon";
import {
  useCreateTasksMutation,
  useGetTaskByIdQuery,
  useGetTasksQuery,
  usePutTaskMutation,
} from "./taskApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import Switch from "@/components/ui/Switch";
import Select from "@/components/ui/Select";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { editCardModal, editCardItem } = useSelector((state) => state.task);
  const { data: getTaskById, isFetching } = useGetTaskByIdQuery(
    editCardItem?.id,
    {
      skipPollingIfUnfocused: true,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const dispatch = useDispatch();

  const [status, setStatus] = useState("initial");
  const [putTask] = usePutTaskMutation();
  const [upload, { isLoading }] = useUploadMutation();
  console.log("getTaskById by id", getTaskById);
  console.log("editCardItem", editCardItem);
  const FormValidationSchema = yup
    .object({
      // level: yup.array().required("Levels is required"),
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
    watch,
  } = useForm({
    defaultValues: getTaskById,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const {
        name,
        image,
        type,
        reward_coins,
        // periodicity,
        is_published,
        requires_admin_approval,
        config,
      } = data;
      const response = await putTask({
        id: editCardItem?.id,
        name,
        image,
        type,
        reward_coins: parseInt(reward_coins),
        is_published,
        requires_admin_approval,
        config,
      });
      console.log("response create task", response.data);
      if (response.data) {
        toast.success("Edit Task Successful");
        dispatch(toggleEditCardModal(false));
        reset();
      } else {
        toast.error(response.message);
      }
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

      setValue("image", response.data.data, { shouldValidate: true });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("fail");
    }
  };

  useEffect(() => {
    if (getTaskById) {
      setValue("name", getTaskById.name);
      setValue("image", getTaskById.image);
      // setValue("type", getTaskById.type);
      setValue("reward_coins", getTaskById.reward_coins);
      setValue("is_published", getTaskById.is_published);
      setValue("requires_admin_approval", getTaskById.requires_admin_approval);
      setStatus("uploaded");
      if (getTaskById?.config) {
        setValue("config.modal_title", getTaskById.config.modal_title);
        setValue(
          "config.modal_description",
          getTaskById.config.modal_description
        );
        setValue(
          "config.modal_link_button",
          getTaskById.config.modal_link_button
        );
        setValue("config.modal_link_url", getTaskById.config.modal_link_url);
      }
    }
  }, [getTaskById]);

  console.log("editCardModal", editCardModal);
  return (
    <div>
      <Modal
        title="Edit Task"
        labelclassName="btn-outline-dark"
        activeModal={editCardModal}
        onClose={() => dispatch(toggleEditCardModal(false))}
      >
        {isFetching ? (
          <LoaderCircle />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
              name="name"
              label="Task Name"
              placeholder="Task Name"
              register={register}
              error={errors.name}
            />
            <Textinput
              name="config.modal_title"
              label="Modal Title"
              placeholder="Modal Title"
              register={register}
              error={errors?.config?.modal_title}
            />
            <Textinput
              name="config.modal_description"
              label="Modal Description"
              placeholder="Modal Description"
              register={register}
              error={errors?.config?.modal_description}
            />
            <Controller
              name="is_published"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  label={`${value ? "Unpublish" : "Publish"}`}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <label className={`block capitalize `}>
              Requires admin approval when Task is completed?
            </label>
            <Controller
              name="requires_admin_approval"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  label={`${value ? "Yes" : "No"}`}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Textinput
              name="reward_coins"
              label="Reward"
              placeholder="Reward"
              register={register}
              error={errors.reward_coins}
              type={"number"}
            />
            {/* <Select
              name={"type"}
              label={"Type"}
              register={register}
              placeholder="Level Condition to buy card"
              defaultValue={1}
              options={[
                { value: "follow_social_media", label: "Follow Social Media" },
                { value: "watch_video", label: "Watch Video" },
              ]}
            /> */}
            {watch("type") === "with_link" && (
              <>
                <Textinput
                  name="config.modal_link_button"
                  label="Modal Link Button Title"
                  placeholder="Modal Link Button Title"
                  register={register}
                  error={errors?.config?.modal_link_button}
                />
                <Textinput
                  name="config.modal_link_url"
                  label="Link"
                  placeholder="Link"
                  register={register}
                  error={errors?.config?.modal_link_url}
                />
              </>
            )}
            {/* <Select
              name={"periodicity"}
              label={"Periodicity"}
              register={register}
              placeholder="Periodicity"
              defaultValue={1}
              options={[{ value: "Once", label: "Once" }]}
            /> */}
            <label
              htmlFor={"card-icon"}
              className={`block capitalize flex-0 mr-6 md:w-[100px] w-[60px] break-words `}
            >
              Image
            </label>
            {status === "uploaded" && getValues().image ? (
              <div className="relative w-28 border border-neutral-200 rounded-md p-4">
                <img
                  src={getValues()?.image}
                  alt={getValues()?.name}
                  className="object-cover w-16 h-16 rounded-full"
                />
                <button
                  className="absolute top-1 right-1"
                  type="button"
                  onClick={() => setStatus("initial")}
                >
                  <Icons
                    className="text-red-600"
                    icon={"heroicons-outline:trash"}
                  />
                </button>
              </div>
            ) : (
              <>
                <input type="file" onChange={handleFileUpload} />
                <Result status={status} />
              </>
            )}
            {errors?.image && (
              <div className={` mt-2 text-danger-500 block text-sm `}>
                {errors?.image?.message}
              </div>
            )}
            <div className="ltr:text-right rtl:text-left">
              <Button
                type="submit"
                text="Submit Task"
                className="btn btn-dark block w-full text-center "
                isLoading={isLoading}
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default EditTask;
