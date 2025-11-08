



import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FaFile,
  FaExchangeAlt,
  FaChartBar,
  FaTools,
  FaHome,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetActiveUserLocation,
  fetchGetActiveUserYear,
  fetchGetCapacityMaintenance,
  fetchGetCategoryMaintenance,
  fetchGetCompanyMaintenance,
  fetchGetCrystalCustomer,
  fetchGetCrystalMenu,
  fetchGetItemMaintenance,
  fetchGetTypeMaintenance,
  fetchGetUser,
  fetchMenu,
  fetchNewCapacityMaintenance,
  fetchNewCategoryMaintenance,
  fetchNewCompanyMaintenance,
  fetchNewTypeMaintenance,
} from "../../Redux/action";
import { getUserData, getOrganisationData, isLoggedIn } from "../../Auth";
import imagebackground from "../../../image/homeapp.jpg";
import man from "../../../image/man.png";
import { useTheme } from "../../../ThemeContext";

const SOFT_FONT_FAMILY = "'Inter', 'Poppins', sans-serif";
const ACTIVE_COLOR = '#1976d2';


const SideBar1 = () => {
  const dispatch = useDispatch();
  const user = getUserData();
  const organisation = getOrganisationData();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.item);

  const [menuData, setMenuData] = useState([]);
  const [openMenu, setOpenMenu] = useState({});
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [hovered, setHovered] = useState(false);
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    fontcolor,
    getrowhover,
    headercolor,
    getfontstyle,
  } = useTheme();

  const SLIM_WIDTH = 72;
  const EXPANDED_WIDTH = 280;
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setMenuData([]);
    dispatch(
      fetchGetActiveUserYear(
        user && user.tusrid,
        organisation && organisation.code
      )
    );
    dispatch(
      fetchGetActiveUserLocation(
        user && user.tusrid,
        organisation && organisation.code
      )
    );
    dispatch(fetchGetUser(organisation && organisation.code));
    dispatch(fetchMenu(user && user.tusrid, organisation && organisation.code));
    dispatch(fetchGetCrystalCustomer());
    dispatch(fetchGetCrystalMenu());
    dispatch(fetchGetCompanyMaintenance(organisation.code));
    dispatch(fetchNewCompanyMaintenance(organisation.code));
    dispatch(fetchGetCategoryMaintenance(organisation.code));
    dispatch(fetchNewCategoryMaintenance(organisation.code));
    dispatch(fetchGetCapacityMaintenance(organisation.code));
    dispatch(fetchNewCapacityMaintenance(organisation.code));
    dispatch(fetchGetTypeMaintenance(organisation.code));
    dispatch(fetchNewTypeMaintenance(organisation.code));
    dispatch(fetchGetItemMaintenance(organisation.code));
  }, [dispatch, user.tusrid, organisation.code]);

  useEffect(() => {
    const filteredData = data.filter((item) => item.tusrpem !== "S");
    if (Array.isArray(data)) {
      setMenuData(filteredData);
    }
  }, [data]);

  // =================
  // =================
  const handleMenuClick = (menuKey) => {
    setOpenMenu((prevOpenMenu) => {
      const isAlreadyOpen = prevOpenMenu[menuKey];
      if (isAlreadyOpen) {
        return {
          [menuKey]: false,
        };
      } else {
        return {
          [menuKey]: true,
        };
      }
    });
    setOpenSubMenu({});
  };

  // =================
  //handleSubMenuClick
  // =================
  const handleSubMenuClick = (topLevelKey, subMenuKey) => {
    const key = `${topLevelKey}-${subMenuKey}`;

    setOpenSubMenu((prevOpenSubMenu) => {
      const isAlreadyOpen = prevOpenSubMenu[key];
      if (isAlreadyOpen) {
        return {
          [key]: false,
        };
      } else {
        const newOpenSubMenu = {};
        Object.keys(prevOpenSubMenu).forEach(prevKey => {
            const [prevTopLevelKey] = prevKey.split('-');
            if (prevTopLevelKey === topLevelKey) {
                newOpenSubMenu[prevKey] = false;
            } else {
                newOpenSubMenu[prevKey] = prevOpenSubMenu[prevKey];
            }
        });
        newOpenSubMenu[key] = true;

        return newOpenSubMenu;
      }
    });
  };

  const hierarchicalMenuData = {};
  menuData.forEach((item) => {
    const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");
    if (!hierarchicalMenuData[topLevel]) {
      hierarchicalMenuData[topLevel] = { label: item.tmendsc, items: {} };
    }
    if (middleLevel !== '000' && subLevel === '000') {
        if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
            hierarchicalMenuData[topLevel].items[middleLevel] = [];
        }
        hierarchicalMenuData[topLevel].items[middleLevel].push({
            label: item.tmendsc,
            to: item.tmenurl,
            disabledd: item.tusrpem === "N",
        });
    } else if (middleLevel === '000' && subLevel === '000') {
        if (!hierarchicalMenuData[topLevel].items['000']) {
             hierarchicalMenuData[topLevel].items['000'] = [];
        }
          hierarchicalMenuData[topLevel].items['000'].push({
            label: item.tmendsc,
            to: item.tmenurl,
            disabledd: item.tusrpem === "N",
        });

    } else if (middleLevel !== '000' && subLevel !== '000') {
        if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
             hierarchicalMenuData[topLevel].items[middleLevel] = [];
        }
        hierarchicalMenuData[topLevel].items[middleLevel].push({
            label: item.tmendsc,
            to: item.tmenurl,
            disabledd: item.tusrpem === "N",
        });
    }
  });
  const linespacing = "0.2px";

  const truncateLabel = (label, maxLength) => {
    return label.length > maxLength
      ? `${label.substring(0, maxLength)}...`
      : label;
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", getcolor);
    document.documentElement.style.setProperty("--font-color", fontcolor);
    document.documentElement.style.setProperty(
      "--headercolor-color",
      headercolor
    );
  }, [getcolor, fontcolor, headercolor]);

  // =============
  // Sub-Sub-Items
  // =============
  const renderSubSubMenu = (subItems) => {
    const filteredSubItems = subItems.slice(1);

    return filteredSubItems.map(
      (subItem, index) => (
        <ListItem
          button
          key={index}
          onClick={() => {
            if (!subItem.disabledd) {
              navigate(subItem.to);
            }
          }}
          disabled={subItem.disabledd}
          className={`pl-20 h-7 rounded-md my-[0.05rem] transition-colors duration-200 
          ${getcolor === 'white' ? 'hover:bg-gray-100' : 'hover:bg-white/5'} 
          ${subItem.disabledd ? 'opacity-50' : ''}`}
          sx={{
            pl: 11.5, // 
            height: "28px", // 
            my: 0, // 
            borderBottom: (index < filteredSubItems.length - 1)
              ? `1px solid ${getcolor === 'white' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.15)'}`
              : 'none',
          }}
        >
          <Typography
            className={`font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-normal`}
            sx={{
              fontSize: '12px',
              color: subItem.disabledd ? "gray" : fontcolor,
              fontFamily: SOFT_FONT_FAMILY,
              letterSpacing: linespacing,
            }}
          >
            {subItem.label}
          </Typography>
        </ListItem>
      )
    );
  };

  // =================
  // Middle-Level Items
  // =================
  const renderSubMenu = (topLevel, middleLevelItems) => {
    const sortedMiddleLevelKeys = Object.keys(middleLevelItems)
      .filter((middleLevel) => middleLevel !== "000")
      .sort();

    return sortedMiddleLevelKeys.map((middleLevel) => {
      const subItems = middleLevelItems[middleLevel];
      const hasSubSubMenu = subItems.length > 1;
      const key = `${topLevel}-${middleLevel}`;
      const isActive = openSubMenu[key];

      const activeBg = getcolor === 'white' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.2)';
      const linkItem = subItems[0];

      return (
        <React.Fragment key={middleLevel}>
          {isSidebarVisible && (
            <ListItem
              button
              onClick={() => {
                if (linkItem.disabledd) return;
                hasSubSubMenu
                  ? handleSubMenuClick(topLevel, middleLevel)
                  : linkItem.to && navigate(linkItem.to);
              }}
              className={`pl-10 h-9 rounded-md mb-0= mx-0.5 transition-colors duration-200
                ${linkItem.disabledd ? 'opacity-50' : ''}`}
              sx={{
                pl: 8.5, // 
                height: "34px",
                backgroundColor: isActive ? activeBg : 'transparent',
                "&:hover": {
                  backgroundColor: getrowhover,
                  "& .MuiTypography-root, & i": {
                    color: "white",
                  },
                },
              }}
            >
              <Typography
                className={`leading-snug flex-grow`}
                sx={{
                  fontSize: '13px',
                  letterSpacing: linespacing,
                  fontWeight: isActive ? '600' : '500',
                  color: linkItem.disabledd ? "gray" : fontcolor,
                  fontFamily: SOFT_FONT_FAMILY,
                }}
              >
                {linkItem.label}
              </Typography>
              {hasSubSubMenu && (
                <Box sx={{ ml: "auto", mr: "0px", color: fontcolor }}>
                  <i
                    className={
                      isActive
                        ? "fas fa-chevron-up"
                        : "fas fa-chevron-right"
                    }
                    style={{ fontSize: "10px" }}
                  />
                </Box>
              )}
            </ListItem>
          )}

          {/* Sub-Sub-Menu */}
          {hasSubSubMenu && (
            <Collapse
              in={isActive}
              timeout="auto"
              unmountOnExit
              className={`rounded-lg mx-1 mb-1 p-0.5`}
              sx={{
                backgroundColor: getcolor === 'white' ? '#fafafa' : 'rgba(0,0,0,0.1)',
              }}
            >
              <List component="div" disablePadding sx={{ py: 0 }}>
                {renderSubSubMenu(subItems)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };


  return (
    <Box className="flex">
      <Drawer
        sx={{
          width: isSidebarVisible ? EXPANDED_WIDTH : SLIM_WIDTH,
          flexShrink: 0,
          transition: "width 0.3s ease-in-out",
          "& .MuiDrawer-paper": {
            marginTop: "55px",
            width: isSidebarVisible ? EXPANDED_WIDTH : SLIM_WIDTH,
            backgroundColor: getcolor,
            borderRight: "none",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: "3px",
            color: fontcolor,
            maxHeight: "calc(100vh - 71px)",
            left: "2px",
            height: "calc(100vh - 71px)",
            transition: "width 0.3s ease-in-out, box-shadow 0.3s, background-color 0.3s",
            padding: isSidebarVisible ? '0' : '0 4px',
          },
        }}
        onMouseEnter={() => {
          if (!isSidebarVisible) {
            toggleSidebar(true);
            setHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (hovered) {
            toggleSidebar(false);
            setHovered(false);
          }
        }}
        variant="permanent"
        anchor="left"
        open={isSidebarVisible}
      >

        {/* ================== */}
        {/* User Profile Area
        {/* ================== */}
        <Box
            className="p-2 border-b"
            sx={{
                borderColor: getcolor === 'white' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.1)',
            }}
        >
            <Tooltip title={!isSidebarVisible ? user.name : ""} placement="right">
                <ListItem
                    button
                    className="h-[50px] rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                    sx={{
                        px: isSidebarVisible ? 1.5 : 1,
                        justifyContent: isSidebarVisible ? 'flex-start' : 'center',
                    }}
                >
                    <ListItemIcon sx={{ color: fontcolor, minWidth: isSidebarVisible ? '36px' : '36px', justifyContent: 'center' }}>
                        <Avatar
                            alt={user.name}
                            src={man}
                            sx={{ width: isSidebarVisible ? 32 : 36, height: isSidebarVisible ? 32 : 36 }}
                        />
                    </ListItemIcon>
                    {isSidebarVisible && (
                        <ListItemText
                            primary={truncateLabel(user.name || "User Profile", 20)}
                            secondary={user.tusrid || "ID"}
                            sx={{
                                marginLeft: "4px",
                                "& .MuiListItemText-primary": {
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: SOFT_FONT_FAMILY,
                                    color: fontcolor,
                                },
                                "& .MuiListItemText-secondary": {
                                    fontSize: '11px',
                                    fontFamily: SOFT_FONT_FAMILY,
                                    color: 'text.secondary',
                                },
                            }}
                        />
                    )}
                </ListItem>
            </Tooltip>
        </Box>

        <List
          className="custom-sidebar-file overflow-y-auto overflow-x-hidden rounded-xl flex-grow"
          style={{ padding: "8px 4px" }}
        >
          {Object.keys(hierarchicalMenuData)
            .filter((topLevel) => topLevel !== "000")
            .map((topLevel) => {
              const isActive = openMenu[topLevel];

              const isOnlyTopLevelLink = Object.keys(hierarchicalMenuData[topLevel].items).length === 0;

              const primaryLink = hierarchicalMenuData[topLevel].items['000']?.[0];
              const linkToUse = primaryLink || null;

              return (
              <React.Fragment key={topLevel}>
                <Tooltip
                  title={!isSidebarVisible ? hierarchicalMenuData[topLevel].label : ""}
                  placement="right"
                >
                <ListItem
                  button
                  onClick={() => {
                    if (linkToUse && isOnlyTopLevelLink) {
                        navigate(linkToUse.to);
                    } else {
                        handleMenuClick(topLevel);
                    }
                  }}
                  className={`rounded-lg mb-1 h-10 transition-all duration-300`}
                  sx={{
                    px: isSidebarVisible ? 1.5 : 1,
                    height: "40px",
                    justifyContent: isSidebarVisible ? 'flex-start' : 'center',
                    backgroundColor: isActive ? ACTIVE_COLOR : 'transparent',

                    "&:hover": {
                      backgroundColor: isActive ? ACTIVE_COLOR : getrowhover,
                      "& .MuiListItemIcon-root, & .MuiTypography-root, & svg": {
                        color: "white",
                      },
                      borderRadius: "8px",
                    },
                    borderRadius: "8px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'white' : fontcolor,
                      minWidth: isSidebarVisible ? '36px' : '36px',
                      justifyContent: 'center',
                    }}
                  >
                    {hierarchicalMenuData[topLevel].label.includes("File") && (
                      <FaFile size={18} />
                    )}
                    {hierarchicalMenuData[topLevel].label.includes(
                      "Transaction"
                    ) && <FaExchangeAlt size={18} />}
                    {hierarchicalMenuData[topLevel].label.includes(
                      "Report"
                    ) && <FaChartBar size={18} />}
                    {hierarchicalMenuData[topLevel].label.includes(
                      "Utilities"
                    ) && <FaTools size={18} />}
                    {hierarchicalMenuData[topLevel].label.includes(
                      "Dashboard"
                    ) && <FaHome size={18} />}
                  </ListItemIcon>

                  {isSidebarVisible && (
                    <ListItemText
                      primary={hierarchicalMenuData[topLevel].label}
                      sx={{
                        marginLeft: "4px",
                        "& .MuiTypography-root": {
                          fontSize: '14px',
                          fontFamily: SOFT_FONT_FAMILY,
                          letterSpacing: linespacing,
                          fontWeight: isActive ? '600' : '500',
                          color: isActive ? 'white' : fontcolor,
                        },
                      }}
                    />
                  )}

                  {isSidebarVisible && !isOnlyTopLevelLink && (
                    <Box sx={{ ml: "auto" }}>
                      {isActive ? (
                        <FaChevronUp size={10} color='white' />
                      ) : (
                        <FaChevronDown size={10} style={{ color: fontcolor }} />
                      )}
                    </Box>
                  )}
                </ListItem>
                </Tooltip>

                <Collapse
                  in={isActive}
                  timeout="auto"
                  unmountOnExit
                  className="mx-0.5"
                  sx={{
                    padding: "4px 0",
                    backgroundColor: getcolor === 'white' ? '#f5f5f5' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: `1px solid ${getcolor === 'white' ? '#ddd' : 'rgba(255, 255, 255, 0.1)'}`,
                    margin: '8px 0 !important', //
                    boxShadow: getcolor === 'white' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <List component="div" disablePadding sx={{ py: 0.5 }}>
                    {renderSubMenu(
                      topLevel,
                      hierarchicalMenuData[topLevel].items
                    )}
                  </List>
                </Collapse>
              </React.Fragment>
            )})}
        </List>

        <Box
            className="p-2"
        >
        </Box>
      </Drawer>
    </Box>
  );
};
export default SideBar1;
