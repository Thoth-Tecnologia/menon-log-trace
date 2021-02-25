import globalChunk from "./chunks/global";
import notificationChunk from "./chunks/notification";
import genericChunk from "./chunks/generic";

export default {
  ...globalChunk,
  ...notificationChunk,
  ...genericChunk,
};
