import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { login } from '../../../slices/auth';
import { FormLabel, MESSAGE } from '../../../utils/message';
import { Textfield } from '../../../utils/formLib';
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../utils/CommonSnack';
// ----------------------------------------------------------------------

export default function LoginForm() {
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
      password: '',
      emailOrMobile: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginApi = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((data) => {
        if (data.status === 200) {
          showSnackbar(data.message, 'success');
          console.log(data);
          if (data.data.storename) {
            navigate('/dashboard');
          } else {
            window.location.reload();
            navigate('/store');
          }
          console.log(data.data);
          localStorage.removeItem('userDetails');
          localStorage.setItem('userDetails', JSON.stringify(data.data));
        } else {
          showSnackbar(data.message, 'error');
        }
      })
      .catch((e) => {
        console.log(e);
        showSnackbar(e.message, 'error');
      });
  };
  const onSubmit = (formData) => {
    const { emailOrMobile, password } = formData;
    const isEmail = /^\S+@\S+$/i.test(emailOrMobile);

    if (isEmail || (/^[0-9]*$/.test(emailOrMobile) && emailOrMobile.length === 10)) {
      const data = isEmail ? { email: emailOrMobile, password } : { mobile: emailOrMobile, password };
      loginApi(data);
    } else {
      showSnackbar('Invalid email or mobile number', 'error');
    }
  };
  const validateEmailOrMobile = (value) => {
    const isEmail = /^\S+@\S+$/i.test(value);
    const isMobile = /^[0-9]*$/.test(value) && value.length === 10;

    if (!isEmail && !isMobile) {
      return 'Invalid email or mobile number';
    }

    return true;
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="emailOrMobile"
          control={control}
          rules={{
            required: MESSAGE.required,
            validate: validateEmailOrMobile,
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={FormLabel.emailOrMobile}
              error={Boolean(errors.emailOrMobile)}
              helperText={errors.emailOrMobile?.message}
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: MESSAGE.required }}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
