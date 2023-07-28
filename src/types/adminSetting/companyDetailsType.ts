//type is used to define the shape of an object that contains company details form data. 
export type TCompanyDetailsFormData = {
  companyId?: string | null;
  companyname?: string | null;
  company_address_1: string | null;
  company_address_2: string | null;
  company_state: string | null;
  company_city: string | null;
  company_country: string | null;
  company_postal_code: string | null;
  add: ({ }) => void;
};
