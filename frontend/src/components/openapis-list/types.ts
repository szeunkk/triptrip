export interface IKoreanName{
    language: {
        name: string;
        url: string;
    };
    name: string;
}

export interface IKoreanGenus{
    language: {
        name: string;
        url: string;
    };
    genus: string;
}

export interface IFlavorText{
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    }
}