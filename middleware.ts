export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/profile", 
        "/dashboard", 
        "/activity", 
        "/workouts", 
        "/routines", 
        "/exercises", 
    ],
};