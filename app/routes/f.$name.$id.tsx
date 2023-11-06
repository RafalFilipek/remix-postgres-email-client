import type { LoaderFunctionArgs } from "@remix-run/node";

import { formatEmailString } from "../utils";
import { getEmailInFolder } from "../db/queries";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";
import { Toolbar } from "../components/toolbar";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { name, id } = params;
  invariant(name, "params.name is required");
  invariant(id, "params.id is required");
  const email = await getEmailInFolder(name, id);
  return { email };
};

export default function Page() {
  const { email } = useLoaderData<typeof loader>();
  return (
    <div className="col-span-3 flex flex-col w-12/20">
      <Toolbar />
      <div className="p-4 space-y-4 flex-grow overflow-y-auto">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-xl font-bold">{email.subject}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`From: ${formatEmailString(email)}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">To: Me</p>
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(email.sent_date).toLocaleString()}
          </time>
        </div>
        <div>
          <p>{email.body}</p>
        </div>
      </div>
    </div>
  );
}
