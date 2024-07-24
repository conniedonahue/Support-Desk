import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SubmitTicket from "./routes/SubmitTicket";
import MainPage from "./routes/MainPage.jsx";
import AdminPage from "./routes/AdminPage.jsx";
import EditTicket, { action as editAction } from "./routes/EditTicket.jsx";
import { loader as adminPageLoader } from "./loaders/adminPageLoader.js";
import { loader as editLoader } from "./loaders/editPageLoader.js";
import ErrorPage from "./routes/ErrorPage.jsx";
import Ticket from "./routes/Ticket.jsx";
import { action as destroyAction } from "./routes/DestroyTicket.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    loader: adminPageLoader,
    children: [
      {
        path: "tickets/:ticketId",
        element: <Ticket />,
      },
      {
        path: "tickets/:ticketId/edit",
        element: <EditTicket />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "tickets/:ticketId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
