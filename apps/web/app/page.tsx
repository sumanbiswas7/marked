import { Header } from "ui/components";
import { isValidName } from "ui/utils";

export default function Page(): JSX.Element {
  return (
    <div>
      <Header />
      <p>Hello this is marked</p>
      <p>
        Ak is a valid name ? - {isValidName("Ak") === true ? "True" : "False"}
      </p>
      <p>
        Ak47 is a valid name ? -{" "}
        {isValidName("Ak47") === true ? "True" : "False"}
      </p>
    </div>
  );
}
