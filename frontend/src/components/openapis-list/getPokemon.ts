import { IFlavorText, IKoreanGenus, IKoreanName } from "./types";


export const getPokeMon = async(id: number) => {

    // pokemon: 영어 json
    // species: 한글로 되어있는 거 찾을 수 있음(이름, 종명, 플래버 텍스트)
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(result => result.json());
    const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(result => result.json());
    const typesJSON= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(result => result.json());

    const koreanName: string | undefined = (species.names as IKoreanName[]).find( n => n.language.name === "ko")?.name;
    const koreanGenus: string | undefined = (species.genera as IKoreanGenus[]).find(g => g.language.name === "ko")?.genus;
    const flavorTexts: {flavor_text: string, version: string} = (species.flavor_text_entries as IFlavorText[]).filter(f => f.language.name === "ko").map((f) => ({
            flavor_text: f.flavor_text,
            version: f.version.name,
        }))[0] ?? {flavor_text: "", version: ""}

    const typeColorMap: Record<string, { light: string; normal: string; dark: string }> = {
        normal: {
            light: "193, 194, 193",
            normal: "159, 161, 159",
            dark: "103, 105, 103",
          },
          fire: {
            light: "239, 115, 116",
            normal: "230, 40, 41",
            dark: "150, 26, 27",
          },
          water: {
            light: "116, 172, 245",
            normal: "41, 128, 239",
            dark: "27, 83, 155",
          },
          electric: {
            light: "252, 214, 89",
            normal: "250, 192, 0",
            dark: "163, 125, 0",
          },
          grass: {
            light: "130, 194, 116",
            normal: "63, 161, 41",
            dark: "41, 105, 27",
          },
          ice: {
            light: "129, 223, 247",
            normal: "61, 206, 243",
            dark: "40, 134, 158",
          },
          fighting: {
            light: "255, 172, 89",
            normal: "255, 128, 0",
            dark: "166, 83, 0",
          },
          poison: {
            light: "184, 132, 221",
            normal: "145, 65, 203",
            dark: "94, 42, 132",
          },
          ground: {
            light: "184, 142, 111",
            normal: "145, 81, 33",
            dark: "94, 53, 21",
          },
          flying: {
            light: "173, 210, 245",
            normal: "129, 185, 239",
            dark: "84, 120, 155",
          },
          psychic: {
            light: "245, 132, 168",
            normal: "239, 65, 121",
            dark: "155, 42, 79",
          },
          bug: {
            light: "184, 194, 106",
            normal: "145, 161, 25",
            dark: "94, 105, 16",
          },
          rock: {
            light: "203, 199, 173",
            normal: "175, 169, 129",
            dark: "114, 110, 84",
          },
          ghost: {
            light: "162, 132, 162",
            normal: "112, 65, 112",
            dark: "73, 42, 73",
          },
          dragon: {
            light: "141, 152, 236",
            normal: "80, 96, 225",
            dark: "52, 62, 146",
          },
          dark: {
            light: "153, 139, 140",
            normal: "98, 77, 78",
            dark: "64, 50, 51",
          },
          steel: {
            light: "152, 194, 209",
            normal: "96, 161, 184",
            dark: "62, 105, 120",
          },
          fairy: {
            light: "245, 162, 245",
            normal: "239, 112, 239",
            dark: "155, 73, 155",
          },
          unknown: {
            light: "157, 193, 183",
            normal: "104, 160, 144",
            dark: "68, 104, 94",
          },
        } as const;

    const type = typesJSON?.types[0].type.name;
    const color = typeColorMap[type] ?? typeColorMap["unknown"]

    return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: pokemon.sprites.other["dream_world"].front_default ?? pokemon.sprites.other["official-artwork"].front_default,
        koreanName,
        koreanGenus,
        flavor_text_entries: flavorTexts,
        color
    }
}