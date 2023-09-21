import { chain } from "@/middleware/utils";
import { withI18n } from "@/middleware/index";

const middlewares = [withI18n];

export default chain(middlewares);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
