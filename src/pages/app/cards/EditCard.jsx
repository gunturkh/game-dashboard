import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCardModal, toggleEditCardModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Result } from "../Result";
import {
  useCreateCardMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
  usePutCardMutation,
} from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import Icons from "@/components/ui/Icon";
import { useEffect } from "react";
import LoaderCircle from "@/components/Loader-circle";
import Select from "@/components/ui/Select";
import { API_URL } from "@/store/api/apiSlice";
import { calculateValues, formatAndRoundNumber } from "./utils";
import Switch from "@/components/ui/Switch";

const EditCard = () => {
  const { id } = useParams();
  console.log("category id inside addCard", id);
  const { editCardModal, editCardItem } = useSelector((state) => state.card);
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");
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
  const conditionOptions = (cards) => {
    if (!cards || cards?.length === 0) {
      return "-";
    }
    if (cards?.length > 0) {
      const options = getCards
        .filter((f) => f.is_published)
        .map((c) => ({ value: c.id, label: c.name }));
      return [{ value: "null", label: "empty" }, ...options];
    } else return [{ value: 0, label: "null" }];
  };

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Category name is required"),
      image: yup.string().required("Category image is required"),
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
    watch,
  } = useForm({
    defaultValues: getCardById,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  const initialConditionValue = watch("initialCondition");
  const conditionValue = watch("condition");
  console.log("conditionValue", conditionValue);
  console.log("watch level", watch("condition-level"));
  console.log("editCardItem", editCardItem);
  console.log("getCardById edit card", getCardById);

  const defaultCardLevelConditionValue = [];
  for (let index = 0; index < 25; index++) {
    defaultCardLevelConditionValue.push({
      value: index + 1,
      label: index + 1,
    });
  }

  useEffect(() => {
    if (getCardById) {
      setValue("name", getCardById.name);
      setValue("description", getCardById.description);
      setValue("levels", getCardById.levels);
      setValue("is_published", getCardById.is_published);
      setValue("available_duration", getCardById.available_duration);
      setValue("image", getCardById.image);
      setValue("is_active", getCardById.is_active);
      setValue("requirements", getCardById.requirements);
      setValue("initialCondition", getCardById.condition);
      setValue("condition", getCardById.condition);
      // setValue("conditionLevel", getCardById.condition?.level);
      setValue(
        "nominal",
        getCardById.levels[0].upgrade_price
        // getCardById.levels[0].upgrade_price *
        //   (1 / getCardById.levels[0].price_multiplier)
      );
      setValue(
        "profitperhour",
        getCardById.levels[0].profit_per_hour
        // getCardById.levels[0].profit_per_hour *
        //   (1 / getCardById.levels[0].profit_per_hour_multiplier)
      );
      setValue(
        "totalprofitperhour",
        parseFloat(getCardById.levels[24].profit_per_hour).toLocaleString(
          "id-ID",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )
      );

      setStatus("uploaded");
    }
  }, [getCardById]);

  console.log("watch(nominal)", watch("nominal"));
  console.log("watch(condition)", watch("condition"));
  // useEffect(() => {
  //   const getCardLevelByCardConditionId = async (id) => {
  //     try {
  //       setConditionCardLevelOptionsLoading(true);
  //       const token = JSON.parse(localStorage.getItem("token"));
  //       const response = await fetch(`${API_URL}/admin/cards/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const result = await response.json();
  //       // console.log("response", result);
  //       if (result.status) {
  //         const data = result.data;
  //         const options = data.levels?.map((l) => ({
  //           value: l.level,
  //           label: l.level,
  //         }));
  //         setConditionCardLevelOptions(options);
  //         setConditionCardLevelOptionsLoading(false);
  //       } else setConditionCardLevelOptionsLoading(false);
  //     } catch (error) {
  //       setConditionCardLevelOptionsLoading(false);
  //       console.log("error.message", error.message);
  //     }
  //   };

  //   if (
  //     conditionValue !== null &&
  //     conditionValue !== undefined &&
  //     conditionValue !== "" &&
  //     conditionValue !== "null"
  //   ) {
  //     getCardLevelByCardConditionId(conditionValue);
  //   }
  //   if (conditionValue === null || conditionValue === "null") {
  //     setConditionCardLevelOptions(null);
  //     setValue("conditionLevel", 1);
  //   }
  // }, [conditionValue]);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "levels",
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const {
        name,
        is_published,
        available_duration,
        description,
        image,
        levels,
        condition,
      } = data;
      const card = {
        id: getCardById.id,
        name,
        is_published,
        available_duration: parseInt(available_duration),
        description,
        image,
        category_id: parseInt(id),
        levels: levels.map((l) => ({
          ...l,
          price_multiplier: l?.price_multiplier
            ? parseFloat(l.price_multiplier)
            : 0.5,
          profit_per_hour_multiplier: l?.profit_per_hour_multiplier
            ? parseFloat(l.profit_per_hour_multiplier)
            : 0.1,
          respawn_time: l?.respawn_time ? l?.respawn_time : 0,
        })),
        ...(condition &&
          condition !== "null" &&
          condition.type === "card" && {
            condition: {
              type: condition.type,
              card_id: parseInt(condition.card_id),
              card_level: parseInt(condition.card_level),
            },
          }),
        ...(condition &&
          condition !== "null" &&
          condition.type === "invite_friends" && {
            condition: {
              type: condition.type,
              invite_friend_count: parseInt(condition.invite_friend_count),
            },
          }),
      };

      const response = await putCard(card);
      console.log("response create card", response);
      console.log("edit card", card);
      if (response?.data) {
        dispatch(toggleEditCardModal(false));
        toast.success("Edit Card Successful");
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
        className="max-w-6xl"
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
            <Textinput
              name="description"
              label="Card Description"
              placeholder="Card Description"
              register={register}
              error={errors.description}
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

            <Select
              name={"condition.type"}
              label={"Condition Type"}
              register={register}
              placeholder="Condition to buy card"
              defaultValue={initialConditionValue?.type}
              options={[
                { value: "null", label: "Empty" },
                { value: "card", label: "Card Level" },
                { value: "invite_friends", label: "Invite Friends" },
              ]}
            />

            {watch("condition.type") === "card" && (
              <>
                <Select
                  name={"condition.card_id"}
                  label={"Card Name"}
                  register={register}
                  placeholder="Card Name"
                  defaultValue={initialConditionValue?.card_id}
                  options={conditionOptions(getCards)}
                />
                <Select
                  name={"condition.card_level"}
                  label={"Card level"}
                  register={register}
                  placeholder="Level Condition to buy card"
                  defaultValue={initialConditionValue?.card_level}
                  options={defaultCardLevelConditionValue}
                />
              </>
            )}

            {watch("condition.type") === "invite_friends" && (
              <Textinput
                name="condition.invite_friend_count"
                label="Invite Friend Count"
                placeholder="Invite Friend Count"
                register={register}
                error={errors.invite_friend_count}
                type={"number"}
              />
            )}

            <Textinput
              name="available_duration"
              label="Available For (hours)"
              placeholder="Available For (hours)"
              register={register}
              error={errors.available_duration}
              type={"number"}
            />
            <Textinput
              name="nominal"
              label="Initial Nominal"
              placeholder="Initial Nominal"
              register={register}
              error={errors.name}
              type={"number"}
            />
            <Textinput
              name="profitperhour"
              label="Initial Profit/Hour"
              placeholder="Initial Profit/Hour"
              register={register}
              error={errors.name}
              type={"number"}
            />
            <Textinput
              name="totalprofitperhour"
              label="Total Profit Per Hour"
              placeholder="Total Profit Per Hour"
              register={register}
              readonly
            />
            <button
              className="flex w-full justify-center bg-green-600 font-semibold text-white my-4 py-2 rounded-md"
              type="button"
              onClick={() => {
                const initialNominal = watch("nominal");
                const initialProfitPerHour = watch("profitperhour");
                const levelsValue = watch("levels");
                console.log("nominal", initialNominal, typeof initialNominal);
                console.log(
                  "profitperhour",
                  initialProfitPerHour,
                  typeof initialProfitPerHour
                );
                console.log("levelsValue", levelsValue);

                const updatedLevels = calculateValues(
                  levelsValue,
                  initialProfitPerHour,
                  initialNominal
                );
                console.log("updatedLevels", updatedLevels);
                setValue("levels", updatedLevels);
                setValue(
                  "totalprofitperhour",
                  parseFloat(updatedLevels[24].profit_per_hour).toLocaleString(
                    "id-ID",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )
                );
              }}
            >
              Preview Card Prices
            </button>
            <div className="w-full">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-1 border rounded-sm px-1 py-2"
                >
                  <label
                    htmlFor={`Level-${field.level}`}
                    className={`mt-8 block capitalize flex-0 mr-6 md:w-[100px] w-[60px] break-words font-semibold text-slate-800 `}
                  >
                    Level {field.level}
                  </label>
                  <Textinput
                    name={`levels.${index}.price_multiplier`}
                    label="Price Multiplier"
                    classLabel="text-xs font-semibold"
                    placeholder="Price Multiplier"
                    register={register}
                    defaultValue={field.price_multiplier}
                    type={"number"}
                  />
                  <Textinput
                    // name={`levels.${index}.upgrade_price`}
                    label="Upgrade Price"
                    classLabel="text-xs font-semibold"
                    placeholder="Upgrade Price"
                    defaultValue={formatAndRoundNumber(
                      watch(`levels.${index}.upgrade_price`)
                    )}
                    readonly
                  />
                  <Textinput
                    name={`levels.${index}.profit_per_hour_multiplier`}
                    label="Profit/Hour Multiplier"
                    classLabel="text-xs font-semibold"
                    placeholder="Profit/Hour Multiplier"
                    register={register}
                    defaultValue={field.profit_per_hour_multiplier}
                    type={"number"}
                  />
                  <Textinput
                    // name={`levels.${index}.profit_per_hour`}
                    label="Profit per Hour"
                    classLabel="text-xs font-semibold"
                    placeholder="Profit per Hour"
                    defaultValue={formatAndRoundNumber(
                      watch(`levels.${index}.profit_per_hour_increase`)
                    )}
                    readonly
                  />
                  <Textinput
                    // name={`levels.${index}.profit_per_hour`}
                    label="Coefficient"
                    classLabel="text-xs font-semibold"
                    placeholder="Coefficient"
                    defaultValue={parseFloat(
                      watch(`levels.${index}.profit_per_hour_increase`) /
                        watch(`levels.${index}.upgrade_price`)
                    ).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    })}
                    readonly
                  />
                  <Textinput
                    name={`levels.${index}.respawn_time`}
                    label="Time"
                    classLabel="text-xs font-semibold"
                    placeholder="Time"
                    register={register}
                    defaultValue={field.respawn_time}
                    type={"number"}
                  />
                </div>
              ))}
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
