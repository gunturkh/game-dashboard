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
import { toggleAddCardModal } from "./store";
import Icons from "@/components/ui/Icon";
import { useCreateTasksMutation, useGetTasksQuery } from "./taskApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import Switch from "@/components/ui/Switch";
import Select from "@/components/ui/Select";

const AddTask = () => {
  const { openCardModal } = useSelector((state) => state.task);
  const { data: getTasks, isFetching } = useGetTasksQuery({
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const dispatch = useDispatch();

  const [status, setStatus] = useState("initial");
  const [createTasks] = useCreateTasksMutation();
  const [upload, { isLoading }] = useUploadMutation();

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
    defaultValues: {
      id: "",
      name: "",
      reward_coins: 0,
      type: "with_link",
      config: {
        modal_title: "",
        modal_description: "",
        modal_link_button: "",
        modal_link_url: "",
        check_in_data: [{ day: 0, reward_coins: 0 }],
        // link: "",
      },
      // periodicity: "Once",
      image: "",
      is_published: false,
      requires_admin_approval: false,
    },
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("errors", errors);

  useEffect(() => {
    console.log("getTasks addLevel", getTasks);
    if (getTasks) setValue("levels", getTasks);
  }, [getTasks]);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "levels",
  });
  useEffect(() => {
    console.log("fields", fields);
  }, [fields]);
  console.log("watch(type)", watch("type"));

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
        config,
      } = data;
      const response = await createTasks({
        name,
        image,
        type,
        reward_coins: parseInt(reward_coins),
        // periodicity,
        is_published,
        config,
      });
      console.log("response create task", response.data);
      if (response.data) {
        toast.success("Add Task Successful");
        dispatch(toggleAddCardModal(false));
        reset();
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

  return (
    <div>
      <Modal
        title="Add New Task"
        labelclassName="btn-outline-dark"
        activeModal={openCardModal}
        onClose={() => dispatch(toggleAddCardModal(false))}
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
            <Select
              name={"type"}
              label={"Type"}
              register={register}
              placeholder="Task type"
              defaultValue={"with_link"}
              options={[
                { value: "with_link", label: "With Link" },
                { value: "daily_check_in", label: "Daily Check In" },
                // { value: "watch_video", label: "Watch Video" },
              ]}
            />
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
            <input type="file" onChange={handleFileUpload} />
            <Result status={status} />
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

export default AddTask;
