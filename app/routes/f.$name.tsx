import {
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from "@remix-run/react";
import { EmailListColumn } from "../components/email-list-column";
import { EmailEmptyView } from "../components/empty-email-view";
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
  const { id } = useParams();
  const { pathname } = useLocation();

  // Yo, help me here!
  // https://twitter.com/rafalfilipek/status/1721626127901319490
  const showEmptyView = !pathname.endsWith("/new") && !id;

  console.log({ showEmptyView });

  return (
    <>
      <EmailListColumn folderName={folderName} emails={emails} />
      {showEmptyView && <EmailEmptyView />}
      {!showEmptyView && <Outlet />}
    </>
  );
}
