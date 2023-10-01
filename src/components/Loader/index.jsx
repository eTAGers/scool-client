import { CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function Loader(props) {
  return (
    <Dialog fullScreen={false} open aria-labelledby="responsive-dialog-title">
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <CircularProgress color="secondary" sx={{ mb: 2 }} />
        <Typography variant="overline" sx={{ fontStyle: 'italic' }} display="block" gutterBottom>
          {props.loadingMessage}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

Loader.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
};

export default Loader;
