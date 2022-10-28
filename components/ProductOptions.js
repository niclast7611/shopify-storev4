import React from "react";

export default function ProductOptions({
  name,
  values,
  selectedOptions,
  setOptions,
}) {
  // console.log("values", values);
  // console.log("name", name)
  return (
    <fieldset className="mt-3">
      {values[0] === "Default Title" ? null : (
        <legend className="text-xl font-semibold">{name}</legend>
      )}
      <div className="inline-flex items-center flex-wrap">
        {values[0] === "Default Title"
          ? null
          : values.map((value) => {
              // creates a unique id
              const id = `options${name}-${value}`;
              const checked = selectedOptions[name] === value;
              // console.log("selectedOptions", selectedOptions)

              return (
                // creates the form content
                <label key={id} htmlFor={id}>
                  {/* all the variant options match with the label */}
                  <input
                    className="sr-only"
                    type="radio"
                    id={id}
                    name={`options-${name}`}
                    value={value}
                    checked={checked}
                    onChange={() => setOptions(name, value)}
                  />
                  {/* <div className={`p-2 mt-3 text-lg rounded-full block cursor-pointer mr-3 ${checked ? "text-secondary-color bg-primary-color" : "text-white bg-[accent-color]"}`
                                }> */}
                  <div
                    className={`p-2 mt-3 text-lg rounded-full block cursor-pointer mr-3 text-background-color bg-secondary-color
                                  ${
                                    checked
                                      ? "border-primary-color border-2"
                                      : null
                                  }`}
                  >
                    <span className="px-2 ">{value}</span>
                  </div>
                </label>
              );
            })}
      </div>
    </fieldset>
  );
}
