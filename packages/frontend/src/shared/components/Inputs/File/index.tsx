import React from 'react'
import type { UploadProps } from 'antd/es/upload/interface'
import { Upload } from 'antd'

import { FileType } from 'shared/models'
import { toast } from 'shared/services/toast'

import * as S from './styles'

export type FileInputrops = {
  label: string
  files: FileType[]
  onChange: (files: FileType[]) => void
  disabled?: boolean
}

export const FileInput: React.FC<FileInputrops> = ({
  label,
  files,
  onChange,
  disabled = false
}) => {
  const handleChange: UploadProps['onChange'] = (info) => {
    const size = info?.file?.size as number
    const exceedLimit = info && info.file && size / 1024 / 1024 > 1
    if (exceedLimit) {
      return toast.error({ title: 'Arquivo maior que 1MB!' })
    }

    onChange(info.fileList)
  }

  const fileHasNoURL = files.some((f) => !f.url)

  return (
    <S.Wrapper>
      <Upload
        name="upload"
        listType="picture-card"
        accept="*"
        multiple
        onChange={handleChange}
        action={'/api/file'}
        disabled={disabled}
        showUploadList={{
          showDownloadIcon: fileHasNoURL ? false : true,
          showPreviewIcon: false
        }}
        fileList={files}
        onDownload={(e) => {
          const foundFile = files.find((f) => f.uid === e.uid)
          if (!foundFile || !foundFile.url) return
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = foundFile.url
          a.download = foundFile.name
          document.body.appendChild(a)
          a.click()
        }}
      >
        <div>
          <div style={{ marginTop: 8 }}>{label}</div>
        </div>
      </Upload>
    </S.Wrapper>
  )
}
