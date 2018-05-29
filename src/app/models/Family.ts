import { Member } from "../models/Member";

export interface Family {
  id?: string;
  name?: string;
  password?: string;
  address?: string;
  day?: boolean;
  photo?: string;
  members?: Member;
}