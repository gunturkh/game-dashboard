import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCardModal } from "./store";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Flatpickr from "react-flatpickr";
import ReactSelect from "react-select";
import * as yup from "yup";

import { useCreateDailyComboMutation } from "./logsApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { useParams } from "react-router-dom";
import Icons from "@/components/ui/Icon";
import Select from "@/components/ui/Select";
import { API_URL } from "@/store/api/apiSlice";
import { calculateValues, formatAndRoundNumber } from "./utils";
import Switch from "@/components/ui/Switch";
import FlatpickerPage from "@/pages/forms/date-time-picker";
import dayjs from "dayjs";
import { useGetCardsQuery } from "../cards/cardApiSlice";

const AddDailyCombo = () => {
  const { id } = useParams();
  console.log("category id inside addCard", id);
  const { openCardModal } = useSelector((state) => state.dailycombo);
  const [picker, setPicker] = useState(new Date());
  const { token } = useSelector((state) => state.auth);
  console.log("openCardModal", openCardModal);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");
  const [selectOptions, setSelectOptions] = useState([]);

  const [createDailyCombo] = useCreateDailyComboMutation();
  const [upload, { isLoading }] = useUploadMutation();
  const { data: getCards } = useGetCardsQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getCards", getCards);
  // const { data: getDailyCombo } = useGetDailyComboQuery(undefined, {
  //   skipPollingIfUnfocused: true,
  //   refetchOnMountOrArgChange: false,
  //   skip: false,
  // });
  useEffect(() => {
    if (getCards) {
      const options = getCards.map((c) => ({
        value: c.id,
        label: c.name,
        image: c.image,
      }));
      setSelectOptions(options);
    }
  }, [getCards]);

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
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      date: new Date(),
      combination: [0, 0, 0, 0],
      reward_coins: 5000000,
    },
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    if (picker) setValue("date", picker);
  }, [picker]);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { date, combination, reward_coins } = data;
      const dailyCombo = {
        date: dayjs(date).format("YYYY-MM-DD"),
        combination: combination.map((c) => parseInt(c)),
        reward_coins: parseInt(reward_coins),
      };

      console.log("dailyCombo", dailyCombo);

      const response = await createDailyCombo(dailyCombo);
      console.log("response create daily combo", response);
      console.log("create daily combo", dailyCombo);
      if (response?.data) {
        dispatch(toggleAddCardModal(false));
        toast.success("Add Daily Combo Successful");
      } else if (response?.error?.data) {
        throw new Error(response.error.data.message);
      }
      reset();
    } catch (error) {
      dispatch(toggleAddCardModal(false));
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        className="max-w-6xl h-[1000px]"
        title="Create Daily Combo"
        labelclassName="btn-outline-dark"
        activeModal={openCardModal}
        onClose={() => dispatch(toggleAddCardModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label className="block capitalize form-label">
              Daily Combo Card 1
            </label>
            <ReactSelect
              defaultValue={null}
              options={selectOptions}
              formatOptionLabel={(card) => (
                <div className="flex gap-4 items-center">
                  <img src={card.image} alt={card.label} className="w-8 h-8" />
                  <span>{card.label}</span>
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
              defaultValue={null}
              options={selectOptions}
              formatOptionLabel={(card) => (
                <div className="flex gap-4 items-center">
                  <img src={card.image} alt={card.label} className="w-8 h-8" />
                  <span>{card.label}</span>
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
              defaultValue={null}
              options={selectOptions}
              formatOptionLabel={(card) => (
                <div className="flex gap-4 items-center">
                  <img src={card.image} alt={card.label} className="w-8 h-8" />
                  <span>{card.label}</span>
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
              defaultValue={null}
              options={selectOptions}
              formatOptionLabel={(card) => (
                <div className="flex gap-4 items-center">
                  <img src={card.image} alt={card.label} className="w-8 h-8" />
                  <span>{card.label}</span>
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
              text="Submit Daily Combo"
              className="btn bg-green-600 text-white block w-full text-center "
              isLoading={isLoading}
              disabled={watch("combination").some((c) => c === 0)}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddDailyCombo;
