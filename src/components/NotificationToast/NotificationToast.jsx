import { Toaster } from "react-hot-toast";



export default function MessageError() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          border: "2px solid #680747",
        },
      }}
    />
  );
}
