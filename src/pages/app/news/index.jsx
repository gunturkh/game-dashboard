import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoaderCircle from "@/components/Loader-circle";
import { LazyLog } from "@melloware/react-logviewer";
import dayjs from "dayjs";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  UndoRedo,
  CreateLink,
  linkDialogPlugin,
  linkPlugin,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import ReactSelect from "react-select";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetPlayersQuery } from "../players/playersApiSlice";
import { useUploadMutation } from "@/store/api/image/imageApiSlice";
import { Result } from "../Result";
import Radio from "@/components/ui/Radio";
import { usePostNewsMutation } from "./newsApiSlice";
// import { BoldItalicUnderlineToggles, toolbarPlugin, UndoRedo } from "@mdxeditor/editor/dist";

const NewsPage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("initial");
  const [selectOptions, setSelectOptions] = useState([]);
  const [upload, { isLoading }] = useUploadMutation();
  const [news, setNews] = useState(`🐿️ Hi Chipmunks 🐿️ 
    this is a test news`);
  const [postNews] = usePostNewsMutation();
  const [type, setType] = useState("text");
  const [sendTo, setSendTo] = useState("selected");
  const ref = React.useRef(null);

  const { data: getPlayers } = useGetPlayersQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  console.log("getPlayers", getPlayers);

  useEffect(() => {
    if (getPlayers) {
      setSelectOptions(
        getPlayers.map((player) => ({
          value: player.telegram_id,
          label: `${player.username} (${player.first_name} ${player.last_name})`,
        }))
      );
    }
  }, [getPlayers]);

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
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

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

      setValue("image_url", response.data.data, { shouldValidate: true });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("fail");
    }
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleSendTo = (e) => {
    setSendTo(e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      console.log("ref", ref.current.getMarkdown());
      console.log("data", data);
      
      // Escape special characters for Markdown
      const escapedMessage = news.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
      
      const payload = {
        message: escapedMessage,
        type: type,
        telegram_ids: data.telegram_ids.map((id) => id.value),
        image_url: data.image_url,
        is_all_player: sendTo === "all" ? true : false,
      };
      console.log("payload", payload);
      const response = await postNews(payload);
      console.log("response post news", response);
      console.log("post news", payload);
      if (response?.data) {
        toast.success("Send News Successful");
        setValue("tel")
      } else if (response?.error?.data) {
        throw new Error(response.error.data.message);
      }
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Broadcast
        </h4>
      </div>
      <Card title="News" noborder>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <MDXEditor
              ref={ref}
              markdown={news}
              onChange={(value) => {
                console.log("value", value);
                setNews(value);
              }}
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      {/* <BlockTypeSelect /> */}
                      <CreateLink />
                    </>
                  ),
                }),
              ]}
            />
            <div className=" md:mt-10 mt-5 lg:flex lg:space-x-4 lg:space-y-0 space-y-5 items-center">
              <p
                href="#"
                className="text-base font-medium text-slate-800 dark:text-slate-300 flex  flex-none  "
              >
                Choose News Type
              </p>
              <div className="md:space-x-5 md:space-y-0 space-y-3 rtl:space-x-reverse md:flex  justify-start lg:justify-end flex-1 md:text-base text-sm ">
                <label className="inline-flex items-center border border-slate-900 dark:border-slate-700 rounded py-3 lg:px-10 px-5 md:w-auto w-[200px] ">
                  <Radio
                    name="Image"
                    value="image"
                    checked={type === "image"}
                    onChange={handleChange}
                  />
                  <span className=" text-slate-900 dark:text-slate-300">
                    With Image
                  </span>
                </label>
                <label className="inline-flex items-center border border-slate-900 dark:border-slate-700 rounded py-3 lg:px-10 px-5 md:w-auto w-[200px]">
                  <Radio
                    name="Text"
                    value="text"
                    checked={type === "text"}
                    onChange={handleChange}
                  />
                  <span className=" text-slate-900 dark:text-slate-300">
                    Text Only
                  </span>
                </label>
              </div>
            </div>
            {type === "image" && (
              <div className="my-4">
                <label
                  htmlFor={"card-icon"}
                  className={`block capitalize flex-0 mr-6 md:w-[100px] w-[60px] break-words `}
                >
                  Image
                </label>
                <input type="file" onChange={handleFileUpload} />
                <Result status={status} />
              </div>
            )}
            <div className=" md:mt-10 mt-5 lg:flex lg:space-x-4 lg:space-y-0 space-y-5 items-center">
              <p
                href="#"
                className="text-base font-medium text-slate-800 dark:text-slate-300 flex  flex-none  "
              >
                Send To
              </p>
              <div className="md:space-x-5 md:space-y-0 space-y-3 rtl:space-x-reverse md:flex  justify-start lg:justify-end flex-1 md:text-base text-sm ">
                <label className="inline-flex items-center border border-slate-900 dark:border-slate-700 rounded py-3 lg:px-10 px-5 md:w-auto w-[200px] ">
                  <Radio
                    name="All"
                    value="all"
                    checked={sendTo === "all"}
                    onChange={handleSendTo}
                  />
                  <span className=" text-slate-900 dark:text-slate-300">
                    All
                  </span>
                </label>
                <label className="inline-flex items-center border border-slate-900 dark:border-slate-700 rounded py-3 lg:px-10 px-5 md:w-auto w-[200px]">
                  <Radio
                    name="Selected User"
                    value="selected"
                    checked={sendTo === "selected"}
                    onChange={handleSendTo}
                  />
                  <span className=" text-slate-900 dark:text-slate-300">
                    Selected Users
                  </span>
                </label>
              </div>
            </div>
            {sendTo === "selected" && (
              <div className="my-4">
                <label className="block capitalize form-label">
                  Select User To Test
                </label>
                <ReactSelect
                  isMulti
                  defaultValue={[]}
                  options={selectOptions}
                  formatOptionLabel={(card) => (
                    <div className="flex gap-4 items-center">
                      <span>{card.label}</span>
                    </div>
                  )}
                  onChange={(value) => {
                    console.log("telegram_ids", value);
                    setValue("telegram_ids", value);
                  }}
                />
              </div>
            )}
          </div>
          <div className="ltr:text-right rtl:text-left">
            <Button
              type="submit"
              text="Send News"
              className="btn bg-green-600 text-white block w-full text-center "
              //   isLoading={isLoading}
              //   disabled={watch("combination").some((c) => c === 0)}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewsPage;
