import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushCard } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import FormGroup from "@/components/ui/FormGroup";
import { Result } from "../Result";
import { API_URL } from "@/store/api/apiSlice";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const assigneeOptions = [
  { value: "mahedi", label: "Mahedi Amin", image: avatar1 },
  { value: "sovo", label: "Sovo Haldar", image: avatar2 },
  { value: "rakibul", label: "Rakibul Islam", image: avatar3 },
  { value: "pritom", label: "Pritom Miha", image: avatar4 },
];
const options = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
  {
    value: "update",
    label: "update",
  },
];

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const AddCard = () => {
  const { openCardModal } = useSelector((state) => state.card);
  const { token } = useSelector((state) => state.auth);
  console.log("token inside modal add card", token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("initial");

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
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  console.log("errors", errors);

  const onSubmit = (data) => {
    console.log("data", data);
    // const project = {
    //   id: uuidv4(),
    //   name: data.title,
    //   assignee: data.assign,
    //   // get only data value from startDate and endDate
    //   category: null,
    //   startDate: startDate.toISOString().split("T")[0],
    //   endDate: endDate.toISOString().split("T")[0],
    //   des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    //   progress: Math.floor(Math.random() * (100 - 10 + 1) + 10),
    // };

    // dispatch(pushCard(project));
    // dispatch(toggleAddModal(false));
    // reset();
  };

  const handleFileUpload = async (event) => {
    console.log("file event", event.target.files[0]);
    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const result = await fetch(`${API_URL}/media/images`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await result.json();

      console.log('image upload success', data);
      setValue("icon_url", data.data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("fail");
    }
  };

  return (
    <div>
      <Modal
        title="Create Card Category"
        labelclassName="btn-outline-dark"
        activeModal={openCardModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Category Name"
            placeholder="Category Name"
            register={register}
            error={errors.name}
          />
          <input type="file" onChange={handleFileUpload} />
          <Result status={status} />
          {errors?.icon_url && (
            <div className={` mt-2 text-danger-500 block text-sm `}>
              {errors?.icon_url?.message}
            </div>
          )}
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCard;
