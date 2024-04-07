import { getData } from "lib/client/utils/fetchData";
import { styled } from "styled-components";
export async function getServerSideProps({ query }: any) {
  // const response = await getData("product", undefined, query);
  // const { products } = response.data;
  return { props: { data: "products" } };
}
export default function Page() {
  return (
    <Main>
      <section>
        <h1>Electronics Page</h1>
      </section>
      <section>
        <h1>Electronics Page2</h1>
      </section>
    </Main>
  );
}
const Main = styled.main``;
