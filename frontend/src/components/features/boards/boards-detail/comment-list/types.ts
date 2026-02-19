export interface IComment {
  _id: string;
  writer?: string | null;
  contents: string;
  rating: number;
  createdAt: string;
}

export interface IUseCommentList {
  data?: {
    fetchBoardComments: IComment[];
  };
}
