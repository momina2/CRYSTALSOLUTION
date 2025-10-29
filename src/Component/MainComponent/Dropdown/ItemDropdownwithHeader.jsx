import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import { Clear, ArrowDropDown } from "@mui/icons-material";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
import "./Dropdown.css";

const filterOptions = createFilterOptions();

const ItemDropdownwithHeader = forwardRef(
  (
    {
      value,
      onChange,
      fetchUrl,
      valueKey,
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
    const [selectedOption, setSelectedOption] = useState(null);
    const [enterPressCount, setEnterPressCount] = useState(0);
    const [searchText, setSearchText] = useState(""); // New state for search text

    const fetchData = (searchQuery = "IZONE") => { // Default "IZONE" set kiya
      const data = { 
        code: organisation.code,
        FLocCod: "001",
        FSchTxt: searchQuery // Search query parameter add kiya
      };
      const formData = new URLSearchParams(data).toString();

      axios
        .post(fetchUrl, formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          const apiData = response.data;
          const formattedOptions = apiData.map((option) => ({
            value: option[valueKey],
            label: option[labelKey],
          }));

          // Sort options alphanumerically (A-Z)
          formattedOptions.sort((a, b) => a.label.localeCompare(b.label));

          setOptions(formattedOptions);

          const matchingOption = formattedOptions.find(
            (option) => option.value === value
          );
          if (matchingOption) setSelectedOption(matchingOption);
        })
        .catch((error) => console.error("Error:", error));
    };

    // Initial fetch with "IZONE"
    useEffect(() => {
      fetchData("IZONE");
    }, [fetchUrl, valueKey, labelKey, value, user?.tusrid]);

    useImperativeHandle(ref, () => ({
      focus: () => selectRef?.current?.focus(),
      reset: () => {
        setSelectedOption(null);
        onChange(null);
        setSearchText(""); // Search text bhi reset karo
        fetchData("IZONE"); // Reset pe phir se "IZONE" data fetch karo
      },
    }));

    const handleSelectChange = (event, newValue) => {
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

    // New function for handling input change
    const handleInputChange = (event, newInputValue) => {
      setSearchText(newInputValue);
      
      // Agar input value hai toh API call karo with search text
      if (newInputValue && newInputValue.length > 0) {
        // Debounce implementation for better performance
        clearTimeout(handleInputChange.timeout);
        handleInputChange.timeout = setTimeout(() => {
          fetchData(newInputValue);
        }, 300);
      } else {
        // Agar kuch type nahi kiya toh phir se "IZONE" data show karo
        clearTimeout(handleInputChange.timeout);
        fetchData("IZONE");
      }
    };

    const handleSaveReference = async (customOption) => {
      if (!customOption.label?.trim()) {
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
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.error === 200) {
          fetchData(searchText || "IZONE"); // Save ke baad current search text ke sath data fetch karo
        } else {
          console.error("API Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    const customStyles = {
      control: {
        backgroundColor: getcolor,
        color: fontcolor,
        height: "25px",
        width: width || "100%",
        fontSize: "11px",
        borderRadius: "0px",
        border:
          fontcolor === "black" ? "1px solid #F5F5F5" : "1px solid #F5F5F5",
        boxShadow: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          border: "none",
        },
      },
      menu: {
        backgroundColor: getcolor,
        color: fontcolor,
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        maxHeight: "200px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      },
      option: {
        fontSize: "11px",
        backgroundColor: getcolor,
        color: fontcolor,
        padding: "8px 8px",
        "&:hover": {
          backgroundColor: getcolor,
        },
      },
      ...styles,
    };

    const customFilterOptions = (options, params) => {
      const { inputValue } = params;
      
      // Client-side filtering hataya hai kyunki ab server-side filtering use kar rahe hain
      // Sirf "Add" option ke liye check karo
      if (
        inputValue !== "" &&
        !options.some((option) => option.label === inputValue)
      ) {
        return [
          ...options,
          {
            inputValue,
            label: `Add "${inputValue}"`,
          },
        ];
      }

      return options;
    };

    return (
      <Autocomplete
        className="form-control-field"
        value={selectedOption}
        onChange={handleSelectChange}
        onInputChange={handleInputChange} // Input change handler add kiya
        options={options}
        filterOptions={customFilterOptions}
        getOptionLabel={(option) => option.label || ""}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder || "Select an option"}
            inputRef={selectRef}
            autoComplete="off"
            InputProps={{
              ...params.InputProps,
              style: customStyles.control,
              endAdornment: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {isClearable && selectedOption && (
                    <Clear
                      onClick={() => handleSelectChange(null, null)}
                      style={{
                        cursor: "pointer",
                        color: fontcolor,
                        marginRight: "4px",
                        fontSize: "12px",
                      }}
                    />
                  )}
                  <ArrowDropDown
                    style={{ color: fontcolor, marginRight: "-50px" }}
                  />
                </div>
              ),
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (enterPressCount === 0) setEnterPressCount(1);
                else if (enterPressCount === 1) {
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
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              ...customStyles.option,
              backgroundColor: selected
                ? "black"
                : customStyles.option.backgroundColor,
              color: selected ? "white" : customStyles.option.color,
            }}
          >
            {option.label}
          </li>
        )}
        ListboxProps={{ style: customStyles.menu }}
      />
    );
  }
);

ItemDropdownwithHeader.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
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

export default ItemDropdownwithHeader;