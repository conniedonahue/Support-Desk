import { redirect } from "react-router-dom";
import axios from "axios";

export async function action({ params }) {
  console.log("params", params);
  axios
    .delete("/api/tickets/{params}")
    .then(() => {
      return redirect("/admin/");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
