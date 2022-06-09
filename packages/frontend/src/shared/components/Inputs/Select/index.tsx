import React, { createRef, useCallback, useMemo, useState } from 'react'

import * as S from './styles'
import { useControlKeys } from './useSelect'

import { TextField, TextFieldProps } from '../TextField'

export type Option = {
  label: string
  value: string
}

export type SelectInputProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  options: Option[]
  value: Option
  onChange: (value: Option) => void
}

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  onChange,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value.label)
  const [dropdownIsOpen, setDropdownOpen] = useState(false)

  const matchOption = useCallback(
    (option: Option) => {
      const findedOption = options.find((o) => o.label === inputValue)
      if (findedOption) return true
      return option.label.toLowerCase().includes(inputValue.toLowerCase())
    },
    [inputValue, options]
  )

  const availableOptions = useMemo(
    () => options.filter((option) => !!option.label).filter(matchOption),
    [options, matchOption]
  )

  const optionsRef = useMemo<React.RefObject<HTMLButtonElement>[]>(
    () => availableOptions.map(() => createRef()),
    [availableOptions]
  )

  const handleSelect = (option: Option) => {
    onChange(option)
    setInputValue(option.label)
    setDropdownOpen(false)
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    const targetIsChildren = e.currentTarget.contains(e.relatedTarget)
    if (targetIsChildren) return

    setDropdownOpen(false)

    const findedOption = options.find((o) => o.label === inputValue)

    if (inputValue !== value.label && findedOption) {
      setInputValue(findedOption.label)
      onChange(findedOption)
      return
    }

    setInputValue(value.label)
  }

  useControlKeys(optionsRef)

  return (
    <S.Wrapper onBlur={handleBlur}>
      <TextField
        {...props}
        value={inputValue}
        onChange={setInputValue}
        iconRight={<S.DropdownIcon onClick={() => setDropdownOpen(true)} />}
        inputProps={{
          ...props.inputProps,
          onFocus: () => setDropdownOpen(true)
        }}
      >
        {dropdownIsOpen && (
          <S.Dropdown>
            {availableOptions.map((option, index) => (
              <S.SelectItem
                ref={optionsRef[index]}
                type="button"
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </S.SelectItem>
            ))}

            {availableOptions.length === 0 && (
              <S.NoOptions>Nenhuma opção encontrada</S.NoOptions>
            )}
          </S.Dropdown>
        )}
      </TextField>
    </S.Wrapper>
  )
}
