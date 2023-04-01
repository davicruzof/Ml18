export type baseCreateEditProps = {
  title: string;
  subtitle: string;
  type: "create" | "edit";
  setValues: (val: any) => void;
  values: any;
};
