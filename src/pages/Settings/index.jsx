import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { Textfield } from '../../utils/formLib';

function Settings(props) {
  const initialValues = {
    name: '',
    age: '',
  };
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...initialValues,
    },
  });
  const onsub = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onsub)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'This issss required' }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={'User Name'}
              type={'text'}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              required
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          rules={{ required: 'This issss required' }}
          render={({ field }) => (
            <Textfield
              {...field}
              label={'Age'}
              type={'number'}
              error={Boolean(errors.age)}
              helperText={errors.age?.message}
              required
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>{' '}
    </div>
  );
}

export default Settings;
