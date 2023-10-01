import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormLabel, MESSAGE } from '../../../utils/message';
import { Textfield } from '../../../utils/formLib';
import { useSnackbar } from '../../../utils/CommonSnack';
import { createStore } from '../../../slices/auth';
import { getUserDetails } from '../../../utils/utility';

export default function StoreForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      storeName: '',
      storeCategory: '',
    },
  });

  const createStoreApi = (data) => {
    dispatch(createStore(data))
      .unwrap()
      .then((data) => {
        if (data.status === 200) {
          const local = { ...getUserDetails(), ...data.data.resp[0] };
          localStorage.setItem('userDetails', JSON.stringify(local));
          showSnackbar(data.message, 'success');
          navigate('/dashboard/app');
        } else {
          showSnackbar(data.message, 'error');
        }
      })
      .catch((e) => {
        console.log(e);
        showSnackbar(e.message, 'error');
      });
  };
  const onSubmit = (data) => {
    createStoreApi(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="storeName"
          control={control}
          rules={{
            required: MESSAGE.required,
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.businessName}
              error={Boolean(errors.storeName)}
              helperText={errors.storeName?.message}
              required
            />
          )}
        />
        <Controller
          name="storeCategory"
          control={control}
          rules={{ required: MESSAGE.required }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.businessType}
              error={Boolean(errors.storeCategory)}
              helperText={errors.storeCategory?.message}
              required
            />
          )}
        />
      </Stack>

      <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
        Create Store
      </LoadingButton>
    </form>
  );
}
