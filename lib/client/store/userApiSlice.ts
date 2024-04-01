import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// export const fetchUsers = createAsyncThunk("userApi/getUser");
export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: async (headers: any, api: any) => {
      // console.log({ api });
      // console.log(api.getState().auth);
      const accessToken = await api.getState().auth.accessToken;
      console.log({ accessToken });
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"], // cached data
  // endpoints property에
  // builder object로 api actions를 생성하도록, 콜백을 설정한다.
  // baseUrl/query 경로로 요청하고 응답받은 데이터를
  // 캐싱한 데이터(리덕스 스토어의 데이터)와 비교하고
  // 변경이 있으면, getTodos를 다시 요청하고 client에 반영한다.
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["user"],
      // transformResponse: (res: any) => {
      //   // console.log("res : ", res);
      //   return res.sort((a: any, b: any) => b.id - a.id);
      // },
    }),
    // addTodo: builder.mutation({
    //   // 다음의 쿼리를 요청한다.
    //   query: (todo) => ({
    //     // 쿼리시 메서드 변경하고 페이로드 설정한다.
    //     url: "/todos",
    //     method: "POST",
    //     body: todo,
    //   }),
    //   // 그 다음, providesTags로 설정한 태그를 무효화하도록 하여, getUser() 실행한다.
    //   // cached data를 invalidate하고 getTodos를 통해 query 요청을 한다.
    //   invalidatesTags: ["Todos"],
    // }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload._id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    // deleteTodo: builder.mutation({
    //   // query: (todo) => {
    //   //   console.log({ todo });
    //   //   return {
    //   //     url: `/todos/${todo._id}`,
    //   //     method: "DELETE",
    //   //     body: todo,
    //   //   };
    //   // },
    //   query: (todo) => ({
    //     url: `/todos/${todo._id}`,
    //     method: "DELETE",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
  }),
});
// api hooks
export const {
  useGetUserQuery,
  // useAddTodoMutation,
  useUpdateUserMutation,
}: // useDeleteTodoMutation,
any = userApiSlice;
