/* eslint-disable react/jsx-no-duplicate-props */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import "./Dropdownwithbutton.css";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
const filterOptions = createFilterOptions();

const CustomDropdownwithbutton = forwardRef(
  (
    {
      value,
      onChange,
      fetchUrl,
      valueKey,
      data,
      labelKey,
      placeholder,
      isClearable = false,
      styles = {},
      onKeyDown,
      width,
      postapi,
      postfisrt,
      postsecond,
      postthird,
      postfouth,
      postfifth,
      selectRef,
      className,
    },
    ref
  ) => {
    const user = getUserData();
    const organisation = getOrganisationData();
    const [options, setOptions] = useState([]);
    const { getcolor, fontcolor } = useTheme();
    const [selectedOption, setSelectedOption] = useState(
      "Select and Search option"
    );
    const [enterPressCount, setEnterPressCount] = useState(0);

    function fetchData() {
      console.log("data", data);
      const formattedOptions = data.map((option) => ({
        value: option[valueKey],
        label: option[labelKey],
      }));

      setOptions(formattedOptions);

      const matchingOption = formattedOptions.find(
        (option) => option.value === value
      );
      if (matchingOption) {
        setSelectedOption(matchingOption);
      }
    }

    useEffect(() => {
      fetchData();
    }, [fetchUrl, valueKey, labelKey, value, user?.tusrid]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (selectRef?.current) {
          selectRef.current.focus();
        }
      },
      reset: () => {
        setSelectedOption(null);
        onChange(null);
      },
    }));

    const handleSelectChange = (event, newValue) => {
      fetchData();
      setEnterPressCount(0);
      if (newValue) {
        if (newValue.inputValue) {
          handleSaveReference({
            label: newValue.inputValue,
            value: newValue.inputValue,
          });
        } else {
          setSelectedOption(newValue);
          onChange(newValue);
        }
      } else {
        setSelectedOption(null);
        onChange(null);
      }
    };

    const handleSaveReference = async (customOption) => {
      if (!customOption.label || customOption.label.trim() === "") {
        alert("Please provide a valid option.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append(postfisrt, "999");
        formData.append(postsecond, customOption.label);
        formData.append(postthird, "A");
        formData.append(postfouth, user.tusrid);
        formData.append(postfifth, organisation.code);

        const response = await axios.post(postapi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.error === 200) {
          await fetchData();
        } else {
          console.error("API Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    const customStyles = {
      menu: {
        fontSize: "12px",
        maxHeight: "150px", // Adjust max height to show only 5 items
        overflowY: "auto", // Enable scrolling
      },
      control: {
        backgroundColor: getcolor,
        color: fontcolor,
        height: "24px",
        marginLeft: "-10px",
        paddingLeft: "10px",
        alignItems: "center",
        width: width,
        fontSize: "11px",
        marginBottom: "2px",
        borderRadius: 0,
        border: className ? "1px solid red" : "1px solid #999999",
        transition: "border-color 0.15s ease-in-out",
        "&:hover": {
          borderColor: "rgb(79, 79, 255)",
        },
      },
      input: {
        backgroundColor: getcolor,
        color: fontcolor,
        height: "100%",
        fontSize: "11px",
        padding: "0px",
        alignItems: "center",
        borderRadius: "4px",
        border: "1px solid #cccccc",
        "&:hover": {
          borderColor: "rgb(79, 79, 255)",
        },
      },
      dropdownIndicator: {
        padding: "5px",
      },
      ...styles,
    };

    return (
      <Autocomplete
        value={selectedOption}
        onFocus={() => {
          fetchData();
        }}
        style={{ backgroundColor: getcolor, color: fontcolor }}
        onChange={handleSelectChange}
        filterOptions={(options, params) => {
          const filtered = filterOptions(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.label
          );

          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              label: `Add "${inputValue}"`,
            });
          }

          return filtered; // Return all filtered options
        }}
        // onFocus={(e) => e.target.select()}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={options}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          if (option.inputValue) return option.inputValue;
          return option.label;
        }}
        renderOption={(props, option) => (
          <li
            {...props}
            style={{
              ...customStyles.menu,
              backgroundColor: getcolor,
              color: fontcolor,
            }}
          >
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            style={{ backgroundColor: getcolor, color: fontcolor }}
            {...params}
            inputRef={selectRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (enterPressCount === 0) {
                  setEnterPressCount(1);
                } else if (enterPressCount === 1) {
                  onKeyDown(e);
                  setEnterPressCount(0);
                }
              }
            }}
            onChange={(e) => {
              const uppercaseValue = e.target.value.toUpperCase();
              e.target.value = uppercaseValue;
              params.inputProps.onChange(e);
            }}
            InputProps={{
              ...params.InputProps,
              style: customStyles.control,
            }}
          />
        )}
        ListboxProps={{
          style: {
            maxHeight: "160px",
            overflowY: "auto", 
          },
        }}
        // renderOption={(props, option) => (
        //   <li
        //     {...props}
        //     style={{
        //       ...customStyles.menu,
        //       backgroundColor: getcolor,
        //       color: fontcolor,
        //     }}
        //   >
        //     {option.label}
        //   </li>
        // )}
      />
    );
  }
);

CustomDropdownwithbutton.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  data: PropTypes.string,

  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
  styles: PropTypes.object,
  onKeyDown: PropTypes.func,
  width: PropTypes.string,
  postapi: PropTypes.string,
  postfisrt: PropTypes.string,
  postsecond: PropTypes.string,
  postthird: PropTypes.string,
  postfouth: PropTypes.string,
  selectRef: PropTypes.object,
  className: PropTypes.string,
};

export default CustomDropdownwithbutton;
