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

const AddTask = () => {
  const { openCardModal } = useSelector((state) => state.level);
  const { data: getTasks, isFetching } = useGetTasksQuery({
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const dispatch = useDispatch();

  const [status, setStatus] = useState("initial");
  const [createTasks] = useCreateTasksMutation();

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
  } = useForm({
    defaultValues: getTasks,
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

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const {
        name,
        image,
        type,
        reward_coins,
        periodicity,
        is_published,
        config,
      } = data;
      const response = await createTasks({
        name,
        image,
        type,
        reward_coins,
        periodicity,
        is_published,
        config,
      });
      console.log("response create task", response.data);
      toast.success("Add Task Successful");
      dispatch(toggleAddCardModal(false));
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
        title="Add New Level"
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
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-4 border rounded-sm px-2 py-4"
              >
                <label
                  htmlFor={`Level-${index}`}
                  className={`mt-8 block capitalize flex-0 mr-6 md:w-[100px] w-[60px] break-words font-semibold text-slate-800 `}
                >
                  Level {field?.level}
                </label>
                <Textinput
                  name={`levels.${index}.minimum_score`}
                  label="Minimum Score"
                  placeholder="Minimum Score"
                  register={register}
                  defaultValue={field.minimum_score}
                />
                <button
                  className="mt-6 border rounded-lg p-2 border-red-600"
                  type="button"
                  onClick={() => swap(index, index + 1)}
                >
                  <Icons
                    className="text-red-600"
                    icon={"heroicons-outline:arrow-down"}
                  />
                </button>
                <button
                  className="mt-6 border rounded-lg p-2 border-green-600"
                  type="button"
                  onClick={() => swap(index, index - 1)}
                >
                  <Icons
                    className="text-green-600"
                    icon={"heroicons-outline:arrow-up"}
                  />
                </button>
                <button
                  className="mt-6"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Icons
                    className="text-red-600"
                    icon={"heroicons-outline:trash"}
                  />
                </button>
              </div>
            ))}
            <div className="ltr:text-right rtl:text-left">
              <Button
                type="submit"
                text="Submit Task"
                className="btn btn-dark block w-full text-center "
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AddTask;
