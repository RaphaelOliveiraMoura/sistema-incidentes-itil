import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from '.'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {}
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}>
    <button>Click me</button>
  </Dropdown>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    { label: 'item 1', onClick: () => null },
    { label: 'item 2', onClick: () => null },
    { label: 'item 3', onClick: () => null },
    { label: 'item 4', onClick: () => null }
  ]
}
