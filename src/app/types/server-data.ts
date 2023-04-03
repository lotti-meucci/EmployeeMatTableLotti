import { Employees } from "./employees";
import { Links } from "./links";
import { Page } from "./page";

export interface ServerData {
  _embedded: Employees,
  _links: Links,
  page: Page
}
