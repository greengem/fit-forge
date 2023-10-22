export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard", 
        "/routines", 
        "/workouts", 
        "/profile", 
        "/exercises", 
    ],
};