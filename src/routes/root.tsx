import { Button } from "../components/Button";

export default function Root() {
  return (
    <div className="flex h-full desktop:h-screen flex-col justify-center">
      <title>Restaurant Review App</title>
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Welcome to the restaurant review app.
        </h1>
        <h2 className="m-4 text-center text-green-700 text-[1.5rem] font-bold">
          Add reviews of your favorite restaurants.
        </h2>
        <div className="mt-16 flex space-x-1">
          <Button value="Add a new review" link="/addReview" />
          <Button value="View reviews" link="/reviews" />
        </div>
      </div>
    </div>
  );
}
