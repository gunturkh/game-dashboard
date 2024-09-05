import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditCardModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import ReactSelect from "react-select";
import dayjs from "dayjs";

import {
  useGetDailyComboByIdQuery,
  usePutDailyComboMutation,
} from "./dailycomboApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoaderCircle from "@/components/Loader-circle";
import { useGetCardsQuery } from "../cards/cardApiSlice";

const EditDailyCombo = () => {
  const { id } = useParams();
  console.log("category id inside addCard", id);
  const { editCardModal, editCardItem } = useSelector(
    (state) => state.dailycombo
  );
  const [picker, setPicker] = useState(new Date());
  const [selectOptions, setSelectOptions] = useState([]);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");
  const { data: getCards } = useGetCardsQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getCards edit", getCards);

  useEffect(() => {
    if (getCards) {
      const options = getCards
        ?.filter((c) => c.is_published)
        ?.map((c) => ({
          value: c.id,
          label: c.name,
          image: c.image,
        }));
      setSelectOptions(options);
    }
  }, [getCards]);
  console.log("selectOptions edit", selectOptions);

  const [putDailyCombo] = usePutDailyComboMutation();
  const [upload, { isLoading }] = useUploadMutation();
  const { data: getDailyComboById, isFetching } = useGetDailyComboByIdQuery(
    editCardItem.id,
    {
      skipPollingIfUnfocused: true,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const FormValidationSchema = yup
    .object({
      // name: yup.string().required("Category name is required"),
      // image: yup.string().required("Category image is required"),
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
    defaultValues: getDailyComboById,
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("editCardItem", editCardItem);
  console.log("getDailyComboById edit card", getDailyComboById);
  console.log("picker", picker);

  useEffect(() => {
    if (editCardItem) {
      setValue(
        "combination",
        editCardItem.combination?.map((c) => c.id)
      );
      setValue("date", editCardItem.date);
      setPicker(new Date(editCardItem.date));
      setValue("reward_coins", editCardItem.reward_coins);
    }
  }, [editCardItem]);

  useEffect(() => {
    if (picker) setValue("date", picker);
  }, [picker]);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { date, combination, reward_coins } = data;
      const dailyCombo = {
        id: editCardItem.id,
        date: dayjs(date).format("YYYY-MM-DD"),
        combination: combination.map((c) => parseInt(c)),
        reward_coins: parseInt(reward_coins),
      };

      console.log("dailyCombo", dailyCombo);

      const response = await putDailyCombo(dailyCombo);
      console.log("response edit daily combo", response);
      console.log("edit daily combo", dailyCombo);
      if (response?.data) {
        dispatch(toggleEditCardModal(false));
        toast.success("Edit Daily Combo Successful");
        // setStatus("initial");
      } else if (response?.error?.data) {
        throw new Error(response.error.data.message);
      }
      reset();
    } catch (error) {
      dispatch(toggleEditCardModal(false));
      toast.error(error.message);
      // setStatus("initial");
    }
  };
  console.log("watch(combination) edit", watch("combination"));
  return (
    <div>
      <Modal
        className="max-w-6xl h-[1000px]"
        title="Edit Daily Combo"
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
            <div>
              <label className="block capitalize form-label">
                Daily Combo Card 1
              </label>
              <ReactSelect
                defaultValue={
                  getCards.filter((c) => c.id === watch("combination[0]"))[0]
                }
                options={selectOptions}
                formatOptionLabel={(card) => (
                  <div className="flex gap-4 items-center">
                    <img
                      src={card?.image}
                      alt={card?.name || card?.label}
                      className="w-8 h-8"
                    />
                    <span>{card?.name || card?.label}</span>
                  </div>
                )}
                onChange={({ value }) => {
                  console.log("value daily combo", value);
                  setValue("combination[0]", value);
                }}
              />

              <label className="block capitalize form-label mt-2">
                Daily Combo Card 2
              </label>
              <ReactSelect
                defaultValue={
                  getCards.filter((c) => c.id === watch("combination[1]"))[0]
                }
                options={selectOptions}
                formatOptionLabel={(card) => (
                  <div className="flex gap-4 items-center">
                    <img
                      src={card?.image}
                      alt={card?.name || card?.label}
                      className="w-8 h-8"
                    />
                    <span>{card?.name || card?.label}</span>
                  </div>
                )}
                onChange={({ value }) => {
                  console.log("value daily combo", value);
                  setValue("combination[1]", value);
                }}
              />

              <label className="block capitalize form-label mt-2">
                Daily Combo Card 3
              </label>
              <ReactSelect
                defaultValue={
                  getCards.filter((c) => c.id === watch("combination[2]"))[0]
                }
                options={selectOptions}
                formatOptionLabel={(card) => (
                  <div className="flex gap-4 items-center">
                    <img
                      src={card?.image}
                      alt={card?.name || card?.label}
                      className="w-8 h-8"
                    />
                    <span>{card?.name || card?.label}</span>
                  </div>
                )}
                onChange={({ value }) => {
                  console.log("value daily combo", value);
                  setValue("combination[2]", value);
                }}
              />

              <label className="block capitalize form-label mt-2">
                Daily Combo Card 4
              </label>
              <ReactSelect
                defaultValue={
                  getCards.filter((c) => c.id === watch("combination[3]"))[0]
                }
                options={selectOptions}
                formatOptionLabel={(card) => (
                  <div className="flex gap-4 items-center">
                    <img
                      src={card?.image}
                      alt={card?.label}
                      className="w-8 h-8"
                    />
                    <span>{card?.name || card?.label}</span>
                  </div>
                )}
                onChange={({ value }) => {
                  console.log("value daily combo", value);
                  setValue("combination[3]", value);
                }}
              />

              <label className="block capitalize form-label mt-2">Date</label>
              <Flatpickr
                name="date"
                className="border border-gray-200 rounded-md w-full px-3 py-2"
                value={picker}
                onChange={(date) => setPicker(date)}
                id="default-picker"
                {...register}
              />
            </div>
            <Textinput
              name="reward_coins"
              label="Reward"
              placeholder="Reward"
              register={register}
              error={errors.reward_coins}
              type="number"
            />
            <div className="ltr:text-right rtl:text-left">
              <Button
                type="submit"
                text="Edit Daily Combo"
                className="btn btn-dark block w-full text-center "
                isLoading={isLoading}
                disabled={
                  watch("combination") &&
                  watch("combination")?.some((c) => c === 0)
                }
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default EditDailyCombo;
