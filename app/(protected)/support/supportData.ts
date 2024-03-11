// supportData.ts
import Link from "next/link";

export const supportData = [
  {
    title: "Frequently Asked Questions",
    subtitle:
      "Here are some of the most common questions our users have about the Workout Tracker",
    cards: [
      {
        title: "How do I set the equipment I have?",
        content:
          "To set the equipment you have access to, simply navigate to the Equipment section on your profile page, click the checkbox next to the equipment you have, and then click the 'Save' button.",
      },
      {
        title: "How do I update my personal information?",
        content:
          "To update your personal information, simply navigate to the Details section on your profile page, and then update your information as needed. Don't forget to click the 'Save' button when you're done!",
      },
      {
        title: "How can I filter the list of exercises on the Exercise page?",
        content:
          "To filter the list of exercises, simply click the 'Filter' button at the top of the page, and then select the filters you'd like to apply. You can filter by muscle group, equipment, and more! The filters will be stored in the url, so you can easily share the filtered list with others.",
      },
      {
        title: "How can I favourite exercises so i can find them easily later?",
        content:
          "To favourite an exercise, simply click the star icon next to the exercise you'd like to favourite. You can then view all of your favorited exercises on the Exercises page by clicking the filters button and selecting My Favourites.",
      },
      {
        title: "How can i create workout routines?",
        content:
          "There are two ways in which you can create routines: 1. You can create a routine from scratch by navigating to the Start Workout page and clicking the 'Create Routine' button. 2. You can create a routine from the Browse Exercises page by clicking the 'plus icon' next to each exercise.",
      },
    ],
  },
  // {
  //     title: "Troubleshooting",
  //     subtitle: "Having trouble with the app? Here are some common issues and how to fix them.",
  //     cards: [
  //         {
  //             title: "The app is not tracking my workouts correctly.",
  //             content: "If you're having trouble with the workout tracking feature, make sure that you have granted the app permission to access your device's GPS or motion sensors. You may also need to enable location services on your phone to ensure accurate tracking."
  //         },
  //     ]
  // },
];
