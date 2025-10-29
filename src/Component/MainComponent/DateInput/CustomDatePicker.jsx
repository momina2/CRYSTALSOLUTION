import React, { useState, useRef, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = forwardRef((props, ref) => {
  const {
    selectedDate,
    onChange,
    disabled = false,
    onKeyDown,
    dateFormat = "dd-MM-yyyy",
    placeholder = "Select date",
    className = "",
    wrapperClassName = "",
    style = {},
    popperModifiers = [],
    id,
    onFocus,
    onBlur
  } = props;

  const [internalDate, setInternalDate] = useState(selectedDate || new Date());
  
  // Update internal date when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setInternalDate(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (date) {
      setInternalDate(date);
      if (onChange) {
        onChange(date);
      }
    }
  };

  const formatDateOnChangeRaw = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3");
  };

  const handleChangeRaw = (e) => {
    if (!e || !e.target || !e.target.value) return;
    
    const formattedValue = formatDateOnChangeRaw(e.target.value);
    e.target.value = formattedValue;
  };

  return (
    <DatePicker
      selected={internalDate}
      onChange={handleDateChange}
      onChangeRaw={handleChangeRaw}
      disabled={disabled}
      dateFormat={dateFormat}
      className={className}
      wrapperClassName={wrapperClassName}
      popperModifiers={popperModifiers}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      customInput={
        <input
          ref={ref}
          id={id}
          placeholder={placeholder}
          style={style}
          readOnly
        />
      }
    />
  );
});

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;