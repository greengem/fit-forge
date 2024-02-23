import PageHeading from "@/components/PageHeading/PageHeading";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Support() {
  return (
    <>
      <PageHeading title="Support" />
      <p className="text-zinc-500 mb-5">We're here to help! You can find answers to common questions about the Workout Tracker below. If you can't find what you're looking for, you can contact our support team using the form at the bottom of the page.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h1 className="text-2xl mb-3 font-bold">Frequently Asked Questions</h1>
          <p className="text-zinc-500 mb-3">Here are some of the most common questions our users have about the Workout Tracker.</p>
          <Card>
            <CardHeader className="text-xl font-semibold">How do I track my workouts?</CardHeader>
            <CardBody className="text-zinc-500">To track your workouts, simply open the Workout Tracker app and click on the "Track Workout" button. Then, you can select the type of workout you want to track and enter the details of your session.</CardBody>
          </Card>
        </div>

        <div>
          <h1 className="text-2xl mb-3 font-bold">Troubleshooting</h1>
          <p className="text-zinc-500 mb-3">If you're experiencing issues with the Workout Tracker, try the following troubleshooting tips to resolve the problem.</p>
          <Card>
            <CardHeader className="text-xl font-semibold">The app is not tracking my workouts correctly.</CardHeader>
            <CardBody className="text-zinc-500">If you're having trouble with the workout tracking feature, make sure that you have granted the app permission to access your device's GPS or motion sensors. You may also need to enable location services on your phone to ensure accurate tracking.</CardBody>
          </Card>
        </div>


      </div>
    </>
  );
}
