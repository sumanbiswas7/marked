import toast from "react-hot-toast";

export function successNotification(message: string) {
   toast.dismiss();

   toast(message, {
      duration: 1500,
      position: "bottom-right",
      // Styling
      style: { border: `1px solid #71C67F`, borderRadius: "0.5rem", backgroundColor: "#71C67F", color: "#fff" },
      className: "",
   });
}

export function warnNotification(message: string) {
   toast.dismiss();

   toast(message, {
      duration: 1500,
      position: "bottom-right",
      // Styling
      style: { border: `1px solid #C7C473`, borderRadius: "0.5rem", backgroundColor: "#C7C473", color: "#fff" },
      className: "",
   });
}

export function errorNotification(message: string) {
   toast.dismiss();

   toast(message, {
      duration: 1500,
      position: "bottom-right",
      // Styling
      style: { border: `1px solid #C77373`, borderRadius: "0.5rem", backgroundColor: "#C77373", color: "#fff" },
      className: "",
   });
}
