import React from 'react';
import { TextField, Select, Autocomplete, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import PropTypes from 'prop-types';

// Text Field
const Textfield = React.forwardRef(({ label, error, required, helperText, ...props }, ref) => (
  <TextField
    autoComplete="off"
    inputRef={ref}
    label={label}
    inputMode={props.inputMode}
    error={error}
    required={required}
    helperText={helperText}
    {...props}
  />
));

Textfield.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  inputMode: PropTypes.string,
  helperText: PropTypes.string,
};

// Select
const SelectField = React.forwardRef(({ label, error, required, helperText, options, ...props }, ref) => (
  <Select inputRef={ref} label={label} error={error} required={required} helperText={helperText} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
));

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Autocomplete
const AutocompleteField = React.forwardRef(({ label, error, required, helperText, options, ...props }, ref) => (
  <Autocomplete
    inputRef={ref}
    options={options}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField {...params} label={label} error={error} required={required} helperText={helperText} />
    )}
    {...props}
  />
));

AutocompleteField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Checkbox
const CheckboxField = React.forwardRef(({ label, error, required, helperText, ...props }, ref) => (
  <Checkbox inputRef={ref} label={label} error={error} required={required} helperText={helperText} {...props} />
));

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
};

// Radio Group
const RadioGroupField = React.forwardRef(({ label, error, required, helperText, options, ...props }, ref) => (
  <RadioGroup
    inputRef={ref}
    aria-label={label}
    name={label}
    error={error}
    required={required}
    helperText={helperText}
    {...props}
  >
    {options.map((option) => (
      <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
    ))}
  </RadioGroup>
));

RadioGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export { Textfield, SelectField, AutocompleteField, CheckboxField, RadioGroupField };
