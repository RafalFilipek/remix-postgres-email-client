import { type LinksFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { getFoldersWithEmailCount } from "./db/queries";
import { FolderColumn } from "./components/folder-column";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const folders = await getFoldersWithEmailCount();

  return { folders };
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const { folders } = useLoaderData<typeof loader>();

  return (
    <html
      lang="en"
      className="bg-white dark:bg-gray-950 text-black dark:text-white"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="grid grid-cols-6 gap-2 h-screen p-2">
          <FolderColumn
            specialFolders={folders.specialFolders}
            otherFolders={folders.otherFolders}
          />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
