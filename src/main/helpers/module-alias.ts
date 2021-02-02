import * as path from "path";
import moduleAlias from "module-alias";

const files = path.resolve(__dirname, "../..");

moduleAlias.addAliases({
  "@data": path.join(files, "data"),
  "@domain": path.join(files, "domain"),
  "@infra": path.join(files, "infra"),
  "@main": path.join(files, "main"),
  "@presentation": path.join(files, "presentation"),
  "@utils": path.join(files, "utils"),
});
