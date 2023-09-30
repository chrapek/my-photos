export const FileType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
} as const;
export type FileType = typeof FileType[keyof typeof FileType]

export type NewPath = {
  fileName: string;
  path: string;
  type: FileType;
};
