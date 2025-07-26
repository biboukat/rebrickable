type RebrickableDate = string;
export interface IUser {
  avatar_img: string | null;
  email: string;
  user_id: number | null;
  username: string;
  last_activity?: string;
  last_ip?: string;
  lego?: {
    all_parts: number;
    lost_set_parts: number;
    total_figs: number;
    total_loose_parts: number;
    total_set_parts: number;
    total_sets: number;
  };
  rewards?: {level: number; points: number; badges: number[]};
}

export interface IUserSet {
  id: number;
  is_buildable: boolean;
  name: string;
  num_sets: number;
}
export interface ISetsListItem {
  include_spares: boolean;
  list_id: number;
  quantity: number;
  set: ISetDetails;
}

export interface ISetDetails {
  last_modified_dt: RebrickableDate;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
  theme_id: number;
  year: number;
}

export interface IMocDetails {
  designer_name: string;
  designer_url: string;
  moc_img_url: string;
  moc_url: string;
  name: string;
  num_parts: number;
  set_num: string;
  theme_id: number;
  year: number;
}
