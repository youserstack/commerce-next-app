import { setModal } from "lib/client/store/modalSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";

export default function CreateProductForm() {
  // external
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);

  // internal
  const [product, setProduct]: any = useState({});
  const [images, setImages]: any = useState([]);
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, getValues, reset, formState, control } =
    useForm();

  const handleCreateProduct = async (data: any) => {
    console.log("data : ", data);
    console.log({ images: images });
    // return;

    // check validation
    if (images.length === 0) return toast.error("Please fill the image field.");
    if (data.category === "all") return toast.error("Please fill the category field.");

    // set the formData
    const formData: any = new FormData();
    for (let image of images) formData.append("images", image);
    for (let key in data) formData.append(key, data[key]);

    // create
    try {
      dispatch(setLoading(true));
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v2/products/multipart",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      logResponse(response);
      dispatch(setLoading(false));
      toast.success("A product was created");
      router.push({ pathname: router.pathname });
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };
  const handleDeleteButton = (e: any, index: any) => {
    e.preventDefault();
    const filteredImages = images.filter((v: any, i: any) => i !== index);
    setImages(filteredImages);
    // console.log(filteredImages);
    // setValue("images", filteredImages);
  };
  const handleChangeFiles = (e: any) => {
    // get the changed files
    const newImages = e.target.files;
    // check the duplicated items
    for (let newImage of newImages) {
      for (let image of images) {
        if (newImage.name === image.name) return console.log({ images });
      }
    }
    // make the new state
    const changedImages: any = [...images, ...newImages];
    // console.log({ changedImages });
    // set the state
    setImages(changedImages);
  };
  const handleCloseButton = (e: any) => {
    e.preventDefault();
    dispatch(setModal({ active: false }));
  };

  return (
    <Box>
      <div className="top">
        <h3>Create_Product_Form</h3>
        <hr />
      </div>
      <div className="middle">
        <label className="category">
          {/* <span>Category</span> */}
          <select {...register("category", { required: true })} id="category">
            <option value="all">Select the category</option>
            <option value="electronics">Electronics</option>
            <option value="furnitures">Furnitures</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="fashion">Fashion</option>
          </select>
        </label>
        <label className="name">
          <input {...register("name", { required: true })} type="text" placeholder="Name" />
        </label>
        <label className="description">
          <textarea
            {...register("description", { required: true })}
            cols={30}
            rows={4}
            placeholder="Description"
          />
        </label>
        <label className="seller">
          <input {...register("seller", { required: true })} type="text" placeholder="Seller" />
        </label>
        <label className="price">
          <input {...register("price", { required: true })} type="number" placeholder="Price" />
        </label>
        <label className="stock">
          <input {...register("stock", { required: true })} type="number" placeholder="Stock" />
        </label>
        <div className="images">
          <div className="preview-images-outer">
            <div className="preview-images">
              {images.map((image: any, index: any) => (
                <div key={image.id} className={`image ${index === 0 && "thumbnail-image"}`}>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={URL.createObjectURL(image)}
                    // src={image.url || image.secure_url || URL.createObjectURL(image)}
                    // alt={image.url || image.secure_url || URL.createObjectURL(image)}
                    width={100}
                    height={100}
                  />
                  <button onClick={(e: any) => handleDeleteButton(e, index)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <label className="image-uploader">
            <input type="file" multiple accept="image/*" onChange={handleChangeFiles} />
          </label>
        </div>
      </div>
      <div className="bottom">
        <button
          className="create-button"
          onClick={handleSubmit(handleCreateProduct)}
          // disabled={loading}
        >
          Create
        </button>
        <button className="close-button" onClick={handleCloseButton}>
          Close
        </button>
      </div>
    </Box>
  );
}
const Box = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > .middle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .images {
      width: 100%;
      border: 2px solid #777;
    }
    .preview-images-outer {
      overflow-x: scroll;
      .preview-images {
        width: fit-content;
        display: flex;
        gap: 1rem;
        padding: 1rem;
        .thumbnail-image {
          border: 5px solid coral;
        }
        .image {
          position: relative;
          width: 10rem;
          height: 10rem;
          border: 2px solid #777;
          button {
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 0.3rem;
            right: 0.3rem;
            background-color: #fff;
            color: #000;
            border: 2px solid #777;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    input,
    select,
    textarea {
      padding: 0.5rem;
    }
  }
  > .bottom {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
    margin-top: 1rem;
    > button {
      border-radius: 5px;
      padding: 1rem;
    }
  }
`;
