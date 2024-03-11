import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  //publicRoutes: ["/"],
  ignoredRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
