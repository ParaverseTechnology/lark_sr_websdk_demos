interface Window {
  fullWidth: any,
  config: any
}

interface Navigator {
  msSaveBlob?(blob: Blob, fileName: string): boolean;
}