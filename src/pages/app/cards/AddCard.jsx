import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCardModal } from "./store";
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
} from "./cardApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import Icons from "@/components/ui/Icon";
import Select from "@/components/ui/Select";
import { API_URL } from "@/store/api/apiSlice";
import { calculateValues, formatAndRoundNumber } from "./utils";
import Switch from "@/components/ui/Switch";

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
      return options;
    } else return [{ value: 0, label: "null" }];
  };
  console.log("getCards", getCards);
  console.log("conditionOptions(getCards)", conditionOptions(getCards));

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Category name is required"),
      image: yup.string().required("Category image is required"),
    })
    .required();

  const defaultLevelValue = [];
  for (let index = 0; index <= 25; index++) {
    defaultLevelValue.push({
      level: index,
      upgrade_price: 0,
      profit_per_hour_increase: 0,
      profit_per_hour: 0,
      price_multiplier: 0.5,
      profit_per_hour_multiplier: 0.1,
      respawn_time: 0,
    });
  }
  const defaultCardLevelConditionValue = [];
  for (let index = 0; index < 25; index++) {
    defaultCardLevelConditionValue.push({
      value: index + 1,
      label: index + 1,
    });
  }

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
      available_duration: 0,
      levels: defaultLevelValue,
      condition: {
        type: "null",
        card_id: 1,
        card_level: 1,
        invite_friend_count: 1,
      },
    },
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  const conditionValue = watch("condition");
  console.log("conditionValue", conditionValue);
  console.log("watch level", watch("condition-level"));
  console.log("defaultLevelValue", defaultLevelValue);

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
  //       console.log("response", result);
  //       if (result.status) {
  //         const data = result.data;
  //         const options = data.levels?.map((l) => ({
  //           value: l.level,
  //           label: l.level.toString(),
  //         }));
  //         console.log("options condition levels", options);
  //         if (options) {
  //           setConditionCardLevelOptions(options);
  //           // setConditionCardLevelOptions([{value: 'test', label: 'test'}]);
  //         }
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
  //     setConditionCardLevelOptions([{ value: 0, label: "null" }]);
  //     setValue("conditionLevel", 1);
  //   }
  // }, [conditionValue]);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "levels",
  });
  console.log("errors", errors);
  console.log("levels", watch("levels"));

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
        // conditionLevel,
      } = data;
      const card = {
        name,
        is_published,
        available_duration: parseInt(available_duration),
        description,
        image,
        category_id: parseInt(id),
        levels: levels.map((l) => ({
          ...l,
          price_multiplier: parseFloat(l.price_multiplier),
          profit_per_hour_multiplier: parseFloat(l.profit_per_hour_multiplier),
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
      console.log("submit card", card);

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

      setValue("image", response.data.data, { shouldValidate: true });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("fail");
    }
  };

  console.log("conditionCardLevelOptions", conditionCardLevelOptions);
  console.log("watch(nominal)", watch("nominal"));
  return (
    <div>
      <Modal
        className="max-w-6xl"
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
          <input type="file" onChange={handleFileUpload} />
          <Result status={status} />
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
            defaultValue={"null"}
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
                defaultValue={1}
                options={conditionOptions(getCards)}
              />
              <Select
                name={"condition.card_level"}
                label={"Card level"}
                register={register}
                placeholder="Level Condition to buy card"
                defaultValue={1}
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
                  htmlFor={`Level-${index}`}
                  className={`mt-8 block capitalize flex-0 mr-1 md:w-[100px] w-[60px] break-words font-semibold text-slate-800 `}
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
                  placeholder="Profit/Hour Multipliery"
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
                    watch(`levels.${index}.profit_per_hour`)
                  )}
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
              text="Submit Card"
              className="btn bg-green-600 text-white block w-full text-center "
              isLoading={isLoading}
              disabled={
                !watch("nominal") ||
                watch("nominal") === "" ||
                !watch("profitperhour") ||
                watch("profitperhour") === ""
              }
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCard;
