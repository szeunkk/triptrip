export type ImageUrlArray = (string | null | undefined)[]

export interface IUpdateBoardInput{
    title?: string,
    contents?: string,
    youtubeUrl?: string,
    boardAddress?:{
        zipcode?: string,
        address?: string,
        addressDetail?: string,
    },
    images?: string[]
}