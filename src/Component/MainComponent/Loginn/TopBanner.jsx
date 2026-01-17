// import React from "react";
// import BannerAnim, { Element } from "rc-banner-anim";
// import TweenOne from "rc-tween-one";
// import "rc-banner-anim/assets/index.css";
// import "./TopBanner.css";
// import HNY from "./HNY.png"; // adjust path if needed

// const BgElement = Element.BgElement;

// const TopBanner = () => {
//   const slides = [
//     {
//       img: HNY,
//       title: "Happy New Year",
//       text: "Wishing you success and growth with Crystal Solutions",
//     },
//     // {
//     //   img: "/banner/eid.jpg",
//     //   title: "Eid Mubarak",
//     //   text: "May this Eid bring peace, prosperity and happiness",
//     // },
//   ];

//   return (
//     <div className="topStickyBannerWrapper">
//       <BannerAnim autoPlay prefixCls="customTopBanner">
//         {slides.map((item, index) => (
//           <Element key={index} prefixCls="banner-elem">
//             <BgElement
//               key="bg"
//               className="bg"
//               style={{
//                 backgroundImage: `url(${item.img})`,
//                 backgroundSize: "contain",
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "center center",
//               }}
//             />
//             <div className="bannerTextWrap">
//               <TweenOne
//                 className="bannerTitle"
//                 animation={{ y: 20, opacity: 0, type: "from" }}
//               >
//                 {item.title}
//               </TweenOne>
//               <TweenOne
//                 className="bannerSubtitle"
//                 animation={{ y: 20, opacity: 0, delay: 100, type: "from" }}
//               >
//                 {item.text}
//               </TweenOne>
//             </div>
//           </Element>
//         ))}
//       </BannerAnim>
//     </div>
//   );
// };

// export default TopBanner;

import React from "react";
import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import "rc-banner-anim/assets/index.css";
import "./TopBanner.css";

import HNY from "./HNY.png";
// import Eid from "./eid.png";      // example
// import PakistanDay from "./pakday.png"; // example

const BgElement = Element.BgElement;

const TopBanner = () => {
  const banners = [
    {
      img: HNY,
      date: "2026-01-01",
    },
    // {
    //   img: Eid,
    //   date: "2026-03-31",
    // },
    // {
    //   img: PakistanDay,
    //   date: "2026-03-23",
    // },
  ];

  const today = new Date().toISOString().split("T")[0];

  const todayBanners = banners.filter((item) => item.date === today);

  if (todayBanners.length === 0) return null;

  return (
    <div className="topStickyBannerWrapper">
      <BannerAnim autoPlay prefixCls="customTopBanner">
        {todayBanners.map((item, index) => (
          <Element key={index} prefixCls="banner-elem">
            <BgElement
              key="bg"
              className="bg"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            />

            <div className="bannerTextWrap">
              <TweenOne
                className="bannerTitle"
                animation={{ y: 20, opacity: 0, type: "from" }}
              >
                {item.title}
              </TweenOne>

              <TweenOne
                className="bannerSubtitle"
                animation={{ y: 20, opacity: 0, delay: 100, type: "from" }}
              >
                {item.text}
              </TweenOne>
            </div>
          </Element>
        ))}
      </BannerAnim>
    </div>
  );
};

export default TopBanner;
