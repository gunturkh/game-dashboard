import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCardModal, toggleEditCardModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import {
  useCreateCardMutation,
  useGetCardByIdQuery,
  usePutCardMutation,
} from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import Icons from "@/components/ui/Icon";
import { useEffect } from "react";
import LoaderCircle from "@/components/Loader-circle";

const EditCard = () => {
  const { id } = useParams();
  console.log("category id inside addCard", id);
  const { editCardModal, editCardItem } = useSelector((state) => state.card);
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");

  const [putCard] = usePutCardMutation();
  const [upload, { isLoading }] = useUploadMutation();
  const { data: getCardById, isFetching } = useGetCardByIdQuery(
    editCardItem.id,
    {
      skipPollingIfUnfocused: true,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

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
    getValues,
    setValue,
  } = useForm({
    defaultValues: getCardById,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("editCardItem", editCardItem);
  console.log("getCardById edit card", getCardById);

  useEffect(() => {
    if (getCardById) {
      setValue("name", getCardById.name);
      setValue("levels", getCardById.levels);
      setValue("icon_url", getCardById.icon_url);
      setValue("is_active", getCardById.is_active);
      setValue("requirements", getCardById.requirements);
      setStatus("uploaded");
    }
  }, [getCardById]);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "levels",
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { name, icon_url, levels } = data;
      const card = {
        id: getCardById.id,
        name,
        icon_url,
        category_id: parseInt(id),
        levels: levels.map((l) => ({
          profit_per_hour: parseInt(l.profit_per_hour),
          upgrade_price: parseInt(l.upgrade_price),
        })),
      };

      const response = await putCard(card);
      console.log("response create card", response);
      console.log("edit card", card);
      if (response?.data) {
        dispatch(toggleEditCardModal(false));
        toast.success("Add Card Successful");
        setStatus("initial");
      } else if (response?.error?.data) {
        throw new Error(response.error.data.message);
      }
      reset();
    } catch (error) {
      dispatch(toggleEditCardModal(false));
      toast.error(error.message);
      setStatus("initial");
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
        title="Edit Card"
        labelclassName="btn-outline-dark"
        activeModal={editCardModal}
        onClose={() => {
          console.log("modal closed");
          dispatch(toggleEditCardModal(false));
        }}
      >
        {isFetching ? (
          <LoaderCircle />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
              name="name"
              label="Card Name"
              placeholder="Card Name"
              register={register}
              error={errors.name}
            />
            <label
              htmlFor={"card-icon"}
              className={`block capitalize flex-0 mr-6 md:w-[100px] w-[60px] break-words `}
            >
              Image
            </label>
            {status === "uploaded" && getValues().icon_url ? (
              <div className="relative w-28 border border-neutral-200 rounded-md p-4">
                <img
                  src={getValues()?.icon_url}
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
            <div className="w-full">
              {errors?.icon_url && (
                <div className={` mt-2 text-danger-500 block text-sm `}>
                  {errors?.icon_url?.message}
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
                    Level {index}
                  </label>
                  <Textinput
                    name={`levels.${index}.upgrade_price`}
                    label="Upgraded Price"
                    placeholder="Upgraded Price"
                    register={register}
                    defaultValue={field.upgrade_price}
                  />
                  <Textinput
                    name={`levels.${index}.profit_per_hour`}
                    label="Profit per Hour"
                    placeholder="Profit per Hour"
                    register={register}
                    defaultValue={field.profit_per_hour}
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
                  append({ upgraded_price: 0, profit_per_hour: 0 })
                }
              >
                Add New Level
              </button>
            </div>
            <div className="ltr:text-right rtl:text-left">
              <Button
                type="submit"
                text="Edit Card"
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

export default EditCard;
