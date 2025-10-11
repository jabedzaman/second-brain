import Image from "next/image";
import Brain from "~/assets/brain.gif";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <Image src={Brain} alt="Brain Logo" className="w-16 h-10 mr-2 mb-1" />
      <h1 className="text-2xl font-semibold text-foreground">
        404 - Page Not Found
      </h1>
    </div>
  );
}
