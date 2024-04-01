import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

interface Props {
  product?: any;
  setSelectedOptions?: any;
  selectedOptions?: any;
  options?: any;
}

export default function Option({ product, selectedOptions, setSelectedOptions, options }: Props) {
  const optionListRef: any = useRef(null);

  const handleUnfoldOptions = (e: any) => {
    e.stopPropagation();
    optionListRef.current.classList.add("option-list-open");
  };
  const handleAddOption = (option: any) => {
    optionListRef.current.classList.remove("option-list-open");
    const newItem = { item: option.item, price: option.price, quantity: 1 };
    // console.log({ newItem });
    setSelectedOptions((state: any) => {
      const isDuplicated = state.find((v: any) => v.item === option.item) ? true : false;
      if (isDuplicated) return state;
      const newState = [...state, newItem];
      return newState;
    });
  };
  const handleRemoveOption = (option: any) => {
    setSelectedOptions((state: any) => {
      const newState = state.filter((v: any) => v.item !== option.item);
      return newState;
    });
  };

  useEffect(() => {
    const handleClick = () => optionListRef.current.classList.remove("option-list-open");
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // option count button
  // const handleDecrease = (e: any) => {
  //   const currentQuantity = Number(getValues("quantity"));
  //   // if (currentQuantity === 1) return;
  //   setValue("quantity", currentQuantity - 1);
  //   // useForm getValues로는 react dom에서 값 변경에 따른 dom제어가 되지 않기 때문에,
  //   // react useState를 사용한다.
  //   // setQuantity(currentQuantity - 1);
  // };
  // const handleIncrease = (selectedItem: any) => {
  //   console.log({ selectedItem });
  //   // const currentQuantity = Number(getValues("quantity"));

  //   // selectedItem.quantity += 1;
  //   console.log({ selectedOptions });
  //   setSelectedOptions((state: any) => {
  //     const foundItem = state.find((v: any) => v.item === selectedItem.item);
  //     if (!foundItem) return;
  //     foundItem.quantity += 1;
  //     return state;
  //   });

  //   // selectedOptions.map((state: any) => {
  //   //   console.log({ state });
  //   //   // const foundItem = state.find((v: any) => v.item === selectedItem);
  //   //   // console.log({ foundItem });
  //   // });

  //   // setValue("quantity", currentQuantity + 1);
  //   // setQuantity(currentQuantity + 1);
  //   // setSelectedOptions((state: any) => {
  //   //   // console.log({ state });
  //   // });
  // };

  return (
    <Box className="option">
      <div className="folded-option">
        <a className="option-guide" onClick={handleUnfoldOptions}>
          Select the item
        </a>

        <ul className="option-list" ref={optionListRef}>
          <li
            className="option-item"
            onClick={() => handleAddOption({ item: product.name, price: product.price })}
          >
            <a href="#">{product.name}</a>
          </li>
          {options.map((option: any) => (
            <li key={option.item} className="option-item" onClick={() => handleAddOption(option)}>
              <a href="#">{option.item}</a>
            </li>
          ))}
        </ul>
      </div>

      {selectedOptions?.map((selectedOption: any, index: number) => (
        <div key={index} className="selected-option">
          <div>item : {selectedOption.item}</div>
          <div className="option-controller">
            <div className="option-moderator">
              <button
                onClick={() =>
                  setSelectedOptions((state: any) => {
                    const newState = [...state];
                    newState.find((v: any) => v.item === selectedOption.item).quantity -= 1;
                    return newState;
                  })
                }
                disabled={selectedOption.quantity === 1}
              >
                -
              </button>
              <input
                type="number"
                // defaultValue={1}
                value={selectedOption.quantity}
                onChange={(e) =>
                  setSelectedOptions((state: any) => {
                    const newState = [...state];
                    newState.find((v: any) => v.item === selectedOption.item).quantity =
                      e.target.value;
                    return newState;
                  })
                }
              />
              <button
                onClick={() =>
                  setSelectedOptions((state: any) => {
                    const newState = [...state];
                    newState.find((v: any) => v.item === selectedOption.item).quantity += 1;
                    return newState;
                  })
                }
              >
                +
              </button>
              {/* <button onClick={() => handleIncrease(selectedOption)}>+</button> */}
            </div>
            <div className="option-remove">
              <button onClick={() => handleRemoveOption(selectedOption)}>
                <IoIosClose />
              </button>
            </div>
          </div>
        </div>
      ))}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .folded-option {
    position: relative;
    background-color: #9e9e9e;

    .option-guide {
      width: 100%;
      display: block;
      border: 1px solid #ededed;
      padding: 0.5rem;
    }

    .option-list {
      width: 100%;
      transition: all 1s;
      position: absolute;
      top: 100%;
      background-color: #9e9e9e;
      color: #000;
      border: 1px solid #ededed;
      border-top: none;
      display: none;

      .option-item {
        a {
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          display: block;
        }
      }
    }

    .option-list-open {
      display: block;
    }
  }

  .selected-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #424242;
    border-radius: 5px;

    .option-controller {
      display: flex;
      gap: 1rem;
    }

    .option-moderator {
      height: 2rem;
      display: flex;

      input {
        width: 5rem;
        padding: 0.5rem;
        text-align: center;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        /* margin: 0; */
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    .option-remove {
      height: 2rem;

      display: flex;
      justify-content: center;
      align-items: center;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .selected-item {
      float: right;
    }
  }
`;
