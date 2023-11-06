import type { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteEmail } from "../db/actions";

export const action = async ({ params }: ActionFunctionArgs) => {
  const { name, id } = params;
  invariant(name, "params.name is required");
  invariant(id, "params.id is required");
  return deleteEmail(name, id);
};
