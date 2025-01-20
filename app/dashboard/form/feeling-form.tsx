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
            htmlFor="feeling"
            className="block text-xs text-gray-600 uppercase dark:text-slate-400 mb-3"
          >
            What&apos;s your mood like?
          </label>
          <div className="flex justify-between">
            <div>
              <input
                type="radio"
                className="mr-3"
                id="good"
                name="feeling"
                value="GOOD"
              />
              <label htmlFor="good">GOOD</label>
            </div>

            <div>
              <input
                type="radio"
                className="mr-3"
                id="meh"
                name="feeling"
                value="MEH"
              />
              <label htmlFor="meh">MEH</label>
            </div>

            <div>
              <input
                type="radio"
                className="mr-3"
                id="bad"
                name="feeling"
                value="BAD"
              />
              <label htmlFor="bad">BAD</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="feeling"
            className="block text-xs text-gray-600 uppercase dark:text-slate-400 mb-3"
          >
            What&apos;s one goal you want to accomplish today?
          </label>
          <textarea
            className="dark:bg-slate-800 dark:text-white w-full border rounded-md p-2 text-black"
            rows={4}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="feeling"
            className="block text-xs text-gray-600 uppercase dark:text-slate-400 mb-3"
          >
            Did you reach your goal yesterday? Why or why not?
          </label>
          <textarea
            className="dark:bg-slate-800 dark:text-white w-full border rounded-md p-2 text-black"
            rows={4}
          />
        </div>
      </div>
      {children}
    </form>
  );
}
