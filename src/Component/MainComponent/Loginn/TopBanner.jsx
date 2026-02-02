

// import React from "react";
// import BannerAnim, { Element } from "rc-banner-anim";
// import TweenOne from "rc-tween-one";
// import "rc-banner-anim/assets/index.css";
// import "./TopBanner.css";

// import HNY from "./HNY.png";
// // import Eid from "./eid.png";      // example
// // import PakistanDay from "./pakday.png"; // example

// const BgElement = Element.BgElement;

// const TopBanner = () => {
//   const banners = [
//     {
//       img: HNY,
//       date: "2026-01-01",
//     },
//     // {
//     //   img: Eid,
//     //   date: "2026-03-31",
//     // },
//     // {
//     //   img: PakistanDay,
//     //   date: "2026-03-23",
//     // },
//   ];

//   const today = new Date().toISOString().split("T")[0];

//   const todayBanners = banners.filter((item) => item.date === today);

//   if (todayBanners.length === 0) return null;

//   return (
//     <div className="topStickyBannerWrapper">
//       <BannerAnim autoPlay prefixCls="customTopBanner">
//         {todayBanners.map((item, index) => (
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



// import React, { useEffect, useState } from "react";
// import "./TopBanner.css";

// const TopBanner = () => {
//   const [bannerText, setBannerText] = useState("");

//   // 🔹 Special events list (date-based)
//   const specialEvents = [
//     {
//       date: "01-01",
//       text: "🎉 Happy New Year 🎉",
//     },
//     {
//       date: "14-08",
//       text: "🇵🇰 Happy Independence Day 🇵🇰",
//     },
//     {
//       date: "25-12",
//       text: "🎂 Quaid-e-Azam Day 🎂",
//     },
//   ];

//   useEffect(() => {
//     const now = new Date();
//     const hours = now.getHours();
//     const today = `${String(now.getDate()).padStart(2, "0")}-${String(
//       now.getMonth() + 1
//     ).padStart(2, "0")}`;

//     // 🔹 Check if today is a special event
//     const specialEvent = specialEvents.find(
//       (event) => event.date === today
//     );

//     if (specialEvent) {
//       // ✅ Show special event banner whole day
//       setBannerText(specialEvent.text);
//     } else {
//       // ✅ Time-based greetings
//       if (hours >= 5 && hours < 12) {
//         setBannerText("🌅 Good Morning");
//       } else if (hours >= 12 && hours < 17) {
//         setBannerText("☀️ Good Afternoon");
//       } else if (hours >= 17 && hours < 21) {
//         setBannerText("🌆 Good Evening");
//       } else {
//         setBannerText("🌙 Good Night");
//       }
//     }
//   }, []);

//   return (
//     <div className="topStickyBannerWrapper">
//       <div className="topStickyBanner">
//         <p>{bannerText}</p>
//       </div>
//     </div>
//   );
// };

// export default TopBanner;




// import React, { useEffect, useState } from "react";
// import "./TopBanner.css";

// const TopBanner = () => {
//   const [banner, setBanner] = useState({
//     text: "",
//     bgClass: "",
//   });

//   // 🔹 Special Events (Fully Dynamic)
//   const specialEvents = [
//     {
//       date: "01-01",
//       text: "🎉 Happy New Year 🎉",
//       bgClass: "banner-newyear",
//     },
//     {
//       date: "14-08",
//       text: "🇵🇰 Happy Independence Day 🇵🇰",
//       bgClass: "banner-pakistan",
//     },
//     {
//       date: "25-12",
//       text: "🎂 Quaid-e-Azam Day 🎂",
//       bgClass: "banner-green",
//     },
//   ];

//   useEffect(() => {
//     const now = new Date();
//     const hours = now.getHours();
//     const today = `${String(now.getDate()).padStart(2, "0")}-${String(
//       now.getMonth() + 1
//     ).padStart(2, "0")}`;

//     // 🔎 Check special event
//     const event = specialEvents.find((e) => e.date === today);

//     if (event) {
//       setBanner({
//         text: event.text,
//         bgClass: event.bgClass,
//       });
//     } else {
//       // ⏰ Time based greeting
//       if (hours >= 5 && hours < 12) {
//         setBanner({ text: "Good Morning", bgClass: "banner-morning" });
//       } else if (hours >= 12 && hours < 17) {
//         setBanner({ text: "Good Afternoon", bgClass: "banner-afternoon" });
//       } else if (hours >= 17 && hours < 21) {
//         setBanner({ text: "Good Evening", bgClass: "banner-evening" });
//       } else {
//         setBanner({ text: "Good Night", bgClass: "banner-night" });
//       }
//     }
//   }, []);

//   return (
//     <div className={`topStickyBannerWrapper ${banner.bgClass}`}>
//       <div className="topStickyBanner">
//         <p>{banner.text}</p>
//       </div>
//     </div>
//   );
// };

// export default TopBanner;



import React, { useEffect, useState } from "react";
import {
  FiSun,
  FiSunrise,
  FiSunset,
  FiMoon,
  FiStar,
} from "react-icons/fi";
import "./TopBanner.css";

const TopBanner = () => {
  const [banner, setBanner] = useState({
    text: "",
    icon: null,
    bgClass: "",
  });

  const specialEvents = [
    {
      date: "01-01",
      text: "Happy New Year",
      icon: <FiStar />,
      bgClass: "banner-newyear",
    },
    {
      date: "14-08",
      text: "Independence Day",
      icon: <FiStar />,
      bgClass: "banner-pakistan",
    },
    {
      date: "25-12",
      text: "Quaid-e-Azam Day",
      icon: <FiStar />,
      bgClass: "banner-green",
    },
  ];

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const today = `${String(now.getDate()).padStart(2, "0")}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    const event = specialEvents.find((e) => e.date === today);

    if (event) {
      setBanner({
        text: event.text,
        icon: event.icon,
        bgClass: event.bgClass,
      });
    } else {

      if (hours >= 5 && hours < 12) {
        setBanner({
          text: "Good Morning",
          icon: <FiSunrise />,
          bgClass: "banner-morning",
        });
      } else if (hours >= 12 && hours < 17) {
        setBanner({
          text: "Good Afternoon",
          icon: <FiSun />,
          bgClass: "banner-afternoon",
        });
      } else if (hours >= 17 && hours < 21) {
        setBanner({
          text: "Good Evening",
          icon: <FiSunset />,
          bgClass: "banner-evening",
        });
      } else {
        setBanner({
          text: "Good Night",
          icon: <FiMoon />,
          bgClass: "banner-night",
        });
      }
    }
  }, []);

  return (
    <div className={`topStickyBannerWrapper ${banner.bgClass}`}>
      <div className="topStickyBanner">
        <span className="bannerIcon">{banner.icon}</span>
        <span className="bannerText">{banner.text}</span>
      </div>
    </div>
  );
};

export default TopBanner;
