/**
 * 驼峰转横杆
 * @param value 
 * @returns 
 */
export const toLine = (value: string) => {
  return value.replace(/(A-Z)g/, '-$1').toLowerCase()
}

export const toElIcon = (icon: string) => {
  return `el-icon-${toLine(icon)}`
}