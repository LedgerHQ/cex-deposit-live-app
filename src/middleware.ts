import { chain } from "@/middleware/utils";
import { withI18n } from "@/middleware/withI18n";
import { withMaintenance } from "@/middleware/withMaintenance";

const middlewares = [withI18n, withMaintenance];

export default chain(middlewares);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
