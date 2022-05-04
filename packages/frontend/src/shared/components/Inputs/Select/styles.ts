import styled, { css } from 'styled-components'
import { MdArrowDropDown } from 'react-icons/md'

export const Wrapper = styled.div`
  width: 100%;

  button {
    border: none;
  }
`

export const DropdownIcon = styled(MdArrowDropDown)`
  cursor: pointer;
  width: 18px;
  height: 18px;
`

export const Dropdown = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 8px;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 3px 3px 14px 4px #ededed;
  z-index: 9999;
  max-height: 200px;
`

const itemStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fefefe;
  padding: 8px 0;
`

export const SelectItem = styled.button`
  ${itemStyles}
  cursor: pointer;
  outline: none;

  &:hover {
    background: #ededed;
  }

  &:focus {
    font-weight: bold;
  }
`

export const NoOptions = styled.div`
  ${itemStyles}
  cursor: default;
  color: #666;
  padding: 8px;
`
