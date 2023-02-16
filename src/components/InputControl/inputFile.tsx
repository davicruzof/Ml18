import { ReactElement } from "react";

function InputFile({ handleLogo, accept = "image/*" }: any): ReactElement {
  return (
    <input
      hidden
      accept={accept}
      onChange={({ target: { files } }) => handleLogo(files![0])}
      type="file"
    />
  );
}

export { InputFile };
