import Head from "next/head";

interface Props {
  title: string;
}

const Seo: React.FC<Props> = (props) => {
  return (
    <Head>
      <title>{`${props.title} | Next.js_Movie-Web`}</title>
    </Head>
  );
};

export default Seo;
