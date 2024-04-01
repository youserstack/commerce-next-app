import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return (
    <Box>
      <section>
        <div className="footer-content">
          <div className="left">
            <h1 className="title">E-Commerce</h1>
            <small>youserstack &copy; 2023 all rights reserved.</small>
            <div className="social"></div>
          </div>
          <div className="right">
            <h1>Index</h1>
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/#policy"}>Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </section>
    </Box>
  );
}
const Box = styled.footer`
  height: 50vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/town.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  section {
    max-width: 1000px;
    height: 100%;
    margin: auto;
    /* margin-top: 1rem; */

    .footer-content {
      display: flex;
      justify-content: space-between;
      padding: 2rem;
      // border: 2px dashed;

      .left {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .title {
        }
        .social {
          display: flex;
          gap: 1rem;
          .icon {
            transition: all 0.2s;
            opacity: 1;
            &:hover {
              opacity: 0.5;
            }
          }
        }
        a {
          width: 2rem;
        }
      }
      .right {
        min-width: 10rem;
        // border: 2px solid green;
        ul {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          li {
            transition: all 0.2s;
            opacity: 1;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
      .left,
      .right {
        padding: 1rem;
        // border: 2px solid;
      }
    }
    .footer-bottom {
      text-align: end;
    }
  }
`;
