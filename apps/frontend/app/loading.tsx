import { Spinner } from "@/components/shared";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  );
}
