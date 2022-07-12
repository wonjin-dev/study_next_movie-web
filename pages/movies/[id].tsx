import { useRouter } from "next/router";

const Detail = () => {
  const router = useRouter();

  return (
    <div>
      <h4>{router.query.title || "비정상적인 접근입니다"}</h4>
    </div>
  );
};

export default Detail;
