import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCardModal } from "./store";
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
  useGetCardsQuery,
} from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import Icons from "@/components/ui/Icon";
import Select from "@/components/ui/Select";
import { API_URL } from "@/store/api/apiSlice";

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
  const { data: getCards } = useGetCardsQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [conditionCardLevelOptions, setConditionCardLevelOptions] =
    useState(null);

  const [
    conditionCardLevelOptionsLoading,
    setConditionCardLevelOptionsLoading,
  ] = useState(false);

  const conditionOptions = (cards) => {
    if (!cards || cards?.length === 0) {
      return "-";
    }
    if (cards?.length > 0) {
      const options = getCards.map((c) => ({ value: c.id, label: c.name }));
      return [{ value: "null", label: "empty" }, ...options];
    } else return [{ value: 0, label: "null" }];
  };
  console.log("getCards", getCards);
  console.log("conditionOptions(getCards)", conditionOptions(getCards));

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
    watch,
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
  const conditionValue = watch("condition");
  console.log("conditionValue", conditionValue);
  console.log("watch level", watch("condition-level"));

  useEffect(() => {
    const getCardLevelByCardConditionId = async (id) => {
      try {
        setConditionCardLevelOptionsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(`${API_URL}/admin/cards/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        // console.log("response", result);
        if (result.status) {
          const data = result.data;
          const options = data.levels?.map((l) => ({
            value: l.level,
            label: l.level,
          }));
          setConditionCardLevelOptions(options);
          setConditionCardLevelOptionsLoading(false);
        } else setConditionCardLevelOptionsLoading(false);
      } catch (error) {
        setConditionCardLevelOptionsLoading(false);
        console.log("error.message", error.message);
      }
    };

    if (
      conditionValue !== null &&
      conditionValue !== undefined &&
      conditionValue !== "" &&
      conditionValue !== "null"
    ) {
      getCardLevelByCardConditionId(conditionValue);
    }
    if (conditionValue === null || conditionValue === "null") {
      setConditionCardLevelOptions(null);
      setValue("conditionLevel", 1);
    }
  }, [conditionValue]);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "levels",
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { name, icon_url, levels, condition, conditionLevel } = data;
      const card = {
        name,
        icon_url,
        category_id: parseInt(id),
        levels: levels.map((l) => ({
          profit_per_hour: parseInt(l.profit_per_hour),
          upgrade_price: parseInt(l.upgraded_price),
        })),
        ...(condition &&
          condition !== "null" &&
          conditionLevel && {
            condition: {
              card_id: parseInt(condition),
              level: parseInt(conditionLevel),
            },
          }),
      };
      console.log("card", card);

      const response = await createCard(card);
      console.log("response create card", response);
      console.log("create card", card);
      if (response?.data) {
        dispatch(toggleAddCardModal(false));
        toast.success("Add Card Successful");
        setStatus("initial");
      } else if (response?.error?.data) {
        throw new Error(response.error.data.message);
      }
      reset();
    } catch (error) {
      dispatch(toggleAddCardModal(false));
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

  console.log("conditionCardLevelOptions", conditionCardLevelOptions);
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
          {errors?.icon_url && (
            <div className={` mt-2 text-danger-500 block text-sm `}>
              {errors?.icon_url?.message}
            </div>
          )}
          <Select
            name={"condition"}
            label={"condition"}
            register={register}
            placeholder="Condition to buy card"
            defaultValue={null}
            options={conditionOptions(getCards)}
          />
          {conditionCardLevelOptionsLoading ? (
            <p>Loading...</p>
          ) : (
            conditionCardLevelOptions && (
              <Select
                name={"conditionLevel"}
                label={"condition level"}
                register={register}
                placeholder="Level Condition to buy card"
                defaultValue={1}
                options={conditionCardLevelOptions}
              />
            )
          )}
          <div className="w-full">
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
