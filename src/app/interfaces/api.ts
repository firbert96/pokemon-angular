export interface ListOutput {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}
export interface Result {
  name: string;
  url: string;
}
export interface Abilities {
  ability: Result,
  is_hidden: boolean,
  slot: number
}
export interface Cries {
  latest: string;
  legacy: string;
}
export interface GameIndices {
  game_index: number,
  version: Result,
}
export interface VersionDetails {
  rarity: number,
  version: Result,
}
export interface HeldItems {
  item: Result,
  version_details: VersionDetails[],
}
export interface VersionGroupDetails {
  level_learned_at: number,
  move_learn_method: Result,
  version_group: Result,
}

export interface Moves {
  move: Result,
  version_group_details:VersionGroupDetails[],
}
export interface Stats {
  base_stat: number,
  effort: number,
  stat: Result,
}
export interface Types {
  slot: number,
  type: Result,
}
export interface Sprites {
  back_default: string | null,
  back_female: string | null,
  back_shiny: string | null,
  back_shiny_female: string | null,
  front_default: string | null,
  front_female: string | null,
  front_shiny: string | null,
  front_shiny_female: string | null,
}
export interface DetailOutput {
  id:number,
  name:string,
  base_experience: number,
  height:number,
  is_default: boolean,
  order: number,
  weight: number,
  abilities: Abilities[],
  forms: Result[],
  game_indices: GameIndices[],
  held_items: HeldItems[],
  location_area_encounters: string,
  moves: Moves[],
  cries: Cries,
  sprites: Sprites[],
  species: Result,
  stats: Stats[],
  type: Types[],
}
