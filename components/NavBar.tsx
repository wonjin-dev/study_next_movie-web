import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  );
};

export default NavBar;
