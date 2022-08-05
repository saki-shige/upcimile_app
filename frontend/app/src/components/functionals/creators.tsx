import { getCreators } from "../../lib/api/creator";

export const handleGetCreators = async () => {
  try {
    const res = await getCreators()
    console.log(res);
    if (res.status === 200) {
      return (res.data);
    } else {
      console.log("no creators");
    }
  } catch (err) {
    console.log(err);
  };
};
