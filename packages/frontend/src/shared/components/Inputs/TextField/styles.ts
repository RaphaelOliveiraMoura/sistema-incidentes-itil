import styled, { css } from 'styled-components'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

type WrapperProps = {
  $hasLabel: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  width: 100%;
  padding-top: ${(props) => props.$hasLabel && ' 28px'};

  input,
  textarea {
    border: none;
    outline: none;

    background: transparent;
    width: 100%;
    padding: 8px 8px;
  }

  input {
    height: 34px;
  }
`

export const LabelText = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  padding-bottom: 4px;
  font-weight: bold;
`

type InputLabelProps = {
  $isFocused: boolean
  $isDisabled: boolean
  $hasError: boolean
  $hasLeftButton: boolean
}

export const InputLabel = styled.label<InputLabelProps>`
  position: relative;
  display: block;
  transition: all 0.3s;
  border-radius: 10px;
  padding-right: 20px;
  border: 1px solid #ddd;
  background: ${(props) => (props.$isDisabled ? '#dedede' : 'white')};
  padding-left: ${(props) => props.$hasLeftButton && '30px'};

  &:hover {
    border-color: #bbb;
  }

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      box-shadow: 1px 1px 3px #ccc;
    `}

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: red;
    `}
`

export const ValidIcon = styled(AiOutlineCheckCircle)`
  color: green;
`

export const InvalidIcon = styled(AiOutlineCloseCircle)`
  color: red;
`

export const ErrorText = styled.span`
  display: flex;
  margin-top: 4px;
  margin-left: 4px;
  color: red;
`

export const InputLeftSection = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`

export const InputRightSection = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`

export const IconWrapper = styled.div`
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`
