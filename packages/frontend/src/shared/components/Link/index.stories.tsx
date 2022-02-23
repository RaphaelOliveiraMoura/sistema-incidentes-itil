import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Link } from '.'

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {}
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'This is a link',
  to: '#'
}
