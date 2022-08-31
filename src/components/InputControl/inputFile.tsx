import { ReactElement } from "react";

function InputFile({ handleLogo }: any): ReactElement {
  return (
    <input
      hidden
      accept="image/*"
      onChange={({ target: { files } }) => handleLogo(files![0])}
      type="file"
    />
  );
}

export { InputFile };
