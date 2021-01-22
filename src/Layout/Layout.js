import React from "react";
import "./Layout.css";

const Layout = (props) => {
  return (
    <div className="LayoutBackgorund">
      <div className="transperantBackground">
        <div className="LogoHolder">
          <img
            src="https://woltapp.files.wordpress.com/2017/02/cropped-unnamed.png?w=200"
            alt="woltLogo"
          />
          <h1>Wold - Summer Intership 2021 - Erkan Isuf</h1>
          <a href="https://github.com/erkanisuf/">
            <img
              style={{ cursor: "Pointer" }}
              src="https://icons-for-free.com/iconfiles/png/512/github+icon-1320168274457504277.png"
              alt="githubIcon"
            />
          </a>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
