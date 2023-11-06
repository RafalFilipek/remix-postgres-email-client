import { Link } from "@remix-run/react";
import { formatEmailString } from "../utils";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { GetEmailsForFolderResult } from "../db/queries";
import { getEmailsForFolder } from "../db/queries";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.name, "params.name is required");
  const emails = await getEmailsForFolder(params.name);

  return { emails };
};

export function EmailListColumn({
  folderName,
  emails,
}: {
  folderName: string;
  emails: GetEmailsForFolderResult;
}) {
  return (
    <div className="border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2 col-span-2">
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {emails.map((email) => (
          <Link
            key={email.id}
            to={`/f/${folderName.toLowerCase()}/${email.id.toString()}`}
          >
            <li className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex justify-between items-start rounded-lg">
              <div className="w-full truncate">
                <h2 className="text-base font-bold">
                  {formatEmailString(email)}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {email.subject}
                </p>
                <p className="text-sm truncate overflow-ellipsis">
                  {email.body}
                </p>
              </div>
              <time className="text-xs text-gray-500 dark:text-gray-400 self-center flex justify-end">
                {new Date(email.sent_date).toLocaleDateString()}
              </time>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
