import { KEYS, useOnKeyPressed } from 'shared/hooks'

export const useControlKeys = (
  optionsRef: React.RefObject<HTMLButtonElement>[]
) => {
  const handleKeyPressed = (up: boolean) => {
    const activeOptionIndex = optionsRef.findIndex(
      (el) => el.current === document.activeElement
    )

    if (activeOptionIndex < 0) {
      const firstOption = optionsRef[0]
      const lastOption = optionsRef[optionsRef.length - 1]
      const navigateTo = up ? lastOption : firstOption
      if (navigateTo) navigateTo.current?.focus()
      return
    }

    const nextOption = up
      ? optionsRef[activeOptionIndex - 1]
      : optionsRef[activeOptionIndex + 1]
    if (nextOption) nextOption.current?.focus()
  }

  useOnKeyPressed(KEYS.ARROW_UP, () => handleKeyPressed(true))
  useOnKeyPressed(KEYS.ARROW_DOWN, () => handleKeyPressed(false))
}
