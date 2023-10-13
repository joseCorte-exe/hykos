import * as Form from '@components/form';
import { Input as NBInput, Stack } from 'native-base';
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';
import { ForwardedRef, forwardRef } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type InputPropsType = {
  Label?: FieldError | undefined,
  HelperText?: FieldError | undefined,
  name?: string,
  control?: Control<any>,
} & InterfaceInputProps

function Inner({ control, ...rest }: InputPropsType, ref: ForwardedRef<any> | any) {
  return (
    control
      ? (<ControlledInput {...rest} />)
      : (<UncontrolledInput {...rest} />)
  )
}

function ControlledInput({ Label, HelperText, name, control, _stack, ...rest }: InputPropsType) {
  return (
    <Controller
      name={name ?? ''}
      control={control}
      render={({ fieldState: { error }, field: { onChange, ref } }) => {
        return (
          <Stack w='full' {..._stack} >
            {Label && <Form.Label>Label</Form.Label>}
            <NBInput
              backgroundColor='primary.100'
              borderRadius='lg'
              {...rest}
              onChangeText={onChange}
              ref={ref}
            />
            {HelperText && <Form.HelperText>HelperText</Form.HelperText>}
            {!!error && <Form.ErrorMessage>{error.message}</Form.ErrorMessage>}
          </Stack>
        )
      }}
    />
  )
}

function UncontrolledInput({ Label, HelperText, name, control, _stack, ...rest }: InputPropsType) {
  return (
    <Stack w='full' {..._stack}>
      {Label && <Form.Label>Label</Form.Label>}
      <NBInput
        _light={{
          background: 'white'
        }}
        _dark={{
          background: 'primary.100'
        }}
        borderRadius='lg'
        _focus={{
          borderColor: '#CBCBCA'
        }}
        {...rest}
      />
      {HelperText && <Form.HelperText>HelperText</Form.HelperText>}
    </Stack>
  )
}

export const Input = forwardRef(Inner)
