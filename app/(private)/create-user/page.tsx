import CreateUserForm from "./_components/create-user-form";

export default async function CreateUserPage() {
  return (
    <section>
      <h2 className="text-3xl">Create User</h2>
      <CreateUserForm />
    </section>
  );
}
