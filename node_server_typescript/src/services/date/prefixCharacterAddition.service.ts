export const prefixCharacterAddition = (value: number): string => {
	let returnValue: string;
	if (value < 10) returnValue = "0" + value;
	else returnValue = value as unknown as string;

	return returnValue;
};
