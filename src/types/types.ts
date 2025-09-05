// Types of AHP ROOM
export interface AHPFormInput {
  goal: string;
  alternatives: string[];
  criteria: string[];
}

export interface AHPFormErrors {
  goal: string;
  alternatives: string;
  criteria: string;
}

export interface CriterionInterface {
    room_id: string;
    name: string;
    desc?: string;
    order: number;
}

export interface AlternativeInterface {
    room_id: string;
    name: string;
    desc?: string;
}

