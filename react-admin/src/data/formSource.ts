export interface inputType{
  id : string,
  label: String,
  type: string,
  placeholder?: string
}

export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Username",
  },
  {
    id: "displayName",
    label: "Name and username",
    type: "text",
    placeholder: "Name and username",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "Email",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Phone",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Address",
  },
  {
    id: "country",
    label: "Country",
    type: "text",
    placeholder: "Country",
  },
];

export const productInputs = [
  {
    id: 1,
    label: "Title",
    type: "text",
    placeholder: "Apple Macbook Pro",
  },
  {
    id: 2,
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: 3,
    label: "Category",
    type: "text",
    placeholder: "Computers",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    placeholder: "100",
  },
  {
    id: 5,
    label: "Stock",
    type: "text",
    placeholder: "in stock",
  },
];
