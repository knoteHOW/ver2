import { createGlobalStyle } from "styled-components";

import antd from "antd/dist/antd.css";

const Styles = createGlobalStyle`

    ${antd}

    // font
    @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);

    body,
    html {
        font-family: "Noto Sans KR", sans-serif, sans-serif;
    }


    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #fff;
        overflow-x: hidden;
    }

    p {
        margin: 0;
    }

`;

export default Styles;
