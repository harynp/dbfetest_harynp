// Types
export type AccountProps = {
  id: string;
  name: string;
  number: string;
  balance: number;
};

export type FormListProps = {
  label: string;
  value: string | number;
  required?: boolean;
};

export type InternalPaymentProps = {
  description?: string;
  amount: number;
  type_key: string;
  remitter_account_id: string;
  beneficiary_account_id: string;
};

export type IncomingPaymentProps = {
  description?: string;
  amount: number;
  type_key: string;
  beneficiary_account_id: string;
  remitter_name: string;
  remitter_account_number: string;
};

export type OutcomingPaymentProps = {
  description?: string;
  amount: number;
  type_key: string;
  remitter_account_id: string;
  beneficiary_name: string;
  beneficiary_account_number: string;
};

export type listPaymentProps =
  | InternalPaymentProps
  | IncomingPaymentProps
  | OutcomingPaymentProps;