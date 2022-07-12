import NavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <NavBar />
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
