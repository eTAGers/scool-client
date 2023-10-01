import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FormLabel, MESSAGE } from '../../../utils/message';
import { Textfield } from '../../../utils/formLib';
import { useSnackbar } from '../../../utils/CommonSnack';
import Iconify from '../../../components/iconify';
import { signUp } from '../../../slices/auth';

export default function SignupForm() {
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
      mobile: '',
      userName: '',
      password: '',
      email: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const signUpApi = (data) => {
    dispatch(signUp(data))
      .unwrap()
      .then((data) => {
        if (data.status === 200) {
          showSnackbar(data.message, 'success');
          navigate('/login');
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
    signUpApi(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: MESSAGE.required,
            pattern: {
              value: /^\S+@\S+$/i,
              message: MESSAGE.invalidEmail,
            },
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.email}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              required
            />
          )}
        />
        <Controller
          name="userName"
          control={control}
          rules={{ required: MESSAGE.required }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.userName}
              error={Boolean(errors.userName)}
              helperText={errors.userName?.message}
              required
            />
          )}
        />
        <Controller
          name="mobile"
          control={control}
          rules={{
            required: MESSAGE.required,
            pattern: {
              value: /^[0-9]*$/,
              message: MESSAGE.invalidMobile,
            },
            validate: (value) => {
              if (value.length !== 10) {
                return 'Mobile number must be 10 digits long';
              }
              return true;
            },
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.mobile}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile?.message}
              inputMode="numeric"
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: MESSAGE.required, minLength: 6 }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.password}
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
        />
      </Stack>

      <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
        Sign up
      </LoadingButton>
    </form>
  );
}
