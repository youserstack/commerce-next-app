import axios from "axios";
import logError from "lib/client/log/logError";
import { setModal } from "lib/client/store/modalSlice";
import { postData } from "lib/client/utils/fetchData";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function CreateProductReviewForm() {
  // external
  const auth = useSelector((store: any) => store.auth);
  const modal = useSelector((store: any) => store.modal);
  const { active, type, message, id, ids, modalAction, actionLabel, disabled } = modal;
  const dispatch = useDispatch();

  // internal
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  // image files
  const [images, setImages]: any = useState([]);
  const registeredProperties = register("images");
  // const registeredProperties = register("images", { required: true });
  // console.log({ registeredProperties });

  const handleChangeFiles = (e: any) => {
    // get the previous and new files
    const prevImages = getValues("images");
    const newImages = e.target.files;
    // console.log({ prevImages });
    // console.log({ newImages });
    if (!prevImages) {
      setValue("images", [...newImages]);
      setImages([...newImages]);
      return;
    }
    // make the new state
    const changedImages: any = [...prevImages, ...newImages];
    console.log({ changedImages });
    // console.log({ "typeof changedImages": typeof changedImages });
    // set the state
    setValue("images", changedImages);
    setImages(changedImages);
  };

  const handleCreateProductReview = async (data: any) => {
    console.log({ data });
    console.log({ "data.images": data.images });

    // set the formData
    const formData: any = new FormData();
    formData.append("User", auth.user._id);
    for (let key in data) {
      if (key === "images") {
        if (!data[key]) continue;
        for (let image of data[key]) formData.append(key, image);
        continue;
      }
      formData.append(key, data[key]);
    }

    try {
      // create
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/api/v2/products/${router.query.id}/review/multipart`,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log({ response });
      dispatch(setModal({ active: false }));
      router.push({ pathname: router.asPath });
      // console.log(first)
    } catch (error: any) {
      logError(error);
      toast.error(error.message);
      dispatch(setModal({ active: false }));
    }
  };

  const handleClose = () => dispatch(setModal({ active: false }));

  // useEffect(() => {
  //   console.log({ images });
  // }, [images]);

  return (
    <Box className="CREATE_PRODUCT_REVIEW">
      <div className="top">
        <h3>{type}</h3>
        <hr />
      </div>
      <div className="middle">
        <div className="rating">
          <select {...register("rating", { required: true })}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div className="title">
          <input {...register("title", { required: true })} type="text" placeholder="Title" />
        </div>
        <div className="comment">
          <textarea
            {...register("comment", { required: true })}
            name="comment"
            id="comment"
            cols={30}
            rows={10}
            placeholder="Comment"
          />
        </div>
        <div className="images">
          <div className="images-previewer">
            <ul>
              {images.map((image: any) => (
                <li key={image.name}>
                  <Image src={URL.createObjectURL(image)} width={200} height={200} alt="alt" />
                </li>
              ))}
            </ul>
          </div>
          <input
            // {...registeredProperties}
            name={registeredProperties.name}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              // console.log({ e });
              registeredProperties.onChange(e); // method from hook form register
              handleChangeFiles(e); // your method
            }}
          />
        </div>
      </div>
      <div className="bottom">
        <button
          className="create-button"
          onClick={handleSubmit(handleCreateProductReview)}
          // disabled={loading}
        >
          {actionLabel || "Confirm"}
        </button>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Box>
  );
}

const Box = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 2px solid red; */

  .middle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .rating,
    .title,
    .comment,
    .images {
      border: 2px solid #00aaff;
      > * {
        width: 100%;
      }
    }
    .images-previewer {
      ul {
        width: 25rem;
        display: flex;
        gap: 0.5rem;
        overflow-x: scroll;
      }
      img {
        width: 10rem;
        height: 10rem;
        border: 2px solid #fff;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
  }
`;
