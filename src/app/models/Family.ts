import { Member } from "../models/Member";

export interface Family {
  id?: string;
  name?: string;
  password?: string;
  address?: string;
  photo?: string;
  members?: Member;
}