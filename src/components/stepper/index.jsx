import * as React from 'react';
import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function GenericStepper({ activeStep, steps, components, ...otherProps }) {
  return (
    <MuiStepper activeStep={activeStep} connector={<ArrowForwardIosIcon />} {...otherProps}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
      {components[activeStep]}
    </MuiStepper>
  );
}

GenericStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  components: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default GenericStepper;
