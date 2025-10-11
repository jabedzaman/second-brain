import Image from "next/image";
import Link from "next/link";
import Brain from "~/assets/brain.gif";

export const Footer = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 flex justify-center">
      <div className="flex flex-col items-center">
        <Image src={Brain} alt="Brain Logo" className="w-16 h-10" />
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Built by{" "}
          <Link
            href="https://jabed.dev?utm_source=brain"
            target="_blank"
            className="underline hover:text-foreground cursor-pointer"
          >
            Jabed
          </Link>
        </p>
      </div>
    </div>
  );
};
