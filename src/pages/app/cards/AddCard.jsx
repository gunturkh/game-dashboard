import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCardModal, toggleAddModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import {
  useCreateCardCategoriesMutation,
  useCreateCardMutation,
} from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import Icons from "@/components/ui/Icon";

const AddCard = () => {
  const { id } = useParams();
  console.log("category id inside addCard", id);
  const { openCardModal } = useSelector((state) => state.card);
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");

  const [createCard] = useCreateCardMutation();
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
    defaultValues: {
      levels: [
        {
          upgraded_price: 0,
          profit_per_hour: 0,
        },
      ],
    },
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "levels",
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { name, icon_url } = data;
      const card = {
        name,
        icon_url,
        category_id: id,
      };

      // const response = await createCard(card);
      // console.log("response create card", response.data);
      console.log("create card", card);
      toast.success("Add Card Successful");
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
        title="Create Card"
        labelclassName="btn-outline-dark"
        activeModal={openCardModal}
        onClose={() => dispatch(toggleAddCardModal(false))}
      >
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
          <input type="file" onChange={handleFileUpload} />
          <Result status={status} />
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
                  name={`levels.${index}.upgraded_price`}
                  label="Upgraded Price"
                  placeholder="Upgraded Price"
                  register={register}
                  defaultValue={field.upgraded_price}
                />
                <Textinput
                  name={`levels.${index}.profit_per_hour`}
                  label="Profit per Hour"
                  placeholder="Profit per Hour"
                  register={register}
                  defaultValue={field.profit_per_hour}
                />
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
              onClick={() => append({ upgraded_price: 0, profit_per_hour: 0 })}
            >
              Add New Level
            </button>
          </div>
          <div className="ltr:text-right rtl:text-left">
            <Button
              type="submit"
              text="Add Card"
              className="btn btn-dark block w-full text-center "
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCard;
