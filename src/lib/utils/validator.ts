import { z } from 'zod';

const emailSchema = z.string().trim().email();
const passwordSchema = z.string().min(8);
const nameSchema = z.string().min(1);

export const validator = {
	isValidEmail: (emailInput: string) => {
		return emailSchema.safeParse(emailInput).success;
	},
	isValidPwd: (pwdInput: string) => {
		return passwordSchema.safeParse(pwdInput).success;
	},
	isValidName: (nameInput: string) => {
		return nameSchema.safeParse(nameInput).success;
	},
	normalizeEmail: (emailInput: string) => {
		return emailInput.toLowerCase();
	}
}