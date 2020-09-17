import { CardData } from "../components/Cards/propTypes";


export interface CaseState {
  incidents: CardData[],
  isIncidentsFetched: boolean,
  isError: boolean,
};