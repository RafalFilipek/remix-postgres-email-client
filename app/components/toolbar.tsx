import { Form, Link, useParams } from "@remix-run/react";
import { ArrowLeftIcon } from "../icons/arrow-left";
import { ArrowRightIcon } from "../icons/arrow-right";
import { EmailIcon } from "../icons/email";
import { SearchIcon } from "../icons/search";
import { TrashIcon } from "../icons/trash";

export function Toolbar() {
  const params = useParams();

  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 h-[60px]">
      <div className="space-x-6">
        <Link to={`/f/${params.name}/new`} className="inline-flex">
          <EmailIcon />
        </Link>
        <Form
          method="post"
          action={`/f/${params.name}/${params.id}/delete`}
          className="inline-flex"
        >
          <button type="submit">
            <TrashIcon />
          </button>
        </Form>
        <button>
          <ArrowLeftIcon />
        </button>
        <button>
          <ArrowRightIcon />
        </button>
      </div>
      <button className="flex ml-auto">
        <SearchIcon />
      </button>
    </div>
  );
}
