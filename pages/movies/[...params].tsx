import { NextPageContext } from "next";
import Seo from "../../components/Seo";

interface Props {
  params: string[];
}

const Detail: React.FC<Props> = (props) => {
  const [title, id] = props.params || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
};

export default Detail;

export function getServerSideProps(ctx: NextPageContext) {
  const params = ctx.query.params;

  return {
    props: {
      params,
    },
  };
}
