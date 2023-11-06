import { getAllEmailAddresses } from "../db/queries";
import { EmailInputCombobox } from "../components/email-combobox";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { sendEmail } from "../db/actions";
import { SendIcon } from "../icons/send";

export const loader = async () => {
  const userEmails = await getAllEmailAddresses();
  return { userEmails };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  return sendEmail(data);
};

export default function Component() {
  const { userEmails } = useLoaderData<typeof loader>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <Form method="post" className="col-span-3 flex flex-col w-12/20">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 p-2 sticky top-0  h-[60px]">
        <button
          className="flex ml-auto hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-3 py-2"
          type="submit"
        >
          <SendIcon />
        </button>
      </div>
      <div className="p-1 space-y-1 flex-grow overflow-y-auto text-sm">
        <div className="relative flex flex-col justify-center space-y-2">
          <EmailInputCombobox userEmails={userEmails} />
        </div>
        <hr className="border-t border-gray-200 dark:border-gray-800" />
        <div className="relative flex flex-col space-y-2">
          <label className="absolute left-3 top-4 text-gray-500 dark:text-gray-400">
            From:
          </label>
          <p className="pl-14 border-none bg-white dark:bg-gray-950 text-white px-3 py-2 focus:outline-none">
            your@email.com
          </p>
        </div>
        <hr className="border-t border-gray-200 dark:border-gray-800" />
        <div className="relative flex flex-col space-y-2">
          <label
            className="absolute left-3 top-4 text-gray-500 dark:text-gray-400"
            htmlFor="subject"
          >
            Subject:
          </label>
          <input
            className="pl-[72px] border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none"
            id="subject"
            type="text"
            name="subject"
            required
          />
        </div>
        <hr className="border-t border-gray-200 dark:border-gray-800" />
        <div>
          <textarea
            name="body"
            rows={20}
            className="border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none w-full mt-2"
            required
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </Form>
  );
}
