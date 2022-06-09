import type { UploadFile } from 'antd/es/upload/interface'

export type FileType = UploadFile & { url?: string }
