type RebrickableDate = string;
export interface IUser {
  avatar_img: string | null;
  email: string;
  user_id: number | null;
  username: string;
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
  set: {
    last_modified_dt: RebrickableDate;
    name: string;
    num_parts: number;
    set_img_url: string;
    set_num: string;
    set_url: string;
    theme_id: number;
    year: number;
  };
}
