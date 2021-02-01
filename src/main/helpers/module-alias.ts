import * as path from "path";
import moduleAlias from "module-alias";

const files = path.resolve(__dirname, "../..");

moduleAlias.addAliases({
  "@src": path.join(files, "src"),
  "@test": path.join(files, "test"),
  "@data": path.join(files, "src", "data"),
  "@domain": path.join(files, "src", "domain"),
  "@infra": path.join(files, "src", "infra"),
  "@main": path.join(files, "src", "main"),
  "@presentation": path.join(files, "src", "presentation"),
  "@utils": path.join(files, "src", "utils"),
});
