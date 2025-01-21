import { faFrown, faMeh, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FeelingForm({
  action,
  children,
}: {
  action: any;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 dark:bg-slate-800 w-full max-w-2xl rounded-2xl border border-gray-100 shadow-xl"
    >
      <div>
        <div className="mb-3">
          <label
            htmlFor="mood"
            className="block text-xs text-gray-600 uppercase dark:text-slate-400 mb-3"
          >
            What&apos;s your mood like?
          </label>
          <ul className="grid w-full gap-6 grid-cols-3">
            <li>
              <input
                type="radio"
                id="HAPPY"
                name="mood"
                value="HAPPY"
                className="hidden peer"
                required
              />
              <label
                htmlFor="HAPPY"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    <FontAwesomeIcon
                      icon={faSmile}
                      className="fa-fw min-w-8 min-h-8 max-h-8 peer-checked/bad:text-yellow-400"
                    />
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="MEH"
                name="mood"
                value="MEH"
                className="hidden peer"
              />
              <label
                htmlFor="MEH"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    <FontAwesomeIcon
                      icon={faMeh}
                      className="fa-fw min-w-8 min-h-8 max-h-8 peer-checked/bad:text-yellow-400"
                    />
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="SAD"
                name="mood"
                value="SAD"
                className="hidden peer"
              />
              <label
                htmlFor="SAD"
                className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    <FontAwesomeIcon
                      icon={faFrown}
                      className="fa-fw min-w-8 min-h-8 max-h-8 peer-checked/bad:text-yellow-400"
                    />
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div className="mb-3">
          <label
            htmlFor="mood"
            className="block text-xs text-gray-600 uppercase dark:text-slate-400 mb-3"
          >
            What&apos;s one goal you want to accomplish today?
          </label>
          <textarea
            className="dark:bg-slate-800 dark:text-white w-full border rounded-md p-2 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            rows={4}
            name="today"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="mood"
            className="block text-xs text-gray-600 uppercase dark:text-slate-400 mb-3"
          >
            Did you reach your goal yesterday? Why or why not?
          </label>
          <textarea
            className="dark:bg-slate-800 dark:text-white w-full border rounded-md p-2 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            rows={4}
            name="yesterday"
          />
        </div>
      </div>
      {children}
    </form>
  );
}
