import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  active?: boolean | null; // 모달 활성화, 비활성화
  type?: string | null; // 액션타입
  id?: string | null; // 식별할 아이디
  ids?: string[] | null; // 식별할 아디디 어레이
  data?: any | null;

  // callback?: Function | null; // 액션
  // onClose?:()=>void;
  // onSubmit?:()=>void;
  // body?:React.ReactElement;
  // footer?:React.ReactElement;
}

interface ModalAction extends ModalState {
  // required properties
  active: boolean | null; // 모달 활성화, 비활성화
}

const initialState: ModalState = {};
// {
//   // active: true,
//   // type: "DEFAULT",
//   // type: "CREATE_PRODUCT",
//   // type: "CREATE_PRODUCT_REVIEW",
// };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state: any, action): any => {
      // setModal: (state: any, action: PayloadAction<ModalAction>) => {
      if (!action.payload) return {};
      for (let [key, value] of Object.entries(action.payload)) {
        // console.log({ key, value });
        state[key] = value;
      }
    },
  },
  extraReducers(builder) {
    // builder.addCase(fetchTest.fulfilled, (state, action) => {
    //   // 리턴된 값으로 상태 변경
    //   console.log("extraReducers : ", action.payload);
    //   return action.payload;
    // });
  },
});

export const { setModal } = modalSlice.actions;
