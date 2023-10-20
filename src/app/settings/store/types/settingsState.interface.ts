import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";

export interface SettingsStateInterface {
  isSubmitting: boolean | null;
  validationErrors: BackendErrorsInterface | null;
}
