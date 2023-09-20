import toast from "react-hot-toast";

export function warnNotification(message: string) {
   toast(message, {
      duration: 4000,
      position: "bottom-right",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      //   icon: "👏",

      // Change colors of success/error/loading icon
      //   iconTheme: {
      //  primary: "#000",
      //  secondary: "#fff",
      //   },
   });
}

export function successNotification(message: string) {
   toast(message, {
      duration: 4000,
      position: "bottom-right",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      //   icon: "👏",

      // Change colors of success/error/loading icon
      //   iconTheme: {
      //  primary: "#000",
      //  secondary: "#fff",
      //   },
   });
}
