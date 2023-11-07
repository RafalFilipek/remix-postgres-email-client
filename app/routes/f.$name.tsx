import { Outlet, useLoaderData } from "@remix-run/react";
import { EmailListColumn } from "../components/email-list-column";

import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getEmailsForFolder } from "../db/queries";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.name, "params.name is required");
  const emails = await getEmailsForFolder(params.name);

  return {
    emails,
    folderName: params.name,
  };
};

export default function Component() {
  const { emails, folderName } = useLoaderData<typeof loader>();

  return (
    <>
      <EmailListColumn folderName={folderName} emails={emails} />

      <Outlet />
    </>
  );
}
