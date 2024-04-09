import { createGlobalStyle, css } from "styled-components";
const styled = { createGlobalStyle };
export const GlobalStyled = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  ${({ theme }: any) => {
    if (theme === "light") {
      return css`
        html {
          body {
            background-color: #fff;
            color: #333;
          }

          header {
            color: #777;

            .nav-upper {
              background-color: #e0e0e0;
            }

            .nav-lower {
              background-color: #ccc;
            }

            .account-icon-hover-menu {
              background-color: #aaa;

              .arrow {
                background-color: #aaa;
              }

              .partition {
                border-color: #fff;
              }
            }
          }

          main {
            .box {
              background-color: #f0f0f0;
              border: 1px solid #e0e0e0;

              .partition,
              .option {
                border-color: #e0e0e0;
              }
            }

            .pagination.box {
              border-color: #e0e0e0;
            }
          }
        }
      `;
    }

    if (theme === "dark") {
      return css`
        html {
          header {
            color: #fff;

            .nav-upper {
              background-color: #111;
            }

            .account-icon-hover-menu {
              background-color: #333;

              .arrow {
                background-color: #333;
              }

              .partition {
                border-color: #fff;
              }
            }

            .hover-menu {
              background-color: #424242;

              .arrow {
                background-color: #424242;
              }

              .partition {
                border-color: #757575;
              }
            }

            a:hover,
            button:hover {
              color: #808080;
            }
          }

          main {
            background-color: #000;
            color: white;

            // home page
            .category .card {
              background-color: #424242;
            }

            .best-sellers,
            .new-arrivals {
              background-color: #212121;
            }

            // box model
            .box {
              background-color: #212121;
              border: 1px solid #424242;

              .partition {
                border-color: #424242;
              }

              .options .option {
                border-color: #424242;
              }
            }

            .pagination.box {
              color: #424242;

              button {
                color: #fff;
              }
            }
          }
        }
      `;
    }
  }}

  /* layout */
  html {
    width: 100vw;
    overflow-x: hidden;

    header {
      width: 100vw;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(3px);

      .nav-upper {
        section {
          max-width: 1000px;
          margin: auto;
        }
      }

      @media (max-width: 1000px), (width <= 1000px) {
        nav .nav-belt .nav-belt-right {
          .account-icon .avatar-outer {
            cursor: pointer;
            &:hover + .hover-menu {
              display: none;
            }
          }
        }
      }
    }

    main {
      width: 100vw;
      overflow-x: hidden;
      padding-top: 100px;
      padding-bottom: 5rem;

      section {
        width: 100%;
        max-width: 1000px;
        min-height: 100vh;
        margin: auto;
      }

      .slick-slider-controller {
        button {
          background-color: transparent;
          &:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    footer {
      color: #fff;

      @media (max-width: 500px), (width <= 500px) {
        background-attachment: initial !important;
        .footer-content {
          flex-direction: column;
        }
      }
    }
  }

  /* elements */
  html {
    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        cursor: pointer;
        color: #fff;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    ul {
      li {
        list-style: none;
      }
    }

    p,
    span,
    label {
      font-size: 14px;
    }

    hr {
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      /* border-bottom-width: 1px; */
      border-bottom: 1px solid;
      border-color: #fff;
    }

    input,
    textarea {
      /* padding: .5rem; */
      padding: 3px;
    }

    button {
      border: none;
      padding: 0.5rem;
      background-color: transparent;
      color: inherit;
      cursor: pointer;
      &:hover {
        background-color: #000;
        color: #fff;
      }
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    .general-button,
    .create-button,
    .buy-button,
    .pay-button,
    .add-button,
    .edit-button,
    .update-button,
    .delete-button,
    .cancel-button,
    .close-button {
      padding: 0.5rem;
      border-radius: 5px;
      color: #fff;
      &:hover {
        background-color: #000;
      }
    }

    .general-button {
      background-color: #333;
      &:disabled {
        background-color: #333;
      }
    }

    .create-button {
      background-color: #00aaff;
      &:disabled {
        background-color: #00aaff;
      }
    }

    .buy-button,
    .pay-button,
    .add-button {
      background-color: #1b5e20;
    }

    .edit-button,
    .update-button {
      background-color: #ff9800;
      &:disabled {
        background-color: #ff9800;
      }
    }

    .delete-button {
      background-color: #c15151;
      &:disabled {
        background-color: #c15151;
      }
    }

    .cancel-button,
    .close-button {
      background-color: #333;
    }
  }
`;
