import { createSchemaValidator, validators } from 'shared/services/validation'

import { FormData } from './useFormModal'

export const schema = createSchemaValidator({
  title: validators.requiredValidator,
  description: validators.requiredValidator,
  priority: validators.requiredValidator,
  status: validators.requiredValidator,
  attachments: validators.requiredValidator
})

export const validateForm = (formData: FormData) => schema(formData, formData)
