import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import { useCreateCardCategoriesMutation } from "../cards/cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { toggleAddCardModal } from "./store";
import Icons from "@/components/ui/Icon";
import { useCreateLevelMutation, useGetLevelsQuery } from "./levelApiSlice";
import LoaderCircle from "@/components/Loader-circle";

const AddLevel = () => {
  const { openCardModal } = useSelector((state) => state.level);
  const { data: getLevels, isFetching } = useGetLevelsQuery({
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const dispatch = useDispatch();

  const [createLevel] = useCreateLevelMutation();

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
    defaultValues: getLevels,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("errors", errors);

  useEffect(() => {
    console.log("getLevels addLevel", getLevels);
    if (getLevels) setValue("levels", getLevels);
  }, [getLevels]);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "levels",
  });
  useEffect(() => {
    console.log("fields", fields);
  }, [fields]);

  const onSubmit = async (data) => {
    try {
      const response = await createLevel(data);
      console.log("response create level", response.data);
      toast.success("Add Level Successful");
      dispatch(toggleAddCardModal(false));
      reset();
    } catch (error) {
      toast.error(error.message);
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
                  name={`levels.${index}.profit_per_hour`}
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
            <button
              className="flex w-full justify-center bg-slate-600 font-semibold text-white my-4 py-2 rounded-md"
              type="button"
              onClick={() =>
                append({
                  level: fields.length + 1,
                  minimum_score: fields[fields.length - 1].minimum_score + 5,
                })
              }
            >
              Add New Level
            </button>
            <div className="ltr:text-right rtl:text-left">
              <Button
                type="submit"
                text="Submit Level"
                className="btn btn-dark block w-full text-center "
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AddLevel;
