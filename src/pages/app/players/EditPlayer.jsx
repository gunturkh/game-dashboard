import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { usePutPlayerMutation } from "./playersApiSlice";
import { toggleEditPlayerModal } from "./store";

const EditPlayer = () => {
  const { editPlayerModal, editPlayerItem } = useSelector(
    (state) => state.player
  );
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal player", token);
  const dispatch = useDispatch();

  const [putPlayer] = usePutPlayerMutation();

  const FormValidationSchema = yup
    .object({
      points_balance: yup.string().required("Points balance is required"),
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
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
    defaultValues: editPlayerItem,
  });

  useEffect(() => {
    if (editPlayerItem) {
      setValue("points_balance", editPlayerItem.points_balance);
    }
  }, [editPlayerItem]);

  console.log("errors", errors);
  console.log("editPlayerItem", editPlayerItem);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      const { points_balance } = data;
      const player = {
        id: editPlayerItem.id,
        points_balance,
      };

      console.log("edit player", player);
      const response = await putPlayer(player);
      console.log("response edit player", response.data);
      if (response.status) {
        toast.success("Edit player Successful");
        dispatch(toggleEditPlayerModal(false));
        reset();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log("edit value", getValues());

  return (
    <div>
      <Modal
        title="Inject Player's Point Balance"
        labelclassName="btn-outline-dark"
        activeModal={editPlayerModal}
        onClose={() => dispatch(toggleEditPlayerModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="points_balance"
            label="Points Balance"
            placeholder="Inject Points"
            register={register}
            error={errors.points_balance}
          />
          <div className="ltr:text-right rtl:text-left">
            <Button
              type="submit"
              text="Inject Point Balance"
              className="btn btn-dark block w-full text-center "
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditPlayer;
