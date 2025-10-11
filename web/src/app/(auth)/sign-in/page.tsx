import { SignInForm } from "./_components/sign-in.form";

export default function Page() {
  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              <span className="font-light text-foreground tracking-tighter">
                Welcome
              </span>
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">
              Sign in to your account to continue
            </p>
            <SignInForm />
          </div>
        </div>
      </section>

      <section className="hidden md:block flex-1 relative p-4">
        <div
          className="absolute inset-4 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
          }}
        />
      </section>
    </div>
  );
}
