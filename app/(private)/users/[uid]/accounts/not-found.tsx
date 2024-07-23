export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center absolute inset-0">
      <h1 className="text-xl font-medium">User Not Found</h1>
      <p>Sorry, the user you are looking for does not exist.</p>
    </div>
  );
}
