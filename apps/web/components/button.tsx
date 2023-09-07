import styles from "./button.module.scss";
import Link from "next/link";

export function Button({ type, onCLick, title, link }: Props): JSX.Element {
  const customStyles =
    type == "outlined"
      ? {
          backgroundColor: "transparent",
          borderColor: "#2E2E2E",
          color: "#2E2E2E",
        }
      : { backgroundColor: "#2E2E2E", borderColor: "#2E2E2E", color: "#FFF" };

  if (link)
    return (
      <Link
        href={link}
        onClick={onCLick}
        className={styles.container}
        style={customStyles}
      >
        {title}
      </Link>
    );

  return (
    <button onClick={onCLick} className={styles.container} style={customStyles}>
      {title}
    </button>
  );
}

interface Props {
  type?: "filled" | "outlined";
  onCLick?: () => void;
  title: string;
  bgCol?: string;
  color?: string;
  link?: string;
}
