import { Log } from "./../../entities/log";

type omitId = Omit<Log, "id">;
type omitCreatedAtAndId = Omit<omitId, "createdAt">;

export type LogReceive = omitCreatedAtAndId;
