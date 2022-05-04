import React, { useEffect, useState, useCallback } from 'react'

import { Validator, requiredValidator } from 'shared/services/validation'

import * as S from './styles'

type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement

export type TextFieldProps = {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  touched?: boolean
  validator?: Validator
  mask?: (value: string) => string
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
  inputProps?: Partial<React.InputHTMLAttributes<InputOrTextarea>>
  inputChildren?: JSX.Element
  multline?: number
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  touched,
  validator = requiredValidator,
  mask = (valueToFormat) => valueToFormat,
  iconLeft,
  iconRight,
  children = <></>,
  inputChildren = <></>,
  inputProps = {},
  multline
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputWasTouched, setInputTouched] = useState(false)

  const wasTouched = touched === false ? false : touched || inputWasTouched

  const checkForErrors = useCallback(
    async (inputValue = '') => {
      const validationError = await validator(inputValue)
      setError(validationError)
    },
    [validator]
  )

  useEffect(() => {
    if (!wasTouched) return
    checkForErrors(value)
  }, [value, checkForErrors, wasTouched])

  const handleChange = (e: React.ChangeEvent<InputOrTextarea>) => {
    const inputValue = e.target.value
    const maskedValue = mask(inputValue)
    onChange(maskedValue)

    if (inputProps.onChange) inputProps.onChange(e)
  }

  const handleFocus = (e: React.FocusEvent<InputOrTextarea, Element>) => {
    setIsFocused(true)

    if (inputProps.onFocus) inputProps.onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<InputOrTextarea, Element>) => {
    const inputValue = e.target.value
    checkForErrors(inputValue)
    setIsFocused(false)
    setInputTouched(true)

    if (inputProps.onBlur) inputProps.onBlur(e)
  }

  return (
    <S.Wrapper $hasLabel={!!label}>
      <S.InputLabel
        $isFocused={isFocused}
        $hasError={wasTouched && !!error}
        $hasLeftButton={!!iconLeft}
        $isDisabled={!!inputProps?.disabled}
      >
        {label && <S.LabelText>{label}</S.LabelText>}

        <S.InputLeftSection>
          {iconLeft && <S.IconWrapper>{iconLeft}</S.IconWrapper>}
        </S.InputLeftSection>

        {!multline && (
          <input
            {...inputProps}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        )}

        {!!multline && (
          <textarea
            {...inputProps}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            rows={multline}
          />
        )}

        {inputChildren}

        <S.InputRightSection>
          {wasTouched && !error && (
            <S.ValidIcon aria-label="ícone de sucesso" size="20" />
          )}

          {wasTouched && error && (
            <S.InvalidIcon aria-label="ícone de erro" size="20" title={error} />
          )}

          {iconRight && <S.IconWrapper>{iconRight}</S.IconWrapper>}
        </S.InputRightSection>
      </S.InputLabel>

      {children}

      {wasTouched && error && <S.ErrorText role="alert">{error}</S.ErrorText>}
    </S.Wrapper>
  )
}
