export function exportJSON(params: { data: string; name: string }) {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(params.data)
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', params.name + '.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
