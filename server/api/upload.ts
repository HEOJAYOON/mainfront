import { defineEventHandler, readMultipartFormData } from 'h3'
import { writeFile } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)

    if (!formData) {
      return { error: '파일이 없습니다.' }
    }

    const file = formData.find((f) => f.name === 'file')
    if (!file) {
      return { error: '파일이 존재하지 않습니다.' }
    }

    const uploadPath = path.resolve('uploads', file.filename)
    await writeFile(uploadPath, file.data)

    return { message: '파일 업로드 성공!', filename: file.filename }
  } catch (error) {
    return { error: '파일 업로드 실패: ' + error.message }
  }
})