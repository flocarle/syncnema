import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            logoBox: {
              height: "100%",
            },
            card: {
              rowGap: "16px",
            },
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
