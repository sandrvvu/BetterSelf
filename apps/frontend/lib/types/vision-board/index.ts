export type Image = {
  id: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VisionBoard = {
  id: string;
  title: string;
  description: string;
  userId: string;
  goalId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type VisionBoardWithPreviewImage = VisionBoard & {
  previewImage: {
    id: string;
    source: string;
  };
};

export type VisionBoardWithImages = VisionBoard & {
  images: {
    id: string;
    source: string;
  }[];
};

export type CreateVisionBoardDto = {
  title: string;
  description: string;
  goalId?: string | null;
};

export type UpdateVisionBoardDto = {
  title?: string;
  description?: string;
  goalId?: string | null;
};
