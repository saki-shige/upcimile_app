import { getCompanies } from "../../lib/api/company";

export const handleGetCompanies = async () => {
  try {
    const res = await getCompanies();
    console.log(res);
    if (res.status === 200) {
      console.log('ユーザー一覧を取得しました');
      return res.data;
    } else {
      console.log("No users");
    };
  } catch (err) {
    console.log(err);
  };
}
